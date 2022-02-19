import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import DataService from './DataService'
import Notification from './Notification'
import Error from './Error'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    console.log('effect')
    DataService.getAll().then(res=>setPersons(res))
  }, [])
  const [newName, setNewName] = useState('')  
  const [newNumber, setNewNumber] = useState('')  
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    let flag=false
    for(let i of persons)
    {
      if(i.name===newName)
      {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          DataService.update(i.id, {name: newName, number: newNumber}).then(res=>{
            const newpersons=[...persons]
            newpersons[i.id-1]=res
            setPersons(newpersons)
          })
          .catch(error => {
            setError(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setError(null);
            }, 5000)
          })
        }
        flag=true;
        break;
      }
    }
    if(!flag){
      DataService.create({name: newName, number: newNumber}).then(res=>{
        setPersons([...persons,res])
      })
      setNotification(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotification(null);
        }, 5000)
    }
  }
  const del = (id, name)=>{
    if (window.confirm(`Delete ${name} ?`)) {
      DataService.del(id)
      setPersons(persons.filter(p=>p.id!==id))
    }
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}  addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} del={del}/>
    </div>
  )
}

export default App