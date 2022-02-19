import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'
import HiddenCountry from './HiddenCountry'

function App() {
  const [data,setData]=useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
  }, [])
  const [filter, setFilter] = useState('')  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const Listcountry=(props)=>{
    if(!props.filter)
    {
      return <>Enter a filter</>
    }
    let datafiltered=props.data.filter(i=>i.name.common.toLowerCase().includes(props.filter.toLowerCase()))
    if(datafiltered.length>10)
    return <>Too many matches, specify another filter</>
    else if(datafiltered.length>1)
    return (
      //datafiltered.map(i=><p key={i.name.common}>{i.name.common}</p>)
      datafiltered.map(i=><HiddenCountry key={i.name.common} country={i}/>)
    )
    else if(datafiltered.length===1)
    return <Country country={datafiltered[0]}/>
    else
    return <>no such country</>
  }

  return (
    <div>
      find countries: <input value={filter} onChange={handleFilter}/>
      <Listcountry data={data} filter={filter}/>
    </div>
  );
}

export default App;
