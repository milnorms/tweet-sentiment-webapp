import React from 'react'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const LineChart = (props) => {
  const {chartData, options} = props
  // console.log(chartData)
  return (
    <Line data={chartData} options={options}/>
  )
}

export default LineChart