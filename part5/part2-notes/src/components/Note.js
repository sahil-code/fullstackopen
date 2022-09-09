import noteService from '../services/notes'

const Note = ({ note, notes, setNotes, setErrorMessage }) => {

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

  return (
    <li className='note' key={note.id}>
      <span>{note.content}</span>
      <button onClick={() => { toggleImportance(note.id) }}>{note.important ? 'make not important' : 'make important'}</button>
    </li>
  )
}

export default Note