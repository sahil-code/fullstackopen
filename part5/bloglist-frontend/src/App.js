import { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {props.user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LogoutButton />
          <BlogForm />
        </div>
      )}
      <BlogList />
    </div>
  )
}

export default connect((state) => ({ user: state.user }), null)(App)
