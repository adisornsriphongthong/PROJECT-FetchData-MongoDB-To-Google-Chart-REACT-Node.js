import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Chart } from 'react-google-charts';
import './App.css'

const MyChartComponent = () => {
  const [data, setData] = useState([])
  const [year, setYear] = useState([])
  const [moth, setMonth] = useState([])

  const [currentYear, setCurrentYear] = useState([])

  async function handleChange2023() {
    setCurrentYear([])
    try {
      const response = await axios.get('http://localhost:3000/years/2023');

      for (const x in response.data[0]) {
        if (x !== '_id' && x !== 'name') {
          setCurrentYear((e) => {
            const result = [...e, [x, response.data[0][x]]];
            return result;
          });
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  async function handleChange2024() {
    try {
      setCurrentYear([])
      const response = await axios.get('http://localhost:3000/years/2024');

      for (const x in response.data[0]) {
        if (x !== '_id' && x !== 'name') {
          setCurrentYear((e) => {
            const result = [...e, [x, response.data[0][x]]];
            return result;
          });
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const drawChart = () => {
    const data = [
      ['Month', '2023 - 2024'],
      ['', 0],
      ...currentYear
    ];

    const options = {
      title: 'Month',
      hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      colors: ['#78FF00', '#7000FF'],
    };

    return (
      <div className='background'>
        <Chart
          style={{ color: 'transparent' }}
          width={'100%'}
          height={'500px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={options}
        />

        <center><button onClick={handleChange2023}>2023</button>
        <button onClick={handleChange2024}>2024</button></center>
      </div>
    );
  };

  return <div>{drawChart()}</div>;
};

export default MyChartComponent;
