import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { FullPage, FlexDiv, PlotDiv } from './JudgePageStyled';
import './JudgePage.css';

import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu, Input, Card, Drawer, Avatar } from 'antd';

const useStyles = makeStyles(theme => ({
  judgeTbl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    minHeight: '30vh',
    height: '100%',
    margin: '5rem',
  },
  drawer: {
    width: 300,
    marginTop: '30%',
  },
  cards: {
    display: 'flex',
  },
  close: {
    textAlign: 'right',
    padding: '1%',
    margin: 'auto 2% auto auto',
    transform: 'scale(1.2)',
    '&:hover': {
      curser: 'pointer',
      transform: 'scale(1.4)',
    },
  },
  toolbar_options: {
    borderRadius: '6px',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    padding: '1rem',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '6px',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tbl_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
    flexGrow: 1,
    position: 'relative',
    paddingRight: 30,
  },
}));

export default function JudgePage(props) {
  const { authState } = props;
  const [judge, setJudge] = useState();
  const { name } = useParams();

  const columns = [
    {
      field: 'id',
      renderHeader: params => <strong>{'Case Id'}</strong>,
      width: 130,
      headerName: 'Case Id',
      className: 'tableHeader',
      options: {
        filter: true,
      },
      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} style={{ color: '#215589' }}>
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'court_type',
      renderHeader: params => <strong>{'Court Type'}</strong>,
      headerName: 'Court Type',
      width: 160,
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
      field: 'case_outcome',
      renderHeader: params => <strong>{'Decision'}</strong>,
      headerName: 'Decision',
      width: 140,
    },
    {
      field: 'case_status',
      renderHeader: params => <strong>{'Case Status'}</strong>,
      headerName: 'Case Status',
      width: 140,
    },
  ];

  const classes = useStyles();

  useEffect(() => {
    async function fetchJudge() {
      axios
        .get(`${process.env.REACT_APP_API_URI}/judge/${name}`, {
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

  const Toolbar = () => {
    return (
      <Menu>
        <div className={classes.toolbar}>
          <div
            className={classes.toolbar_options}
            onClick={() => {
              toggleSearch();
            }}
          >
            <Button
              style={{
                background: '#215589',
                color: '#fff',
                textTransform: 'uppercase',
              }}
              type="default"
              icon={<SearchOutlined style={{ color: '#fff' }} />}
            >
              Search
            </Button>
          </div>

          <div
            style={{
              WebkitTextFillColor: '#215589',
              WebkitMarginStart: '1rem',
            }}
          ></div>
        </div>
      </Menu>
    );
  };

  const [queryValues, setQueryValues] = useState({
    case_id: '',
    court_type: '',
    nation_of_origin: '',
    protected_ground: '',
    application_type: '',
    case_outcome: '',
    case_status: '',
  });

  const [new_search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!new_search);
  };
  const [searching, setSearching] = useState(false);

  const filter = data => {
    // searchedKeys is AT MOST 16 keys
    const searchedKeys = Object.entries(queryValues).filter(
      ([k, v]) => v !== ''
    );
    // for each ROW in DATA -- O(n) where n is the number of rows in our data
    const filteredData = data.filter(row => {
      const matchedHits = [];
      // map through each searched [K, V] pair -- O(searched_keys) where searchedKeys is at min 0 and at most 16
      // so nesting this inside is NOT all too expensive.
      searchedKeys.forEach(([k, v]) => {
        // if the stringified value at row[key] includes the searched-for value,
        // then we'll push the key to our matchedHits
        if (row[k].toString().includes(v.toString())) {
          matchedHits.push(k);
        }
      });
      // if the row[k] == v at EVERY searched-for key, then we'll return TRUE
      // else return FALSE
      return matchedHits.length === searchedKeys.length;
    });
    // filteredData is only going to contain rows where  every
    // searched column includes subtext that matches the searched term
    return filteredData;
  };

  const searchOptions = [
    { id: 'case_id', label: 'Case Id' },
    { id: 'court_type', label: 'Court Type' },
    { id: 'nation_of_origin', label: 'Nation of Origin' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'application_type', label: 'Application Type' },
    { id: 'case_outcome', label: 'Decision' },
    { id: 'case_status', label: 'Case Status' },
  ];

  const drawerContent = () => {
    return (
      <div className={classes.drawer}>
        {searchOptions.map(value => {
          return (
            <div key={value.id}>
              <p style={{ marginLeft: '5%' }}>{value.label}</p>
              <Input
                placeholder={'search query'}
                variant="outlined"
                size="medium"
                value={queryValues[value.id]}
                onChange={e => {
                  setQueryValues({
                    ...queryValues,
                    [value.id]: e.target.value,
                  });
                  setSearching(true);
                }}
                type="text"
                style={{ marginLeft: '5%', marginBottom: 10, marginTop: 10 }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // Needs a lot of styling work
    <FullPage>
      {judge && (
        <div>
          <FlexDiv className="header">
            <div className="imgBox">
              <Avatar shape="square" size={200} icon={<UserOutlined />} />
              <h1>{judge.name}</h1>
            </div>
            <Card title="Judge Info">
              <p>Birthdate: {judge.birth_date}</p>
              <p>Appointed: {judge.date_appointed}</p>
              <p>Appointed By: {judge.appointed_by}</p>
              <p>County: {judge.judge_county}</p>
              <a href={judge.biography}>Biography</a>
            </Card>
          </FlexDiv>
          <Drawer
            visible={new_search}
            onClose={toggleSearch}
            style={{ marginTop: '6rem' }}
          >
            {drawerContent()}
          </Drawer>

          <div className={classes.tbl_container}>
            Cases: "A section including relevant information/table of active
            cases"
            <DataGrid
              rows={searching ? filter(judge.case_data) : judge.case_data}
              columns={columns}
              className={classes.judgeTbl}
              autoHeight={true}
              components={{ Toolbar: Toolbar }}
            />
          </div>

          <div>
            <PlotDiv style={{ margin: '0 auto' }}>
              {
                //* values are granted: value, denial: value, other: value
              }
              <Plot
                data={[
                  {
                    type: 'pie',
                    values: [judge.approval_rate, judge.denial_rate],
                    labels: ['Granted', 'Denial'],
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
            </PlotDiv>
            <PlotDiv style={{ margin: '0 auto' }}>
              {
                //* x = country_origin/application_type /protected_ground, y = granted: value / denial:value / other value
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
                  title: 'Decision By Application Type ',
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
            </PlotDiv>
          </div>
        </div>
      )}
    </FullPage>
  );
}
