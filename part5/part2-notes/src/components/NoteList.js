import { useState } from 'react'

import Note from '../components/Note'

const NoteList = ({ notes, setNotes, setErrorMessage }) => {

  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} notes={notes} setNotes={setNotes} setErrorMessage={setErrorMessage} />)}
      </ul>
    </div>
  )
}

export default NoteList