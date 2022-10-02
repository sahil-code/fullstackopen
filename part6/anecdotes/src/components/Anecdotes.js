import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const Anecdotes = (props) => {

  return (
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteFor(anecdote.id)
            props.setNotification('voted!', 2)
          }}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {anecdotes: [...state.anecdotes].filter(a => a.text.includes(state.filter)).sort((a, b) => b.votes - a.votes)}
}

export default connect(mapStateToProps, { voteFor, setNotification})(Anecdotes)