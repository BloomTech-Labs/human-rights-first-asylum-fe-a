import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import './JudgePage.css';

import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu, Input, Card, Drawer, Avatar } from 'antd';

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
      field: 'case_outcome',
      renderHeader: params => <strong>{'Decision'}</strong>,
      headerName: 'Decision',
      width: 140,
    },
  ];

  useEffect(() => {
    async function fetchJudge() {
      axios
        .get(`${process.env.REACT_APP_API_URI}/judge/${name}`, {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
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
      <Menu className="judgePageContainer">
        <div className="judgePageToolbar">
          <div
            onClick={() => {
              toggleSearch();
            }}
          >
            <Button
              className="judgePageBtn"
              type="default"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
        </div>
      </Menu>
    );
  };

  const [queryValues, setQueryValues] = useState({
    case_id: '',
    nation_of_origin: '',
    protected_ground: '',
    application_type: '',
    case_outcome: '',
  });

  const [new_search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!new_search);
  };
  const [searching, setSearching] = useState(false);

  const filter = data => {
    const searchedKeys = Object.entries(queryValues).filter(
      ([k, v]) => v !== ''
    );
    const filteredData = data.filter(row => {
      const matchedHits = [];
      searchedKeys.forEach(([k, v]) => {
        if (row[k].toString().includes(v.toString())) {
          matchedHits.push(k);
        }
      });
      return matchedHits.length === searchedKeys.length;
    });
    return filteredData;
  };

  const searchOptions = [
    { id: 'case_id', label: 'Case Id' },
    { id: 'nation_of_origin', label: 'Nation of Origin' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'application_type', label: 'Application Type' },
    { id: 'case_outcome', label: 'Decision' },
  ];

  const drawerContent = () => {
    return (
      <div className="judgePageDrawer">
        {searchOptions.map(value => {
          return (
            <div key={value.id}>
              <p>{value.label}</p>
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
                className="judgePageSearchInput"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="judgePageContainer">
      {judge && (
        <div>
          <div className="imgBox">
            <div>
              <Avatar shape="square" size={200} icon={<UserOutlined />} />
              <h1>{judge.name}</h1>
            </div>
            <Card className="judgePageCard" title="Judge Info">
              <p>Birthdate: {judge.birth_date}</p>
              <p>Appointed: {judge.date_appointed}</p>
              <p>Appointed By: {judge.appointed_by}</p>
              <p>County: {judge.judge_county}</p>
              <a
                className="judgePageLink"
                href={judge.biography}
                target="_blank"
                rel="noopener noreferrer"
              >
                Biography
              </a>
            </Card>
          </div>
          <Drawer
            className="judgePageDrawer"
            visible={new_search}
            onClose={toggleSearch}
          >
            {drawerContent()}
          </Drawer>

          <div className="judgePageGridContainer">
            {/* Cases: "A section including relevant information/table of active
            cases" */}
            <DataGrid
              rows={searching ? filter(judge.case_data) : judge.case_data}
              columns={columns}
              className="judgePageTable"
              autoHeight={true}
              components={{ Toolbar: Toolbar }}
            />
          </div>

          <div>
            <div className="judgePagePlotDiv">
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
            </div>
            <div className="judgePagePlotDiv">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
