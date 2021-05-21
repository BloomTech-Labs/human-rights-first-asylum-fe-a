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
            'eyJraWQiOiJrMjJwZmRidEJsZlk1cGE0U1BMa1luWHp0SkVVY2MzS2hUbHJtZlRKNWxBIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVsemRyaXpFMnl6eFRvSDVkNiIsIm5hbWUiOiJUZXN0IEFkbWluIDAwMSIsImVtYWlsIjoibGxhbWEwMDFAbWFpbGRyb3AuY2MiLCJ2ZXIiOjEsImlzcyI6Imh0dHBzOi8vZGV2LTQxMzI3Nzg2Lm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9hYmJxbW92SG5RVG9SQlA1ZDYiLCJpYXQiOjE2MjE1NDU1MzgsImV4cCI6MTYyMTU0OTEzOCwianRpIjoiSUQuLVVYVDVyZVh3VXdBblB6TkZ3YVRRQjl6YTdQMVRHSEFnM1NiZ0M0SVJiTSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvYmJzY2wyYlM3YzdjRkQ1ZDYiLCJub25jZSI6Ik1VZlE4dmJTcEdyRmxTSVFLVnVFejZOSGtFVFM5Qlp0QmhqbzFjckp6d2tadURpRDJjUHFJazg3YkEyejFiVUsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsbGFtYTAwMUBtYWlsZHJvcC5jYyIsImF1dGhfdGltZSI6MTYyMTU0NTUzNiwiYXRfaGFzaCI6ImY3Mm96NEg2d2dhNkNiVU5KN1JJeGcifQ.CXve57ultU8LF7KUAswDBY2djo2FednyjSVfy9CCoXPIpcTryf6pQwcTEyOPSC9DpPApwL8mUZ8cRVmhX6F5Kb_2H1eKHeF2wRa0Sizgv79dGI59Y8hGum1xLq3zOkWC18inAsHPTAfIrgsSGogSNuf57s-7DviXWZqaI3bzp60tBQJzFedfkdIXonh7fBlot367ffDcNqNBcyPLSMhivHqPrctNPx3MsXq7VatFK3ll5wDKl_ZWt-BkrURJXDEdTmCFdWW4vZ16IuCLbSQvLsy9bU-x86nko-75i6xmUSpc6TwP71rjabM6ygPLsKhUq22DldZKvYA4zLAYOaq7vw',
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
