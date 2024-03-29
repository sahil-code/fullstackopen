import { useEffect } from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(initializeAnecdotes()) }, [dispatch])

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
