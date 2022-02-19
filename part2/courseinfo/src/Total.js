import React from 'react'

const Total = ({parts}) => {
  return (
    <>
      <p><b>total of exercises {parts.reduce((a,b)=>a+b.exercises,0)}</b></p>
    </>
  )
}

export default Total