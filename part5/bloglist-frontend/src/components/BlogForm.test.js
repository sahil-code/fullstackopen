import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> closes toggle after submitting form', async () => {
  const setBlogs = jest.fn()
  const setNotification = jest.fn()
  const user = userEvent.setup()

  render(
    <BlogForm
      blogs={[]}
      setBlogs={setBlogs}
      setNotification={setNotification}
    />
  )

  const button = screen.getByText('new note')
  await user.click(button)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'testTitle')
  await user.type(inputs[1], 'testAuthor')
  await user.type(inputs[2], 'testUrl')
  await user.click(sendButton)

  const element = screen.queryByRole('textbox')
  expect(element).toBeNull()
})
