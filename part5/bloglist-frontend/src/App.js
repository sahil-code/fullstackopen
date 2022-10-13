import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Routes, Route, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <div>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {props.user ? (
          <LogoutButton />
        ) : (
          <Link style={padding} to="/login">
            log in
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default connect(
  (state) => ({ user: state.user, blogs: state.blogs }),
  null
)(App)
