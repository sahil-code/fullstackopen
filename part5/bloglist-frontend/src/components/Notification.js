const Notification = ({notification}) => {
  console.log(notification);
  const NotificationStyle = {
    color: `green`,
    background: `lightgrey`,
    fontSize: 20,
    borderStyle: `solid`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (notification.type === "error") {
    NotificationStyle.color = 'red'
  }

  if (notification.message == null) {
    return null
  }

  return (
    <div style={NotificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification