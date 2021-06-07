import React, {useState, useEffect} from 'react'
import axios from 'axios'

import SearchField from './components/SearchField'
import CountryList from './components/CountryList'
import Country from './components/Country'

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
      <CountryList list={countriesToShow} />
    </>
  )
}

export default App;
