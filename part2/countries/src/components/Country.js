import React from 'react'

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <ul>
      <li>capital: {country.capital}</li>
      <li>population: {country.population}</li>
    </ul>
    <h3>languages</h3>
    <ul>
      {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt="country flag" width="50%" />
  </div>
)

export default Country
