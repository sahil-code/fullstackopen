import BornForm from './BornForm'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ show }) => {
  const personsResult = useQuery(ALL_AUTHORS)

  if (!show || personsResult.loading) {
    return null
  }

  const authors = personsResult.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BornForm
        setError={() => {
          console.log('error!')
        }}
        authors={authors.map((a) => a.name)}
      />
    </div>
  )
}

export default Authors
