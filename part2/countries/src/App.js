import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SearchField = ({searchName, handleSearch}) => (
  <p>find countries <input value={searchName} onChange={handleSearch} /></p>
)

const CountriesList = ({list}) => (
  <ul>
    {list.map(c => <li key={c.numericCode}>{c.name}</li>)}
  </ul>
)

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

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(c => c.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  const handleSearch = (e) => setSearchName(e.target.value)

  if (countriesToShow.length > 10) {
    return (
      <>
        <SearchField searchName={searchName} handleSearch={handleSearch} />
        <p>too many matches, please refine search</p>
      </>
    )
  } else if (countriesToShow.length === 0) {
    return (
      <>
        <SearchField searchName={searchName} handleSearch={handleSearch} />
        <p>no matches, please try another search</p>
      </>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <>
        <SearchField searchName={searchName} handleSearch={handleSearch} />
        <Country country={countriesToShow[0]} />
      </>
    )
  }

  return (
    <>
      <SearchField searchName={searchName} handleSearch={handleSearch} />
      <CountriesList list={countriesToShow} />
    </>
  )
}

export default App;
