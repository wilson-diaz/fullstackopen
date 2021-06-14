import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
      setMessage(`please fill in both fields`)
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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

              setMessage(`successfully updated ${newName}'s number to ${newNumber}`)
              setIsError(false)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              console.log(error.response.data)
              setMessage(error.response.data.error)
              setIsError(true)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p !== duplicate.id))
            })
        } else {
          // don't replace number
          return
        }
      } else {
        setMessage(`${newName} has already been added with this number. enter a different one to update it.`)
        setIsError(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
    
      personService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setMessage(`successfully added ${newName}`)
          setIsError(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(error.response.data.error)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => () => {
    if (!window.confirm("are you sure you want to delete this person?")) { return }

    const nameToDelete = persons.find(p => p.id === id).name

    personService
      .deletePerson(id)
      .then(response => {
        setMessage(`successfully deleted ${nameToDelete}`)
        setIsError(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage(error.response.data.error)
        setIsError(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNewFilterChange = (event) => setNewFilter(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isError={isError} message={message} />
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange} />
      
      <h2>Add new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
