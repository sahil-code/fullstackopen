import { useState, useEffect } from 'react'
import DisplayPersons from './components/displaypersons'
import Notification from './components/notification'
import PersonService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter name')
  const [newPhone, setNewPhone] = useState('enter phone')
  const [newFilter, setNewFilter] = useState()
  const [notifMessage, setNotifMessage] = useState()

  useEffect(() => {
    console.log('effect')
    PersonService.getAll()
      .then(response => setPersons(response))
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const existingperson = persons.find(person => person.name == newName)
      if (existingperson.number != newPhone) {
        const newPerson = { name: newName, number: newPhone }
        PersonService.update(existingperson.id, newPerson)
          .catch(error => {
            setNotifMessage(`Information of ${existingperson.name} has already been removed from server`)
            setTimeout(() => { setNotifMessage(null) }, 5000);
            setPersons(persons.filter(p => p.id !== existingperson.id))
          })
      }
      else {
        alert(`${newName} is already added to phonebook`)
        setNewName()
        setNewPhone()
      }
    }
    else {
      const newPerson = { name: newName, number: newPhone }
      PersonService.create(newPerson)
        .then(response => { console.log(response) })
        .catch(error => {
          setNotifMessage(error.response.data.error)
          setTimeout(() => { setNotifMessage(null) }, 5000);
          console.log(error.response.data.error)
        })
      setPersons(persons.concat(newPerson))
      setNotifMessage(`Added ${newPerson.name}`)
      setTimeout(() => { setNotifMessage(null) }, 5000);
    }
  }

  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)
  const handleChangeFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <form>
        <div>
          name: <input value={newFilter} onChange={handleChangeFilter} />
        </div>
      </form>
      <h3>Add a new</h3>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} newFilter={newFilter} setPersons={setPersons} />
    </div>
  )
}

export default App