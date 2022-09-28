import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { NotificationChange, NotificationRemove } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.text}
      <button onClick={handleClick}>
        vote
      </button>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => [...state.anecdotes])
    .filter(anecdote => anecdote.text.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteFor(anecdote.id))
            dispatch(NotificationChange('voted!'))
            setTimeout(() => { dispatch(NotificationRemove()) }, 5000)
          }}
        />
      )}
    </ul>
  )
}

export default Notes