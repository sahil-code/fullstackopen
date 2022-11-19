import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
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
            <LogoutButton setToken={setToken} />
          </span>
        )}
      </div>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} curPage={page} />
      <Books show={page === 'reccs'} curPage={page} />
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
