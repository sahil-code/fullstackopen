import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/AnecdoteReducer'

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
  const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes)
  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteFor(anecdote.id))}
        />
      )}
    </ul>
  )
}

export default Notes