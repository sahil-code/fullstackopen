import PersonService from '../services/persons'

const DisplayPersons = ({ persons, newFilter, setPersons }) => {

  const handleClick = (event) => {
    event.preventDefault()
    if (window.confirm(`delete ${persons.filter(person => person.id == event.target.id)[0].name} ?`)) {
      console.log("deleting");
      PersonService.deleteperson(event.target.id)
      setPersons(persons.filter(p => p.id != event.target.id))
    }
    else console.log("not deleting");
  }

  const personsToShow = (newFilter === undefined)
    ? persons
    : persons.filter(note => note.name.toLowerCase().includes(newFilter.toLowerCase()))
  return personsToShow.map(person =>
    <p>{person.name} {person.number}
      <button type="button" onClick={handleClick} id={person.id}>delete</button></p>
  )
}

export default DisplayPersons