import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createUser } from '../reducers/userReducer'
import useField from './UseField'
import { Form, Button } from 'react-bootstrap'

const AccountForm = (props) => {
  const name = useField('name', 'text')
  const username = useField('username', 'text')
  const password = useField('password', 'text')
  const navigate = useNavigate()

  const createAccount = async (event) => {
    event.preventDefault()
    try {
      await props.createUser({
        name: name.value,
        username: username.value,
        password: password.value
      })
      props.setNotification({ message: `Created User: ${name.value}` })
      navigate('/')
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  return (
    <div>
      <h2>create new account</h2>
      <Form onSubmit={createAccount}>
        {name.formelement}
        {username.formelement}
        {password.formelement}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}

export default connect(null, { createUser, setNotification })(AccountForm)
