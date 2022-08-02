import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/displaycountries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState()

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log('promise fulfilled')
      })
      .catch(error => console.log(error))
  }, [])



  const handleChangeFilter = (event) => setNewFilter(event.target.value)
  return (
    <div>
      <form>
        <div>
          find countries <input value={newFilter} onChange={handleChangeFilter} />
        </div>
      </form>
      <DisplayCountries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App