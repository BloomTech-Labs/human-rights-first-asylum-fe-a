import React, { useState, useEffect } from 'react';
import './DataHub.less';
import Plot from 'react-plotly.js';
import axios from 'axios';

const DataHub = props => {
  const { caseData } = props;
  const [vizData, setVizData] = useState({});

  const data = caseData;

  useEffect(() => {
    axios
      .get('http://localhost:8080/judges/2/cases', {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJraWQiOiJrMjJwZmRidEJsZlk1cGE0U1BMa1luWHp0SkVVY2MzS2hUbHJtZlRKNWxBIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVsemRyaXpFMnl6eFRvSDVkNiIsIm5hbWUiOiJUZXN0IEFkbWluIDAwMSIsImVtYWlsIjoibGxhbWEwMDFAbWFpbGRyb3AuY2MiLCJ2ZXIiOjEsImlzcyI6Imh0dHBzOi8vZGV2LTQxMzI3Nzg2Lm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9hYmJxbW92SG5RVG9SQlA1ZDYiLCJpYXQiOjE2MjE2MDk3NTcsImV4cCI6MTYyMTYxMzM1NywianRpIjoiSUQuS1Npa2lJLWxueFlmNTNXZzA0aFFrNkNDVTgyU3NHWVItd1ptY3FwV2pIWSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvYmJzY2wyYlM3YzdjRkQ1ZDYiLCJub25jZSI6ImJwSFQ1TGg0Tmp0YlFWWkZzOWZScXg2WE9wTGlBVWhSZWxLdnpZcVBTTHdDUWQ3VXRCZkxHOUVjakJOZVM5cWEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsbGFtYTAwMUBtYWlsZHJvcC5jYyIsImF1dGhfdGltZSI6MTYyMTYwOTc1MiwiYXRfaGFzaCI6IjNpazdMRWwyZjFDRVJoek5fb0NodVEifQ.Wn7ZQLCXCdvpehBKnTHwmCiWqNLg_X6WL0dr2RyaFNSKGVk_3u08vIKVHD0bPQVidgEb-G8PZ0kMH5gA4aaLotMdk6Ml4RV8B_z4l-1GYIWA2G5eJNg4c3C2CQOB3KobwNeg2PZArhXjPibFJwz0A6nOvwiWBz5A9C7GMv5ulgYVMlZRuOAB4UQLhnBpEwruJ3H6G06ISzJ7492kBlYe0jTDf8KwUQ9FMtHoSD5XexN6Mf6gUPOEjlOM2_MTf9N7jJHEVXgli2uI2HDAPV2WPwCdhQSKS2XIUNlc5sBu1jBVkMDWl8RA3suJnQsQvdcGOJFa3VCSPoxmuIELor89Pg',
        },
      })
      .then(res => {
        console.log(res.data.judge_cases);
        setVizData(res.data.judge_cases);
      });
  }, []);

  const TestDataChart = () => {
    return <Plot data={vizData.data} layout={vizData.layout} />;
  };

  const CaseDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
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

  const MainDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
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
        layout={{ width: 1100, height: 400, title: 'Case Data' }}
      />
    );
  };

  return (
    <div className="dataHubContainer">
      <div className="mainChartContainer">
        <TestDataChart />
      </div>

      <div className="subChartsContainer">
        <CaseDataChart />
        <CaseDataChart />
      </div>
    </div>
  );
};

export default DataHub;
