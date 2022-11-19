import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const personsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (personsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const genres = booksResult.data.allBooks.reduce(
    (genres, book) => [...new Set([...genres, ...book.genres])],
    []
  )
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <span>
            <button onClick={() => setPage('reccs')}>reccs</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span>
        )}
      </div>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        authors={personsResult.data.allAuthors}
      />

      <Books show={page === 'books'} curPage={page} genres={genres} />
      <Books show={page === 'reccs'} curPage={page} genres={genres} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
