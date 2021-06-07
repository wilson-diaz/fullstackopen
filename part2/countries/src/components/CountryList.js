import React from 'react'

const CountriesList = ({list, handleClick}) => (
  <ul>
    {list.map(c => <li key={c.numericCode}>{c.name} <button onClick={handleClick(c)}>show</button></li>)}
  </ul>
)

export default CountriesList
