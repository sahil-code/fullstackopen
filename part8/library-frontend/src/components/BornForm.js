import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BornForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) } })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default BornForm
