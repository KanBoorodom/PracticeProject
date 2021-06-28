import React from 'react'
import {Circle,Popup} from 'react-leaflet'
import numeral from 'numeral'
import { v4 as uuid_v4 } from "uuid"


const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      mulitiplier: 800, //Circle size
    },
    recovered: {
      hex: "#7dd71d",
      mulitiplier: 1200,
    },
    deaths: {
      hex: "#CC1034",
      mulitiplier: 2000,
    },
  }

export const sortData = data => {
    const sortedData = [...data]
    return sortedData.sort((a,b) => a.cases>b.cases ? -1 :1)
 }
/* 
sortedData.sort((a,b)=>{
    if(a.cases > b.cases){
        return -1 //-1 = false แต่ถ้าใช้ false จะไม่ sort
    }
    else{
        return 1 //1 = true
    }
})
return sortedData
 */
export const prettyPrintStat = (stat) =>
//if stat exist 
  stat ? `+${numeral(stat).format("0.0a")}` : "+0"
  
//Draw a circle use circle from leaflet
export const showDataOnMap = (data,casesType = 'cases') =>
    data.map(country => (
        <Circle
            key = {uuid_v4()}
            center = {[country.countryInfo.lat,country.countryInfo.long]}
            color = {casesTypeColors[casesType].hex}
            fillColor = {casesTypeColors[casesType].hex}
            fillOpacity = {0.4}
            radius= {
                Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].mulitiplier
              }
        >
            <Popup>
              <div className = 'info-container'>
                <div
                  className = 'info-flag'
                  style = {{backgroundImage:`url(${country.countryInfo.flag})`}}
                />
                <div className = 'info-name'>{country.country}</div>
                <div className = 'info-confirmed'>Cases: {numeral(country.cases).format('0,0')}</div>
                <div className = 'info-recovered'>Recovered: {numeral(country.recovered).format('0,0')}</div>
                <div className = 'info-deaths'>Deaths: {numeral(country.deaths).format(0,0)}</div>
              </div>
            </Popup>
        </Circle>
    ))
