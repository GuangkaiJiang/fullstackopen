import React from 'react'

const Persons = (props) => {
  return props.persons.filter(i=>i.name.includes(props.filter)).map((i, index)=> <div key={index}><p>{i.name +' '+ i.number}</p> <button onClick={()=>props.del(i.id,i.name)}>delete</button></div>)
}

export default Persons