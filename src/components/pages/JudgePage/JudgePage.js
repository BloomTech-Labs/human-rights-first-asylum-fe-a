import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';

import { UserOutlined } from '@ant-design/icons';
import { Button, Typography, Input, Card, Drawer, Avatar } from 'antd';
import './JudgePage.less';

import FeatherIcon from 'feather-icons-react';

export default function JudgePage(props) {
  const { authState } = props;
  const [judge, setJudge] = useState();
  const [vizData, setVizData] = useState(null);
  const { judge_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/judges/${judge_id}/cases`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        console.log(res.data);
        setVizData(res.data);
      });
  }, [judge_id, authState.idToken]);

  // const TestDataChart = () => {
  //   return <Plot data={vizData.data} layout={vizData.layout} />;
  // };

  const CountryOriginChart = () => {
    vizData.bar_country_of_origin.layout.title =
      'Outcomes by Country of Origin';
    return (
      <Plot
        data={vizData.bar_country_of_origin.data}
        layout={vizData.bar_country_of_origin.layout}
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

  const GenderChart = () => {
    vizData.bar_gender.layout.title = 'Outcomes By Gender';
    return (
      <Plot
        data={vizData.bar_gender.data}
        layout={vizData.bar_gender.layout}
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

  const ProGroundsChart = () => {
    vizData.bar_protected_grounds.layout.title =
      'Outcomes by Protected Grounds';
    return (
      <Plot
        data={vizData.bar_protected_grounds.data}
        layout={vizData.bar_protected_grounds.layout}
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

  // const Toolbar = () => {
  //   const { Title } = Typography;

  //   return (
  //     <div className="menuContainer">
  //       <Title level={2}>Judge</Title>
  //       <div className="buttonContainer">
  //         <Button
  //           onClick={() => {
  //             toggleSearch();
  //           }}
  //         >
  //           <FeatherIcon icon="search" />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  // const [queryValues, setQueryValues] = useState({
  //   case_id: '',
  //   nation_of_origin: '',
  //   protected_ground: '',
  //   application_type: '',
  //   outcome: '',
  // });

  // const [new_search, setSearch] = useState(false);
  // const toggleSearch = () => {
  //   setSearch(!new_search);
  // };
  // const [searching, setSearching] = useState(false);

  // const filter = data => {
  //   const searchedKeys = Object.entries(queryValues).filter(
  //     ([k, v]) => v !== ''
  //   );
  //   const filteredData = data.filter(row => {
  //     const matchedHits = [];
  //     searchedKeys.forEach(([k, v]) => {
  //       if (row[k].toString().includes(v.toString())) {
  //         matchedHits.push(k);
  //       }
  //     });
  //     // return matchedHits.length === searchedKeys.length;
  //   });
  //   return filteredData;
  // };

  // const searchOptions = [
  //   { id: 'case_id', label: 'Case Id' },
  //   { id: 'nation_of_origin', label: 'Nation of Origin' },
  //   { id: 'protected_ground', label: 'Protected Ground' },
  //   { id: 'application_type', label: 'Application Type' },
  //   { id: 'outcome', label: 'Decision' },
  // ];

  // const drawerContent = () => {
  //   return (
  //     <div className="judgePageDrawer">
  //       {searchOptions.map(value => {
  //         return (
  //           <div key={value.id}>
  //             <p>{value.label}</p>
  //             <Input
  //               placeholder={'search query'}
  //               variant="outlined"
  //               size="medium"
  //               value={queryValues[value.id]}
  //               onChange={e => {
  //                 setQueryValues({
  //                   ...queryValues,
  //                   [value.id]: e.target.value,
  //                 });
  //                 setSearching(true);
  //               }}
  //               type="text"
  //               className="judgePageSearchInput"
  //             />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div className="judgePageContainer">
      {judge && (
        <div>
          <div className="imgBox">
            <h3 className="judgeDisclaimer">
              {judge.first_name} {judge.middle_initial}. {judge.last_name}{' '}
              serves as a judge in the county of {judge.county}. All
              visualizations regarding Judge {judge.first_name}{' '}
              {judge.middle_initial}. {judge.last_name}'s asylum acceptance
              rates and asylum denial rates reflect only the data in the
              database. As more cases are added, more data can be visualized.
            </h3>
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
          </div>

          <div className="judgeStatsVizDiv">
            <div className="judgeViz">{vizData && <CountryOriginChart />}</div>
            <div className="judgeViz">{vizData && <GenderChart />}</div>
            <div className="judgeViz">{vizData && <ProGroundsChart />}</div>
          </div>

          {/* <Drawer
            visible={new_search}
            onClose={toggleSearch}
            width={'25%'}
            style={{ marginTop: '4rem' }}
          >
            {drawerContent()}
          </Drawer> */}

          {/* <div className="judgePageGridContainer"> */}
          {/* Cases: "A section including relevant information/table of active
            cases" */}
          {/* <DataGrid
              rows={searching ? filter(judge.case_data) : judge.case_data}
              columns={columns}
              className="judgePageTable"
              autoHeight={true}
              components={{ Toolbar: Toolbar }}
            /> */}
          {/* </div> */}
          {/* // * The above is left commented on the off chance we want to reroute and still render this info */}
        </div>
      )}
    </div>
  );
}
