import React from 'react';
import Plot from 'react-plotly.js';

const DecisionRateChart = props => {
  let denied = 0;
  let granted = 0;
  let remanded = 0;
  let sustained = 0;
  let terminated = 0;

  props.data.map(eachCase => {
    if (eachCase.outcome === 'Denied') {
      denied += 1;
    }
    if (eachCase.outcome === 'Granted') {
      granted += 1;
    }
    if (eachCase.outcome === 'Remanded') {
      remanded += 1;
    }
    if (eachCase.outcome === 'Sustained') {
      sustained += 1;
    }
    if (eachCase.outcome === 'Terminated') {
      terminated += 1;
    }
    return null;
  });

  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
          y: [granted, denied, remanded, sustained, terminated],
        },
      ]}
      layout={{ width: 500, height: 300, title: 'Case Data' }}
    />
  );
};

export default DecisionRateChart;
