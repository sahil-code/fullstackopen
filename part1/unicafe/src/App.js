import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({name, value, sign}) => <tr><td>{name}</td> <td>{value} {sign}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
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
    <StatisticLine name="all" value={good+bad+neutral} />
    <StatisticLine name="average" value={(good-bad)/(good+bad+neutral)} />
    <StatisticLine name="positive" value={(good*100)/(good+bad+neutral)} sign="%" />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App