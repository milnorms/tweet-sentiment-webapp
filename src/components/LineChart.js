import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const LineChart = ({chartData}, {options}) => {
  return (
    <Line data={chartData} options={options}/>
  ) 
}

export default LineChart