import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState({})

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={notif} />
      {user === null ?
        <LoginForm setUser={setUser} setNotification={setNotif} /> :
        <div>
          <LogoutButton user={user} setUser={setUser} setNotification={setNotif} />
          <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotif} />
        </div>
      }
      <BlogList blogs={blogs} setBlogs={setBlogs} setNotification={setNotif} user={user} />
    </div>
  )
}

export default App
