import counterReducer from './reducers/CounterReducer'

import { legacy_createStore as createStore } from 'redux'

const store = createStore(counterReducer)

const StatisticLine = ({ name, value, sign }) => <tr><td>{name}</td> <td>{value} {sign}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="all" value={good + bad + neutral} />
      <StatisticLine name="average" value={(good - bad) / (good + bad + neutral)} />
      <StatisticLine name="positive" value={(good * 100) / (good + bad + neutral)} sign="%" />
    </div>
  )
}

const App = () => {

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => store.dispatch({type: 'GOOD'})}>good</button>
      <button onClick={() => store.dispatch({type: 'OK'})}>neutral</button>
      <button onClick={() => store.dispatch({type: 'BAD'})}>bad</button>
      <h1>statistics</h1>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

export default App