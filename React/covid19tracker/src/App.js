import React, {useState,useEffect} from 'react'
import {MenuItem,FormControl,Select,Card,CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'
import numeral from "numeral";
import { sortData, prettyPrintStat } from "./util";
import { v4 as uuid_v4 } from "uuid"

const App = () => {
  
  const [country,setInputCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [countries,setCountries] = useState([])
  const [mapCountries,setMapCountries] = useState([])
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [mapCenter,setMapCenter] = useState({lat:34.80746, lng:-40.4796})
  const [mapZoom,setMapZoom] = useState(3)

///////////////////////////////////////////////////////////
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              key = {uuid_v4()}
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key = {uuid_v4()}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            key = {uuid_v4()}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(numeral(countryInfo.cases).format("0.0a"))}
          />
          <InfoBox
            key = {uuid_v4()}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(numeral(countryInfo.recovered).format("0.0a"))}
          />
          <InfoBox
            isRed
            key = {uuid_v4()}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(numeral(countryInfo.deaths).format("0.0a"))}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className = 'app__graphTitle'>Worldwide new {casesType}</h3>
            <LineGraph className = 'app__graph' 
                casesType={casesType} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;