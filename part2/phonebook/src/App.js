import React, { useState } from 'react'

const Filter = ({newFilter, handleNewFilterChange}) => {
  return (
    <p>filter shown with <input value={newFilter} onChange={handleNewFilterChange} /></p>
  )
}

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
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App