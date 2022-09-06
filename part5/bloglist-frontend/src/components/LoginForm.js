import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setNotification('Wrong credentials')
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  return (
    <Togglable buttonLabel='login'>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default LoginForm