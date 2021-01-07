import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { FullPage, FlexDiv, Profile } from './JudgePageStyled';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tbl_container: {
    marginBottom: 200,
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'court_type', headerName: 'Court Type', width: 105 },
  // { field: 'hearing_type', headerName: 'Hearing Type', width: 120 },
  { field: 'refugee_origin', headerName: 'Refugee Origin', width: 130 },
  { field: 'protected_ground', headerName: 'Protected Ground', width: 150 },
  // { field: 'hearing_location', headerName: 'Location', width: 120 },
  // { field: 'hearing_date', headerName: 'Hearing Date', width: 120 },
  // { field: 'decision_date', headerName: 'Decision Date', width: 150 },
  // {
  //   field: 'credibility_of_refugee',
  //   headerName: 'Refugee Credibility',
  //   width: 160,
  // },
  { field: 'social_group_type', headerName: 'Social Group', width: 130 },
  { field: 'judge_name', headerName: 'Judge Name', width: 120 },
  { field: 'judge_decision', headerName: 'Decision', width: 105 },
  { field: 'case_status', headerName: 'Case Status', width: 120 },
];

export default function JudgePage(props) {
  const { authState } = props;
  const [judge, setJudge] = useState();
  const { name } = useParams();
  const classes = useStyles();

  useEffect(() => {
    async function fetchJudge() {
      axios
        .get(`http://localhost:8080/judge/${name}`, {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        })
        .then(res => {
          console.log(res.data);
          setJudge(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchJudge();
  }, [name, authState.idToken]);

  return (
    <FullPage>
      {judge && (
        <div>
          <FlexDiv>
            <div>
              <img src="http://via.placeholder.com/300x400" />
              {
                // * This will hold the judge profile text
              }
            </div>
            <Profile>
              <p>Name: {judge.name} </p>
              <p>Birthdate: {judge.birth_date}</p>
              <p>Appointed: {judge.date_appointed}</p>
              <p>Appointed By: {judge.appointed_by}</p>
              <p>County: {judge.judge_county}</p>
              <p>Biography: {judge.biography}</p>
            </Profile>
          </FlexDiv>

          <div className={classes.tbl_container}>
            Cases: "A section including relevant information/table of active
            cases"
            <DataGrid
              columns={columns}
              rows={judge.case_data}
              autoHeight={true}
              loading={judge ? false : true}
            />
          </div>

          <FlexDiv>
            {
              //* values are granted: value, denial: value, other: value
            }
            <Plot
              data={[
                {
                  type: 'pie',
                  values: [112, 183, 115],
                  labels: ['Granted', 'Denial', 'Other'],
                  textinfo: 'label+percent',
                  textposition: 'outside',
                  automargin: true,
                },
              ]}
              layout={{
                height: 600,
                width: 600,
                showlegend: false,
                title: 'Decision Rate',
              }}
            />

            {
              //*y = number of negative uses, x = number of positive uses
              //* Text keyword, size = number of total uses - marker size: number of total uses * 10
            }
            <Plot
              data={[
                {
                  x: [65, 12, 33, 24, 15, 6],
                  y: [12, 2, 63, 14, 5, 76],
                  text: [
                    'War<br>size: 77',
                    'Famine<br>size: 14',
                    'LGBTQ<br>size: 93',
                    'Domestic Violence<br>size: 38',
                    'Region<br>size:20',
                    'Drug Violence<br>size:82',
                  ],
                  mode: 'markers',
                  marker: {
                    size: [770, 140, 930, 200, 820],
                    sizeref: 2,
                    sizemode: 'area',
                    color: [
                      Math.floor(Math.random() * 16777215).toString(16),
                      Math.floor(Math.random() * 16777215).toString(16),
                      Math.floor(Math.random() * 16777215).toString(16),
                      Math.floor(Math.random() * 16777215).toString(16),
                      Math.floor(Math.random() * 16777215).toString(16),
                      Math.floor(Math.random() * 16777215).toString(16),
                    ],
                  },
                },
              ]}
              layout={{
                title: 'Keyword Bubble Chart',
                showlegend: false,
                height: 600,
                width: 600,
              }}
            />
          </FlexDiv>
          <FlexDiv>
            {
              //* x = country_origin/social_group_type/protected_ground, y = granted: value / denial:value / other value
            }
            <Plot
              data={[
                {
                  x: [
                    'Syria',
                    'Cambodia',
                    'Mexico',
                    'Russia',
                    'Ukraine',
                    'Armenia',
                  ],
                  y: [20, 14, 23, 38, 10, 7],
                  name: 'Approval',
                  type: 'bar',
                  marker: { color: 'red' },
                },
                {
                  x: [
                    'Syria',
                    'Cambodia',
                    'Mexico',
                    'Russia',
                    'Ukraine',
                    'Armenia',
                  ],
                  y: [12, 18, 29, 4, 31, 89],
                  name: 'Denial',
                  type: 'bar',
                  marker: { color: 'blue' },
                },
                {
                  x: [
                    'Syria',
                    'Cambodia',
                    'Mexico',
                    'Russia',
                    'Ukraine',
                    'Armenia',
                  ],
                  y: [12, 18, 29, 19, 21, 16],
                  name: 'Other',
                  type: 'bar',
                  marker: { color: 'gray' },
                },
              ]}
              layout={{
                barmode: 'stack',
                width: 320,
                height: 240,
                title: 'Decision By Country',
              }}
            />
            <Plot
              data={[
                {
                  x: ['Gender', 'Orientation', 'Minority Group'],
                  y: [20, 14, 23],
                  name: 'Approval',
                  type: 'bar',
                  marker: { color: 'red' },
                },
                {
                  x: ['Gender', 'Orientation', 'Minority Group'],
                  y: [12, 18, 29],
                  name: 'Denial',
                  type: 'bar',
                  marker: { color: 'blue' },
                },
                {
                  x: ['Gender', 'Orientation', 'Minority Group'],
                  y: [12, 18, 29],
                  name: 'Other',
                  type: 'bar',
                  marker: { color: 'gray' },
                },
              ]}
              layout={{
                barmode: 'stack',
                width: 320,
                height: 240,
                title: 'Decision By Social Group',
              }}
            />
            <Plot
              data={[
                {
                  x: ['LGBTQ', 'Religious Persecution', 'Genocide', 'Spy?'],
                  y: [20, 14, 23, 38],
                  name: 'Approval',
                  type: 'bar',
                  marker: { color: 'red' },
                },
                {
                  x: ['LGBTQ', 'Religious Persecution', 'Genocide', 'Spy?'],
                  y: [12, 18, 29, 4],
                  name: 'Denial',
                  type: 'bar',
                  marker: { color: 'blue' },
                },
                {
                  x: ['LGBTQ', 'Religious Persecution', 'Genocide', 'Spy?'],
                  y: [12, 18, 29, 19],
                  name: 'Other',
                  type: 'bar',
                  marker: { color: 'gray' },
                },
              ]}
              layout={{
                barmode: 'stack',
                width: 320,
                height: 240,
                title: 'Decision By Protected Ground',
              }}
            />
          </FlexDiv>
        </div>
      )}
    </FullPage>
  );
}
