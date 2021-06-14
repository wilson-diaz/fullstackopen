import React from 'react'

const Filter = ({newFilter, handleNewFilterChange}) => {
    return (
      <p>filter names by: <input value={newFilter} onChange={handleNewFilterChange} /></p>
    )
}

export default Filter
