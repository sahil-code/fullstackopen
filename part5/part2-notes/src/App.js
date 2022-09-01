import { useState, useEffect } from 'react'

import NoteList from './components/NoteList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes)
    }
    getNotes()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} /> :
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm notes={notes} setNotes={setNotes} />
        </div>
      }
      <NoteList notes={notes} setNotes={setNotes} setErrorMessage={setErrorMessage} />
      <Footer />
    </div >
  )
}

export default App