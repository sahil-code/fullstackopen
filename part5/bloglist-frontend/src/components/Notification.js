import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {

  if (props.notification === null) {
    return null
  } else {
    if (props.notification.error) {
      return (
        <Alert key="danger" variant="danger">
          {props.notification.error}
        </Alert>
      )
    }
    return (
      <Alert key="primary" variant="primary">
        {props.notification.message}
      </Alert>
    )
  }
}

export default connect((state) => ({ notification: state.notification }))(
  Notification
)
