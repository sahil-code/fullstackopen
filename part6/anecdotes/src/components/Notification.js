import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {props.notification ? <div style={style}>{props.notification}</div> : null}
    </div>
  )
}

export default connect(state => ({ notification: state.notification }))(Notification)