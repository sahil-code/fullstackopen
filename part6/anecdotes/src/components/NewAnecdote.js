import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAcedote = (props) => {

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createAnecdote(content)
    props.setNotification('added note!', 2)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add anecdote</button>
    </form>
  )
}

const ConnectedNewAnecdote = connect(null, {createAnecdote, setNotification})(NewAcedote)

export default ConnectedNewAnecdote