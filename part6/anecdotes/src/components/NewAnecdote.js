import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('added note!', 2))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add anecdote</button>
    </form>
  )
}

export default NewNote