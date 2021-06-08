import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('') 

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  // filter using case-insensitive input
  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  const addPerson = (event) => {
    event.preventDefault()

    // check both fields
    if (newName === '' || newNumber === '') {
      alert('please fill both fields')
      return
    }

    // check uniqueness
    const duplicate = persons.find(p => p.name === newName)
    if (duplicate) {
      if (duplicate.number !== newNumber) {
        if (window.confirm(`${newName} has already been added with a different number, would you like to replace their phone number?`)) {
          personService.updatePhone(duplicate.id, {...duplicate, number: newNumber})  
            .then(data => {
              setPersons(persons.map(p => p.id !== duplicate.id ? p : data))
            })
            .catch(error => {
              alert('error updating this person. they must have been deleted')
              setPersons(persons.filter(p => p !== duplicate.id))
            })
        } else {
          return
        }
      } else {
        alert(`${newName} has already been added with this number. enter a different one to update it.`) 
        return
      }
    } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
    
        personService
          .create(newPerson)
          .then(data => setPersons(persons.concat(data)))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => () => {
    if (!window.confirm("are you sure you want to delete this person?")) { return }

    personService
      .deletePerson(id)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        alert('error: this person has already been deleted')
      })
    setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNewFilterChange = (event) => setNewFilter(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange} />
      
      <h2>Add new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
