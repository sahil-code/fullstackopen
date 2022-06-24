import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayDetail = ({ country }) =>
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>{Object.values(country.languages).map(language => <li>{language}</li>)}</ul>
    <img src={country.flags.png} alt="flag"></img>
  </div>

const DisplayWeather = ({ weatherdata }) => {
  if (weatherdata != undefined) {
  return <div>
    <p>temperature {weatherdata.data.current.temp / 10}</p>
    <img src={`http://openweathermap.org/img/wn/${weatherdata.data.current.weather[0].icon}@2x.png`} alt="icon"></img>
    <p>wind {weatherdata.data.current.wind_speed} m/s</p>
  </div>
  }
  else console.log("wait for data");
}

const DisplayCountries = ({ countries, newFilter }) => {

  const [selection, setSelection] = useState()
  const [weatherdata, setWeatherdata] = useState()

  const handleClick = (event) => {
    event.preventDefault()
    if (selection == event.target.id) {
      console.log("cancel");
      setSelection()
    }
    else setSelection(event.target.id)
  }

  const CountriesToShow = (newFilter === undefined)
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    console.log('effect 2');
    const appid = 'sampletoken'
    if (CountriesToShow.length == 1) {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${CountriesToShow[0].latlng[0]}&lon=${CountriesToShow[0].latlng[1]}&appid=${appid}`)
        .then(response => setWeatherdata(response))
        .catch(error => console.log(error))
    }
    else console.log("not yet");
  }, [CountriesToShow.length])

  if (CountriesToShow.length >= 10) {
    return <p>too many matches, specify another filter</p>
  }
  else if (CountriesToShow.length == 1) {
    return (
      <div>
        <DisplayDetail country={CountriesToShow[0]} />
        <h2>Weather in {CountriesToShow[0].name.common}</h2>
        <DisplayWeather weatherdata={weatherdata} />
      </div>
    )
  }
  else {
    return (
      CountriesToShow.map((country) => {
        if (selection == country.name.common) return (
          <p>{country.name.common}<button type="button" onClick={handleClick} id={country.name.common}>show</button>
            <DisplayDetail country={countries.filter(country => country.name.common.includes(selection))[0]} /></p>
        )
        else return <p>{country.name.common}<button type="button" onClick={handleClick} id={country.name.common}>show</button></p>
      })
    )
  }
}

export default DisplayCountries