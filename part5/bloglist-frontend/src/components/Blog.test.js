import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  const testBlog = {
    title: 'testblogpost',
    author: 'mr. a',
    url: 'abcd.com',
    likes: 2,
    user: '63065a601bce4137e65ca412'
  }

  beforeEach(() => {
    render(<Blog blog={testBlog} username={'test'} />)
  })

  test('renders title', async () => {
    await screen.findByText(testBlog.title, { exact: false })
  })

  test('at start the url is not displayed', () => {

    const element = screen.queryByText(testBlog.url)
    expect(element).toBeNull()
  })

  test('after clicking the button, url is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    await screen.findByText(testBlog.url)

  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const closeButton = screen.getByText('hide')
    await user.click(closeButton)

    const element = screen.queryByText(testBlog.url)
    expect(element).toBeNull()
  })

})