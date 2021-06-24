/* API https://disease.sh */
/* https://reqbin.com view API data */

import React, {useState,useEffect} from 'react'
import {MenuItem,FormControl,Select,Card,CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph'
function App() {
  /* useState */
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  
  /* useEffect */
  useEffect(()=>{
    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        const countries = data.map((country)=>{
          return {
              name:country.country,
              value:country.countryInfo.iso2
            }
        })
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all'
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange = {onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country =>( 
                  <MenuItem value={country.value}>{country.name}</MenuItem>))
              }
            </Select>
          </FormControl>    
        </div>

        <div className="app__stats">
              <InfoBox title = 'Coronavirus Cases' cases = {countryInfo.todatCases} total = {countryInfo.cases}/>
              <InfoBox title = 'Recoverd' cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}/>
              <InfoBox title = 'Deaths' cases = {countryInfo.todayDeaths} total = {countryInfo.deaths}/>
        </div>
        {/* Map */}
        <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;