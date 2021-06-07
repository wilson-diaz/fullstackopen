import React from 'react'

const CountriesList = ({list}) => (
  <ul>
    {list.map(c => <li key={c.numericCode}>{c.name}</li>)}
  </ul>
)

export default CountriesList
