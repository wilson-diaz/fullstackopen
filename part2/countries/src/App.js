import React, {useState, useEffect} from 'react'
import axios from 'axios'

import SearchField from './components/SearchField'
import CountryList from './components/CountryList'
import Country from './components/Country'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(c => c.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  const handleSearch = (e) => {
    setSearchName(e.target.value)
    setSelectedCountry(null)
  }

  const handleClick = (c) => () => {
    setSelectedCountry(c)
  }

  let pageBody;
  if (selectedCountry) {
    pageBody = <Country country={selectedCountry} api_key={api_key} />
  } else if (countriesToShow.length > 10) {
    pageBody = <p>too many matches, please refine search</p>
  } else if (countriesToShow.length === 0) {
    pageBody = <p>no matches, please try another search</p>
  } else if (countriesToShow.length === 1) {
    pageBody = <Country country={countriesToShow[0]} api_key={api_key} />
  } else if (countriesToShow) {
    pageBody = <CountryList list={countriesToShow} handleClick={handleClick} />
  }

  return (
    <>
      <SearchField searchName={searchName} handleSearch={handleSearch} />
      {pageBody}
    </>
  )
}

export default App;
