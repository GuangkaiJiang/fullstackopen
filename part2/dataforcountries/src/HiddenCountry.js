import React, { useState } from 'react'
import Country from './Country'

function HiddenCountry({country}) {
    const [showing,setShowing]=useState(false)
    return (
    <>
      <br/>
      {country.name.common} 
      <button onClick={()=>setShowing(!showing)}>show</button>
      { showing ? <Country country={country}/> : null }
    </>
    )
  }

export default HiddenCountry;
