import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }

    catch (exception) {
      setNotification({
        message: 'Wrong Credentials',
        type: "error"
      })
      setTimeout(() => { setNotification({
        message: null,
        type: "error"
      }) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification({
        message: 'Error Logging Out',
        type: "error"
      })
      setTimeout(() => { setNotification({
        message: null,
        type: "error"
      }) }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form></div>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    const newBlog = await blogService.create(blogObject)
    await setBlogs(blogs.concat(newBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
    setNotification({
      message: `Added ${newBlog.title} by ${newBlog.author}`,
      type: "message"
    })
    setTimeout(() => { setNotification({
      message: null,
      type: "error"
    }) }, 5000)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const blogForm = () => (

    <div>
      <p>{user.name} logged-in
        <button onClick={handleLogout}>logout</button></p>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        /> <br></br>
        author:
        <input
          value={author}
          onChange={handleAuthorChange}
        /> <br></br>
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        /> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} type={notification.type} />
      {user === null ? loginForm() : blogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
