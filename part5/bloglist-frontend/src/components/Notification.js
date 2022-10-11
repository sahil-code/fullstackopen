import { connect } from 'react-redux'

const Notification = (props) => {
  const NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (props.notification === null) {
    return null
  } else {
    if (props.notification.type === 'error') {
      NotificationStyle.color = 'red'
    }

    return (
      <div style={NotificationStyle} className={props.notification.type}>
        {props.notification.message}
      </div>
    )
  }
}

export default connect((state) => ({ notification: state.notification }))(
  Notification
)
