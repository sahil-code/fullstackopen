import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import Togglable from '../components/Togglable'
import { useNavigate } from 'react-router-dom'
import useField from './UseField'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const username = useField('username', 'text')
  const password = useField('password', 'password')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser({ username: username.value, password: password.value })
      props.setNotification({ message: `${username.value} logged in` })
      navigate('/')
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  return (
    <Togglable buttonLabel="login" initState={true}>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        {username.formelement}
        {password.formelement}
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button
          onClick={() => {
            navigate('/create')
          }}
        >
          Create New Account
        </Button>
      </Form>
    </Togglable>
  )
}

export default connect(null, { loginUser, setNotification })(LoginForm)
