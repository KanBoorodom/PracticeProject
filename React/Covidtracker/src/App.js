/* API https://disease.sh */
import React, {useState,useEffect} from 'react'
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'


function App() {
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('worldwide')
  
  /* https://reqbin.com view API */
  useEffect(()=>{
    const getCountriesData = async ()=>{
      fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const countries = data.map((country)=>{
          return {
              name:country.country,
              value:country.countryInfo.iso2
            }
        })
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value={country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country =>( 
                <MenuItem value={country.value}>{country.name}</MenuItem>))
            }
          </Select>
        </FormControl>    
      </div>

      {/* Header */}
      {/* Title+input dropdown field */}
      
      {/* InfoBoxs */}

      {/* InfoBoxs */}

      {/* InfoBoxs */}

      {/* Table */}

      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
