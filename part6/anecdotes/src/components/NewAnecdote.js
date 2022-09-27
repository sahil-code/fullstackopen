import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/AnecdoteReducer'

const NewNote = (props) => {
  const dispatch = useDispatch()
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add anecdote</button>
    </form>
  )
}

export default NewNote