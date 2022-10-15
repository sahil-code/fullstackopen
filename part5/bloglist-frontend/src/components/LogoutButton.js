import { connect } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const LogoutButton = (props) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      props.logoutUser()
      props.setNotification({ message: 'Logged Out' })
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  return (
    <em style={{ verticalAlign: 'middle', textAlign: 'right' }}>
      {props.user.name} logged-in{' '}
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        logout
      </Button>
    </em>
  )
}

export default connect((state) => ({ user: state.user }), {
  logoutUser,
  setNotification,
})(LogoutButton)
