import { useState } from 'react'
import { connect } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import Togglable from '../components/Togglable'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser({ username, password })
      props.setNotification({ message: `${username} logged in`, type: 'message' })
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setNotification({ message: 'Wrong credentials', type: 'error' })
    }
  }

  return (
    <Togglable buttonLabel="login" initState={true}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </Togglable>
  )
}

export default connect(null, { loginUser, setNotification })(LoginForm)
