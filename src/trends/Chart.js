import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './Chart.css';

function Chart(props) {
  const {
    chartData,
    yLower,
  } = props;

  return (
    <div className="main chart-wrapper">
      <Line data={chartData} options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: yLower,
              }
            }]
          }
      }} />
    </div>
  );
}

export { Chart };
