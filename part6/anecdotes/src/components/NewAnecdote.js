import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { NotificationChange, NotificationRemove } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))

    dispatch(NotificationChange('added note!'))
    setTimeout(() => { dispatch(NotificationRemove()) }, 5000)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add anecdote</button>
    </form>
  )
}

export default NewNote