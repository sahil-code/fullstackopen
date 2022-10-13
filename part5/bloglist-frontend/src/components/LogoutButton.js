import { connect } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LogoutButton = (props) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      props.logoutUser()
      props.setNotification({
        message: 'Logged Out',
        type: 'message',
      })
    } catch (exception) {
      props.setNotification({
        message: 'Error Logging Out',
        type: 'error',
      })
    }
  }

  return (
    <span>
      {props.user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </span>
  )
}

export default connect((state) => ({ user: state.user }), {
  logoutUser,
  setNotification,
})(LogoutButton)
