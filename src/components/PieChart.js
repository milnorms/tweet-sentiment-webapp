import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const PieChart = ({chartData}, {options}) => {
  return (
    <Pie data={chartData} options={options}/>
  ) 
}

export default PieChart