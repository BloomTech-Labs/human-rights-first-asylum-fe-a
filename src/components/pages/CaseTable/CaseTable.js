import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import {
  DataGrid,
  GridColumnsToolbarButton,
  GridToolbarExport,
} from '@material-ui/data-grid';

import {
  Button,
  Typography,
  Drawer,
  Input,
  Card,
  Menu,
  Dropdown,
  message,
} from 'antd';
import './CaseTable.css';

import FeatherIcon from 'feather-icons-react';

import PDFViewer from '../PDFViewer/PDFViewer';
import PDFExportButton from './PDFOverviewExport/PDFExportButton';

export default function CaseTable(props) {
  const { Title } = Typography;

  const {
    caseData,
    userInfo,
    savedCases,
    setSavedCases,
    authState,
    setSelectedRows,
    selectedRows,
  } = props;

  const { id } = useParams();

  // State for PDF Modal
  const [showPdf, setShowPdf] = useState(false);

  const pdfData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/case/${id}`)
      .then(res => {
        setShowPdf(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
    {
      field: 'case_number',
      renderHeader: params => <strong>{'Case Number'}</strong>,
      headerName: 'Case Number',
      width: 130,
      options: {
        filter: true,
      },
      //link to individual case page

      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} className="caseTableLink">
            <span> {params.row['case_number']}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'date',
      renderHeader: params => <strong>{'Date'}</strong>,
      headerName: 'Date',
      width: 110,
    },
    {
      field: 'judge_name',
      renderHeader: params => <strong>{'Judge'}</strong>,
      headerName: 'Judge',
      width: 160,
      renderCell: params => (
        <>
          <Link
            to={`/judge/${params.value.split(' ').join('%20')}`}
            style={{ color: '#215589' }}
          >
            {params.value}
          </Link>
        </>
      ),
    },
    {
      field: 'case_origin_city',
      renderHeader: params => <strong>{'Origin City'}</strong>,
      headerName: 'Origin City',
      width: 160,
    },
    {
      field: 'case_origin_state',
      renderHeader: params => <strong>{'Origin State'}</strong>,
      headerName: 'Origin State',
      width: 120,
    },
    {
      field: 'filed_in_one_year',
      renderHeader: params => <strong>{'Filed in 1 Year'}</strong>,
      headerName: 'Filed in 1 Year',
      width: 145,
    },
    {
      field: 'protected_grounds',
      renderHeader: params => <strong>{'Protected Grounds'}</strong>,
      headerName: 'Protected Grounds',
      width: 155,
    },
    {
      field: 'case_outcome',
      renderHeader: params => <strong>{'Outcome'}</strong>,
      headerName: 'Outcome',
      width: 110,
    },
    {
      field: 'country_of_origin',
      renderHeader: params => <strong>{'Country of Origin'}</strong>,
      headerName: 'Country of Origin',
      width: 140,
    },
    {
      field: 'gender',
      renderHeader: params => <strong>{'Applicant Gender'}</strong>,
      headerName: 'Applicant Gender',
      width: 155,
    },
    {
      field: 'type_of_violence',
      renderHeader: params => <strong>{'Violence Experienced'}</strong>,
      headerName: 'Violence Experienced',
      width: 185,
    },
    {
      field: 'application_type',
      renderHeader: params => <strong>{'Application Type'}</strong>,
      headerName: 'Application Type',
      width: 140,
      hide: true,
    },
    {
      field: 'indigenous_group',
      renderHeader: params => <strong>{'Indigenous Group'}</strong>,
      headerName: 'Indigenous Group',
      width: 150,
      hide: true,
    },
    {
      field: 'applicant_language',
      renderHeader: params => <strong>{'Applicant Language'}</strong>,
      headerName: 'Applicant Language',
      width: 160,
      hide: true,
    },
    {
      field: 'credible',
      renderHeader: params => <strong>{'Credible Applicant'}</strong>,
      headerName: 'Credible Applicant',
      width: 160,
      hide: true,
    },
    // MODAL for PDFs / to be removed?

    {
      field: 'view_pdf',
      headerName: 'View PDF',
      width: 100,
      hide: true,
      renderCell: params => (
        // Hook to control whether or not to show the PDF Modal
        <>
          <div className="pdfView">
            <PDFViewer
              pdf={pdfData} // this will be set to viewPdf when endpoint is available
              onCancel={() => setShowPdf(false)}
              visible={showPdf}
            />
            <Button onClick={setShowPdf}>PDF</Button>
          </div>
        </>
      ),
    },
    {
      field: 'download',
      headerName: 'Download',
      width: 100,
      hide: true,
      renderCell: params => {
        return (
          <div>
            <a
              style={{ color: '#215589' }}
              href={`${process.env.REACT_APP_API_URI}/case/${params.row.id}/download-pdf`}
            >
              PDF
            </a>
          </div>
        );
      },
    },
  ];

  // the need for idParamName arose from case_id and id being used in different scenarios
  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.case_number === rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const postBookmark = rowToPost => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/profile/${userInfo.sub}/case/${rowToPost.case_number}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.case_bookmarks.slice(-1); // response comes back as array of all existing bookmarks
        let justAddedID = justAdded[0].case_number;
        let wholeAddedRow = findRowByID(justAddedID, caseData);
        setSavedCases([...savedCases, wholeAddedRow]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const bookmarkCases = targetRows => {
    // loop through currently selected cases and do post requests
    // need to reference rows by id, as that is all that selection stores
    // need to account for duplicates as well
    let bookmarks = [];
    if (targetRows) {
      for (let i = 0; i < targetRows.length; i++) {
        bookmarks.push(findRowByID(targetRows[i], caseData));
      }
      let savedIds = [];
      for (let i = 0; i < savedCases.length; i++) {
        savedIds.push(savedCases[i].case_number);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedIds.includes(bookmarks[i].case_number)) {
          console.log('Case already saved to bookmarks');
          continue;
        } else {
          postBookmark(bookmarks[i]);
        }
      }
    }
    alert('Cases Successfully Saved');
  };

  // eslint-disable-next-line no-unused-vars
  const onCheckboxSelect = selections => {
    setSelectedRows(selections);
  };

  const [queryValues, setQueryValues] = useState({
    case_number: '',
    date: '',
    judge: '',
    case_origin_city: '',
    case_origin_state: '',
    filed_in_one_year: '',
    application_type: '',
    protected_grounds: '',
    case_outcome: '',
    country_of_origin: '',
    gender: '',
    type_of_violence: '',
    indigenous_group: '',
    applicant_language: '',
    credible: '',
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
        if (
          row[k]
            .toString()
            .toLowerCase()
            .includes(v.toString().toLowerCase())
        ) {
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
    { id: 'case_number', label: 'Case Number' },
    { id: 'date', label: 'Date' },
    { id: 'judge', label: 'Judge' },
    { id: 'case_origin_city', label: 'Origin City' },
    { id: 'case_origin_state', label: 'Origin State' },
    { id: 'filed_in_one_year', label: 'Case Filed Within One Year' },
    { id: 'application_type', label: 'Application Type' },
    { id: 'protected_grounds', label: 'Protected Grounds' },
    { id: 'case_outcome', label: 'Case Outcome' },
    { id: 'country_of_origin', label: 'Country of Origin' },
    { id: 'gender', label: 'Applicant Gender' },
    { id: 'type_of_violence', label: 'Violence Experienced' },
    { id: 'indigenous_group', label: 'Indigenous Applicant' },
    { id: 'applicant_language', label: 'Applicant Language' },
    {
      id: 'credible',
      label: 'Credible Applicant',
    },
  ];
  const drawerContent = () => {
    return (
      <div className="caseTableDrawer">
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
                className="caseTableSearchInput"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const CustomToolbar = () => {
    const menuClick = ({ key }) => {
      message.info(`Click on item ${key}`);
    };

    const menu = (
      <Menu onClick={menuClick}>
        <Menu.Item
          key="1"
          className="exportBtn"
          icon={<FeatherIcon icon="download" />}
        >
          <GridToolbarExport />
        </Menu.Item>
        <Menu.Item key="2" icon={<FeatherIcon icon="download" />}>
          <PDFExportButton caseData={filter(caseData)} viz={<PieChart />} />
        </Menu.Item>
        <Menu.Item key="3" icon={<FeatherIcon icon="download" />}>
          Download all as PDF
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="menuContainer">
        <Title level={2}>
          {
            <AppBar
              position="static"
              classes={{ root: classes.root }}
              elevation={0}
            >
              <Tabs
                value={tabValue}
                onChange={onChange}
                aria-label="Types of Cases"
                classes={{
                  root: classes.root,
                  indicator: classes.tabIndicator,
                }}
              >
                <Tab label="Initial Cases" />
                <Tab label="Appellate Cases" />
              </Tabs>
            </AppBar>
          }
        </Title>
        <div className="buttonContainer">
          <Dropdown.Button
            icon={<FeatherIcon icon="download" />}
            onClick={e => e.preventDefault()}
            overlay={menu}
            trigger={['click']}
          ></Dropdown.Button>

          <Button
            onClick={() => {
              toggleSearch();
            }}
          >
            <FeatherIcon icon="search" />
          </Button>

          <Button
            onClick={() => {
              bookmarkCases(selectedRows);
            }}
          >
            <FeatherIcon icon="bookmark" />
          </Button>

          <Button className="columnsBtn">
            <GridColumnsToolbarButton onClick={e => e.preventDefault()} />
          </Button>
        </div>
      </div>
    );
  };

  const data = searching ? filter(caseData) : caseData;

  const PieChart = () => {
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
            type: 'pie',
            values: [granted, denied, remanded, sustained, terminated],
            labels: [
              'Granted',
              'Denied',
              'Remanded',
              'Sustained',
              'Terminated',
            ],
            textinfo: 'label+percent',
            textposition: 'outside',
            automargin: true,
          },
        ]}
        layout={{
          height: 300,
          width: 300,
          showlegend: false,
          title: 'Decision Rate',
        }}
      />
    );
  };

  const [tabValue, setTabValue] = useState(0);

  const onChange = (e, newTabValue) => {
    setTabValue(newTabValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        className="tabPanel"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const useStyles = makeStyles(theme => ({
    root: {
      background: '#fff',
      color: '#215589',
      height: 48,
      zIndex: 1,
    },
    tabIndicator: {
      backgroundColor: '#c95202',
    },
    tabPanel: {
      width: '100%',
    },
  }));

  const classes = useStyles();
  const sampleAppellateCases = [];
  caseData.forEach(item => sampleAppellateCases.unshift(item));
  // Conditional rendering needs to be applied to render initial and appellate cases to their respective tabs

  return (
    <div className="caseTableContainer">
      <PieChart />
      <div className="caseTableCard">
        {searching && (
          <div>
            {searchOptions.map(option => {
              if (queryValues[option.id] !== '') {
                return (
                  <Card
                    key={option.id}
                    label={`${option.label}: "${queryValues[option.id]}"`}
                    onDelete={() => {
                      setQueryValues({
                        ...queryValues,
                        [option.id]: '',
                      });
                    }}
                    style={{ marginRight: 5 }}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
        <Drawer
          visible={new_search}
          onClose={toggleSearch}
          width={'25%'}
          style={{ marginTop: '4rem' }}
        >
          {drawerContent()}
        </Drawer>
      </div>

      <TabPanel className={classes.tabPanel} value={tabValue} index={0}>
        <div className="caseTableGridContainer">
          <DataGrid
            rows={
              caseData
                ? filter(caseData.filter(item => item.appellate === false))
                : caseData.filter(item => item.appellate === false)
            }
            columns={columns}
            className="caseTable"
            loading={caseData ? false : true}
            checkboxSelection={true}
            showCellRightBorder={true}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={tabValue} index={1}>
        <div className="caseTableGridContainer">
          <DataGrid
            rows={
              caseData
                ? filter(caseData.filter(item => item.appellate === true))
                : caseData.filter(item => item.appellate === true)
            }
            columns={columns}
            className="caseTable"
            loading={caseData ? false : true}
            checkboxSelection={true}
            showCellRightBorder={true}
            pageSize={25}
            disableColumnMenu={true}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </TabPanel>
    </div>
  );
}
