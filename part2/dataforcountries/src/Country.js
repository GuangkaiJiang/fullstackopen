import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Country({country}) {
  const [data,setData]=useState([])
  const [wind,setWind]=useState([])
  const [weather,setWeather]=useState('')
  const api_key = process.env.REACT_APP_API_KEY
  console.log('https://api.openweathermap.org/data/2.5/weather?q='+country.capital+'&appid='+api_key)
  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q='+country.capital+'&appid='+api_key)
      .then(response => {
        console.log(response.data.main)
        setData(response.data.main)
        setWeather(response.data.weather[0].icon)
        setWind(response.data.wind)
      })
  }, [])
  
  return (
  <>
    <h2>{country.name.common}</h2>
    <p>captial {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(i=><li key={i}>{i}</li>)}
    </ul>
    <img 
    src={country.flags.png}
    alt={country.name.common+" flag"} 
    />
    <h3>Weather in {country.capital}</h3>
    <p>temperature:{Math.round(data.temp - 273.15)} Celcius</p>
    <img src={'https://openweathermap.org/img/w/'+ weather +'.png'}/>
    <p>wind:{wind.speed} meter/sec, {wind.deg} degree</p>

  </>
  )
}

export default Country;
