import { useState, useRef } from 'react'
import noteService from '../services/notes'
import Togglable from '../components/Togglable'

const NoteForm = ({ notes, setNotes }) => {

  const [newNote, setNewNote] = useState('')
  const noteFormRef = useRef()

  const addNote = async (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const notePosted = await noteService.create({
      content: newNote,
      date: new Date().toISOString(),
      important: false
    })
    setNotes(notes.concat(notePosted))
    setNewNote('')
  }

  return (
    <Togglable buttonLabel='new-note' ref={noteFormRef}>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder='write note content here'
          id='note-input'
        />
        <button type="submit">save</button>
      </form>
    </Togglable>
  )
}

export default NoteForm