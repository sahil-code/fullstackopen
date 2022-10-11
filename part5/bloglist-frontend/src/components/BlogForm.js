import { useState, useRef } from 'react'
import Togglable from '../components/Togglable'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      props.createBlog({
        title: title,
        author: author,
        url: url,
        likes: 0,
      })
      props.setNotification({
        message: `Added ${title} by ${author}`,
        type: 'message',
      })
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      props.setNotification({
        message: 'error',
        type: 'error',
      })
    }
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef} initState={false}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
          placeholder="write title here"
        />{' '}
        <br></br>
        author:
        <input
          id="author"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
          }}
          placeholder="write author here"
        />{' '}
        <br></br>
        url:
        <input
          id="url"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value)
          }}
          placeholder="write url here"
        />{' '}
        <br></br>
        <button type="submit">save</button>
      </form>
    </Togglable>
  )
}

export default connect(null, { createBlog, setNotification })(BlogForm)
