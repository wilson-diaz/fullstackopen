import React from 'react'

const SearchField = ({searchName, handleSearch}) => (
  <p>find countries <input value={searchName} onChange={handleSearch} /></p>
)

export default SearchField
