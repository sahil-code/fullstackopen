import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

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
