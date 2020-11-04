import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import * as utils from '../utilities/utils';

function Trends(props) {
  // const {
  //   setIsAdherence,
  //   crntAccount,
  //   chartData,
  //   crntDate,
  //   updateChartData,
  //   setNumRangeDays,
  //   handleDateChange,
  // } = props;

  const weekDayRange = 7;
  const monthDayRange = 30;

  const normalize = 'Normalize';
  const normalized = 'Normalized';
  const standardize = 'Standardize';
  const standardized = 'Standardized';

  const [dataViewLabel, setDataViewlabel] = useState(normalized);
  const [dataViewBtnLabel, setDataViewBtnlabel] = useState(standardize);

  const Trend_Formula = {
    // Creates trend lines from the passed in adherence data
    // =====================================================
    /**  y = >=0 <= 100    */
    /**  x = 0,1,2,3,4,5,6 */
    /** (1,100) (2,75) (3,100) (4,50) (5,100) (6,75) (7,75) */
    /** n = 7
      * a = 7 x ((1x100)+(2x75)+(3x100)+(4x50)+(5x100)+(6x75)+(7x75)) = 7 x (100+150+300+200+500+450+525) = 7 x 2,225 = 15,575
      * b = (1+2+3+4+5+6+7) x (100+75+100+50+100+75+75) = 28 x 575 = 16,100
      * c = 7 x ((1^2+2^2+3^2+4^2+5^2+6^2+7^2)) = 7 x 140 = 980
      * d = (1+2+3+4+5+6+7)^2 = 784 
      * slope = (a-b)/(c-d) = (15575-16100)/(980-784) = -525/196 = -2.68 (m)
      * 
      * e = (100+75+100+50+100+75+75) = 575
      * f = slope x (1+2+3+4+5+6+7) = -2.68 x 28 = 75
      * 
      * yint = (e-f)/n = 575 - 75/7 = -500/7 = 71.4 (b)
      * trendline: y = -2.68x + 71.4 
      *
      * (x1,y1) = (1, -2.68*1+71.4) = (1, 68.72)
      * (x7,y7) = (7, -2.68*7+71.4) = (7, 52.64)
      * 
      * */
  }

  const get_a = (data) => {
    const n = data.length;
    let a = 0;
    data.forEach((el, i) => {
      a += (el * (i + 1));
    });
    a = a * n;
    return a;
  }

  const get_b = (data) => {
    let j = 0;
    let k = 0;
    data.forEach((el, i) => {
      k += el;
      j += (i + 1);
    });
    let b = j * k;
    return b;
  }

  const get_c = (data) => {
    const n = data.length;
    let j = 0;
    for (let i = 1; i < n + 1; i++) {
      j += (i * i);
    }
    let c = j * n;
    return c;
  }

  const get_d = (data) => {
    const n = data.length;
    let j = 0;
    for (let i = 1; i < n + 1; i++) {
      j += i;
    }
    let d = j * j;
    return d;
  }

  const getSlope = (data) => {
    // slope (m) = (a-b)/(c-d)
    let a = get_a(data);
    let b = get_b(data);
    let c = get_c(data);
    let d = get_d(data);

    let m = (a - b) / (c - d);
    return m;
  }

  const get_e = (data) => {
    let e = 0;
    for (let el of data) {
      e += el;
    }
    return e;
  }

  const get_f = (data, slope) => {
    const n = data.length;

    let j = 0;
    for (let i = 0; i < n + 1; i++) {
      j += i;
    }
    let f = slope * j;
    return f;
  }

  const getIntercept = (data, slope) => {
    // yInt = (e-f)/n (n = data.length)
    let e = get_e(data);
    let f = get_f(data, slope);

    let yInt = (e - f) / data.length;
    return yInt;
  }

  const getTrendLineEndPoints = (data) => {
    // y = mx + b
    let m = getSlope(data);
    let b = getIntercept(data, m);

    let y1 = data[0];

    let x2 = data.length + 1;
    let y2 = m * x2 + b;
    // y2 = y2 < 0 ? 0 : y2;

    return [y1, y2];
  }

  const getTrendLineDataSet = (med) => {
    let dataset = {};
    dataset.label = med.label;
    dataset.data = getTrendLineEndPoints(med.data);

    let endPoint = med.backgroundColor.length - 1;
    dataset.backgroundColor = [med.backgroundColor[0].replace("1)", "0.3)"), med.backgroundColor[endPoint].replace("1)", "0.3)")];
    dataset.borderWidth = 2;
    return dataset;
  }

  const getTrendLineDataSets = () => {
    let trendLineDataSets = [];
    props.chartData.datasets.forEach((med) => {
      let trendLineDataSet = getTrendLineDataSet(med);
      trendLineDataSets.push(trendLineDataSet);
    })
    return trendLineDataSets;
  }

  const getTrendData = () => {
    let labels;
    const weekLabels = ['Mon', 'Sun'];
    const monthLabels = ['1', '31'];

    if (props.chartData.labels.length === 7) {
      labels = weekLabels;
    }
    else {
      labels = monthLabels;
    }

    let trendDataSets = getTrendLineDataSets();
    let trendData = {
      labels: labels,
      datasets: trendDataSets,
    }
    return trendData;
  }

  const datasetEg1 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Adherence',
        data: [100, 75, 100, 50, 100, 75, 75],
        backgroundColor: ['rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(0, 255, 0, 0.3)'],
        borderWidth: 2,
      }
    ]
  }

  const datasetEg2 = [
    {
      label: 'Adherence',
      data: [100, 75, 100, 50, 100, 75, 75],
      backgroundColor: ['rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(116, 226, 215, 0.3)', 'rgba(0, 255, 0, 0.3)'],
      borderWidth: 2,
    },
    {
      label: 'Trend',
      data: [77.87, 75],
      color: 'rgba(0, 255, 0, 1.0)',
      backgroundColor: ['rgba(0, 255, 0, 0.1)', 'rgba(0, 0, 255, 0.1)'],
      borderWidth: 2,
    },
  ]

  const getTrendDurationLabel = () => {
    let duration = props.chartData.labels.length === weekDayRange ? 'Week' : 'Month';
    return duration;
  }

  return (
    <div>
      <Line data={getTrendData()} width={100} height={30}
        options={{
          responsive: true,
          // maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: props.yLower,
                suggestedMax: 100,
              }
            }],
          }
        }} />
    </div>
  );
}

export { Trends };
