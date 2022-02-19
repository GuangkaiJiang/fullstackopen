import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  return (
    <>
      {parts.map(i => <Part key={i.id} part={i}/>)}
    </>
  )
}

export default Content