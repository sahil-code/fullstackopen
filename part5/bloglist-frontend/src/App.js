import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Routes, Route } from 'react-router-dom'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import AccountForm from './components/AccountForm'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className="container">
      <h1>Blog App</h1>
      <Notification />
      <Navigation />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create" element={<AccountForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
      <div>
        <br />
        <em>Blog App, by Sahil Agarwal for Full Stack Open 2022</em>
      </div>
    </div>
  )
}

export default App
