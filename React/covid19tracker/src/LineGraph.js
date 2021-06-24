import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
//npm install --save react-chartjs-2@2.11.1
//npm install --save chart.js@2.9.4

//https://www.chartjs.org/docs/latest/charts/line.html
//http://numeraljs.com
//Option from document
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
  

const buildChartData = (data,casesType = 'cases') => {
    let chartData = []
    let lastDataPoint
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x:date,
                y:data[casesType][date] - lastDataPoint, //Get difference new case between day
            }    
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    }
    return chartData
}

function LineGraph({casesType} = 'cases') {
    const [data,setData] = useState({})
    //case type มี 3 ประเภทที่ได้มาจาก API คือ Cases,Recover,Death
    useEffect(()=> {
        const fetchData = async() => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response =>{return response.json()})
            .then(data => {
                //We need to turn date and information from fetch
                //into x,y axis for line graph
                let chartData = buildChartData(data,casesType)
                setData(chartData)
            })
        }   
    fetchData()
    },[casesType])

    return (
      <div> {/* if data is exist and data length > 0 return Line for handle first render that data not fetch yet*/}
        {data && Object.keys(data).length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  label:'Cases',
                  backgroundColor:"rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  fill: true,
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>

      );
    }

export default LineGraph
/* 
 */