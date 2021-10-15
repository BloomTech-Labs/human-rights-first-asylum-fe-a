import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';

import { UserOutlined } from '@ant-design/icons';
import { Button, Typography, Input, Card, Drawer, Avatar } from 'antd';
import './JudgePage.less';

import FeatherIcon from 'feather-icons-react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export default function JudgePage(props) {
  const { authState } = props;
  const [judge, setJudge] = useState();
  const [vizData, setVizData] = useState(null);
  const { judge_id } = useParams();

  useEffect(() => {
    axiosWithAuth()
      .get(`/judges/${judge_id}/vis`)
      .then(res => {
        console.log(res.data);
        setVizData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [judge_id]);

  const CountryOriginChart = () => {
    vizData.layout.title = 'Outcomes by Protected Ground';
    return (
      <Plot
        data={vizData.data}
        layout={vizData.layout}
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
        style={{ width: '100%', height: '25rem' }}
      />
    );
  };
  const columns = [
    {
      field: 'id',
      renderHeader: params => <strong>{'Case Id'}</strong>,
      width: 130,
      headerName: 'Case Id',
      options: {
        filter: true,
      },
      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} className="judgePageLink">
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'nation_of_origin',
      renderHeader: params => <strong>{'Nation of Origin'}</strong>,
      headerName: 'Nation of Origin',
      width: 180,
    },
    {
      field: 'protected_ground',
      renderHeader: params => <strong>{'Protected Ground'}</strong>,
      headerName: 'Protected Ground',
      width: 180,
    },
    {
      field: 'application_type ',
      renderHeader: params => <strong>{'Application Type'}</strong>,
      headerName: 'Application Type ',
      width: 180,
    },
    {
      field: 'outcome',
      renderHeader: params => <strong>{'Decision'}</strong>,
      headerName: 'Decision',
      width: 140,
    },
  ];

  useEffect(() => {
    async function fetchJudge() {
      axios
        .get(`${process.env.REACT_APP_API_URI}/judges/${judge_id}`, {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        })
        .then(res => {
          setJudge(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchJudge();
  }, [judge_id, authState.idToken]);

  return (
    <div className="judgePageContainer">
      {judge && (
        <div>
          <div className="imgBox">
            <h1>
              {judge.first_name +
                ' ' +
                judge.middle_initial +
                '. ' +
                judge.last_name}
            </h1>
            {judge.birthdate ? <p>Birthdate: {judge.birthdate}</p> : null}

            <p>County: {judge.county}</p>
            <a
              className="judgePageLink"
              href={judge.biography}
              target="_blank"
              rel="noopener noreferrer"
            >
              Biography
            </a>
            <br></br>
            <h3 className="judgeDisclaimer">
              Judge {judge.first_name} {judge.middle_initial} {judge.last_name}{' '}
              serves in the county of {judge.county}.<br></br>
              <br></br> All visualizations regarding Judge {judge.last_name}'s
              asylum acceptance and denial rates reflect only the data in the
              database. As more cases are added, more data can be visualized.
              You can find more context for individual judge data at this
              resource's
              <a href="https://trac.syr.edu/immigration/reports/judgereports/">
                {' '}
                website.
              </a>
            </h3>
          </div>

          <div className="judgeStatsVizDiv">
            <div className="judgeViz">{vizData && <CountryOriginChart />}</div>
          </div>
        </div>
      )}
    </div>
  );
}
