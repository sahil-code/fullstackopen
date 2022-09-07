import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    try {
      console.log('adding new blog')
      setBlogs(blogs.concat(newBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification({
        message: `Added ${newBlog.title} by ${newBlog.author}`,
        type: 'message'
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: 'error'
        })
      }, 5000)
    }
    catch (exception) {
      setNotification('error' + exception.response.data.error)
    }
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          onChange={(event) => { setTitle(event.target.value) }}
          placeholder='write title here'
        /> <br></br>
        author:
        <input
          value={author}
          onChange={(event) => { setAuthor(event.target.value) }}
          placeholder='write author here'
        /> <br></br>
        url:
        <input
          value={url}
          onChange={(event) => { setUrl(event.target.value) }}
          placeholder='write url here'
        /> <br></br>
        <button type="submit">save</button>
      </form>
    </Togglable>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm