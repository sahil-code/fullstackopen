import { useEffect } from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes))) }, [dispatch])

  return (
    <div>
      <Notification />
      <NewAnecdote />
      <Filter />
      <Anecdotes />
    </div>
  )
}

export default App;
