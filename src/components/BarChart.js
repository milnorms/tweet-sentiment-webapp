import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const BarChart = (props) => {
  const {chartData, options} = props
  return (
    <Bar data={chartData} options={options}/>
  ) 
}

export default BarChart