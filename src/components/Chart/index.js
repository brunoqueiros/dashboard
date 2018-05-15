import React from 'react';
import { merge } from 'lodash';
import { Line } from 'react-chartjs-2';
import './styles.css';

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          display:false
        }   
      }
    ]
  }
};

export default ({ options, data }) => (
  <div className="chart">
    <Line data={data} options={merge(defaultOptions, options)} />
  </div>
);
