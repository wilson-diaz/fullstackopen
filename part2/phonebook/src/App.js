import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('') 

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
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} has already been added`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

export default App