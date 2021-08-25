import React, { useState, useEffect, useContext } from 'react';
import './DataHub.less';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import Icon from '@ant-design/icons';

import { Divider } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';
const DataHub = props => {
  const { caseData } = props;
  const [vizData, setVizData] = useState({});
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/judges/2/cases', {
  //       headers: {
  //         Authorization: 'Bearer ' + user.authState.idToken.idToken,
  //       },
  //     })
  //     .then(res => {
  //       setVizData(res.data.judge_cases);
  //     });x
  // }, [user.authState.idToken.idToken]);

  let states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const TestDataChart = () => {
    let trace1 = {
      x: states,
      y: [],
      name: 'Granted',
      type: 'bar',
    };

    let trace2 = {
      x: states,
      y: [],
      name: 'Denied',
      type: 'bar',
    };

    for (let i = 0; i < 50; i++) {
      trace1.y.push(Math.round(Math.random() * (150 - 1)) + 1);
      trace2.y.push(Math.round(Math.random() * (150 - 1)) + 1);
    }
    return (
      <Plot
        data={[trace1, trace2]}
        layout={{ barmode: 'stack' }}
        useResizeHandler={true}
        config={{
          modeBarButtonsToRemove: [
            'toImage',
            'zoom2d',
            'pan2d',
            'select2d',
            'lasso2d',
            'drawclosedpath',
            'drawopenpath',
            'zoomIn2d',
            'zoomOut2d',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'toggleSpikelines',
          ],
          displaylogo: false,
        }}
        style={{ width: '95%' }}
      />
    );
  };

  const CaseDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
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
        layout={{ width: 500, height: 300, title: 'Overview of Case Outcomes' }}
        config={{
          modeBarButtonsToRemove: [
            'toImage',
            'zoom2d',
            'pan2d',
            'select2d',
            'lasso2d',
            'drawclosedpath',
            'drawopenpath',
            'zoomIn2d',
            'zoomOut2d',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'toggleSpikelines',
          ],
          displaylogo: false,
        }}
      />
    );
  };

  function findApprovalRatio() {
    let total = data.length;
    let granted = 0;

    data.map(eachCase => {
      if (eachCase.outcome === 'Granted') {
        granted += 1;
      }
      return null;
    });

    return total / granted;
  }

  let grantedRatio = Math.round(findApprovalRatio());

  return (
    <div className="dataHubContainer">
      {/* the homeDisclaimer segment below displays the disclaimer message with the details requested by the stakeholders */}
      <h3 className="homeDisclaimer">
        All visualizations reflect the data in the database. As more cases are
        added, more data can be visualized.
      </h3>
      <h2 className="h1Styles">Approvals vs Denials Nationwide</h2>
      <div className="mainChartContainer">
        <TestDataChart />
      </div>
      <Divider />
      <div className="subChartsContainer">
        <CaseDataChart />
        <h2>Ratio of Cases Resulting In Granted Asylum: {grantedRatio}%</h2>
      </div>
    </div>
  );
};

export default DataHub;
