import { useState } from 'react'

import noteService from '../services/notes'

const Note = ({ notes, setNotes, setErrorMessage }) => {

  const [showAll, setShowAll] = useState(true)

  const toggleImportance = async id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }
    catch (error) {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <li className="note" key={note.id}>
            {note.content}
            <button onClick={() => {toggleImportance(note.id)}}>{note.important ? 'make not important' : 'make important'}</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Note