import React from 'react'
import Weather from './Weather'

const Country = ({country, api_key}) => {  
  return (
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
      <Weather capital={country.capital} api_key={api_key} />
    </div>
  )
}

export default Country
