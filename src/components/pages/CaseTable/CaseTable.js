import React, { useState } from 'react';
import {
  DataGrid,
  GridColumnsToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from '@material-ui/data-grid';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  SearchOutlined,
  DownloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

// Imports for PDF Modal
import PDFViewer from '../PDFViewer/PDFViewer';
import { Button, Menu } from 'antd';
import './CaseTable.css';
import { Drawer } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 15,
    height: '90vh',
  },
  tbl_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '57%',
    margin: 'auto',
    marginTop: 100,
    flexGrow: 1,
    position: 'relative',
    paddingRight: 30,
  },
  select: {
    margin: 70,
    height: 20,
  },
  search_container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  colFilter: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
  },

  pdfView: {
    width: '100%',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  queryFields: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    border: '1px solid grey',
    top: '220px',
    right: 95,
    background: 'white',
    zIndex: 100,
    borderRadius: '10px',
  },
  filterButton: {
    background: '#215589',
    padding: '3%',
    width: '100%',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: 'larger',
    border: 'none',
  },
  drawer: {
    width: 300,
    marginTop: '30%',
    display: 'flex',
    flexFlow: 'column wrap',
  },
  tabs: {
    width: '30%',
  },
  chips: {
    display: 'flex',
  },
  buttons: {
    display: 'flex',
    width: '30%',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    width: '100%',
    color: 'black',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function CaseTable(props) {
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
        console.log(res.data);
        setShowPdf(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
    {
      field: 'primary_key',
      renderHeader: params => <strong>{'Case ID'}</strong>,
      width: 130,
      className: 'tableHeader',
      options: {
        filter: true,
      },
      //link to individual case page

      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} style={{ color: '#215589' }}>
            <span> {params.row['case_id']}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'hearing_date',
      renderHeader: params => <strong>{'Date'}</strong>,
      width: 110,
      className: 'tableHeader',
    },
    {
      field: 'judge_name',
      renderHeader: params => <strong>{'Judge'}</strong>,
      width: 160,
      className: 'tableHeader',
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
      field: 'initial_or_appellate',
      renderHeader: params => <strong>{'Initial Hearing'}</strong>,
      width: 130,
      className: 'tableHeader',
    },
    {
      field: 'case_origin',
      renderHeader: params => <strong>{'Case Origin'}</strong>,
      width: 160,
      className: 'tableHeader',
    },
    {
      field: 'case_filed_within_one_year',
      renderHeader: params => <strong>{'Filed 1 Year'}</strong>,
      width: 115,
      className: 'tableHeader',
    },
    {
      field: 'protected_ground',
      renderHeader: params => <strong>{'Protected Ground'}</strong>,
      width: 155,
      className: 'tableHeader',
    },
    {
      field: 'case_outcome',
      renderHeader: params => <strong>{'Outcome'}</strong>,
      width: 110,
      className: 'tableHeader',
    },
    {
      field: 'nation_of_origin',
      renderHeader: params => <strong>{'Nation of Origin'}</strong>,
      width: 140,
      className: 'tableHeader',
    },
    {
      field: 'applicant_gender',
      renderHeader: params => <strong>{'Applicant Gender'}</strong>,
      width: 155,
      className: 'tableHeader',
    },
    {
      field: 'type_of_violence_experienced',
      renderHeader: params => <strong>{'Violence Experienced'}</strong>,
      width: 185,
      className: 'tableHeader',
    },
    {
      field: 'application_type',
      renderHeader: params => <strong>{'Application Type'}</strong>,
      width: 140,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'applicant_indigenous_group',
      renderHeader: params => <strong>{'Indigenous Group'}</strong>,
      width: 150,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'applicant_language',
      renderHeader: params => <strong>{'Applicant Language'}</strong>,
      width: 160,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'applicant_access_to_interpreter',
      renderHeader: params => <strong>{'Interpreter'}</strong>,
      width: 100,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'applicant_perceived_credibility',
      renderHeader: params => <strong>{'Applicant Credibility'}</strong>,
      width: 160,
      className: 'tableHeader',
      hide: true,
    },
    // MODAL for PDFs / to be removed?

    {
      field: 'view_pdf',
      headerName: 'View PDF',
      width: 100,
      className: 'tableHeader',
      hide: true,
      renderCell: params => (
        // Hook to control whether or not to show the PDF Modal
        <>
          <div className={classes.pdfView}>
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
      className: 'tableHeader',
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

  const classes = useStyles();

  // the need for idParamName arose from case_id and id being used in different scenarios
  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.primary_key === rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const postBookmark = rowToPost => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/profile/${userInfo.sub}/case/${rowToPost.primary_key}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.case_bookmarks.slice(-1); // response comes back as array of all existing bookmarks
        let justAddedID = justAdded[0].primary_key;
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
        savedIds.push(savedCases[i].primary_key);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedIds.includes(bookmarks[i].primary_key)) {
          console.log('Case already saved to bookmarks');
          continue;
        } else {
          postBookmark(bookmarks[i]);
        }
      }
    }
    alert('Cases Successfully Saved');
  };

  const onCheckboxSelect = selections => {
    setSelectedRows(selections);
  };

  const [queryValues, setQueryValues] = useState({
    case_id: '',
    hearing_date: '',
    judge_name: '',
    initial_or_appellate: '',
    case_origin: '',
    case_filed_within_one_year: '',
    application_type: '',
    protected_ground: '',
    case_outcome: '',
    nation_of_origin: '',
    applicant_gender: '',
    type_of_violence_experienced: '',
    applicant_indigenous_group: '',
    applicant_language: '',
    applicant_access_to_interpreter: '',
    applicant_perceived_credibility: '',
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
    { id: 'case_id', label: 'Case ID' },
    { id: 'hearing_date', label: 'Hearing Date' },
    { id: 'judge_name', label: 'Judge' },
    { id: 'initial_or_appellate', label: 'Initial or Appellate' },
    { id: 'case_origin', label: 'Case Origin' },
    { id: 'case_filed_within_one_year', label: 'Case Filed Within One Year' },
    { id: 'application_type', label: 'Application Type' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'case_outcome', label: 'Case Outcome' },
    { id: 'nation_of_origin', label: 'Nation of Origin' },
    { id: 'applicant_gender', label: 'Applicant Gender' },
    { id: 'type_of_violence_experienced', label: 'Violence Experienced' },
    { id: 'applicant_indigenous_group', label: 'Indigenous Applicant' },
    { id: 'applicant_language', label: 'Applicant Language' },
    { id: 'applicant_access_to_interpreter', label: 'Access to Interpreter' },
    {
      id: 'applicant_perceived_credibility',
      label: 'Applicant Perceived Credibility',
    },
  ];
  const drawerContent = () => {
    return (
      <div className={classes.drawer}>
        <CancelIcon
          className={classes.close}
          onClick={() => {
            toggleSearch();
          }}
        />
        {searchOptions.map(value => {
          return (
            <div key={value.id}>
              <p style={{ marginLeft: '15%' }}>{value.label}</p>
              <TextField
                placeholder={'search query'}
                variant="outlined"
                size="small"
                value={queryValues[value.id]}
                onChange={e => {
                  setQueryValues({
                    ...queryValues,
                    [value.id]: e.target.value,
                  });
                  setSearching(true);
                }}
                type="text"
                style={{ marginLeft: '15%', marginBottom: 10 }}
              />
            </div>
          );
        })}
      </div>
    );
  };

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
              style={{ background: '#3f51b5', color: '#fff' }}
              type="default"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>

          <div
            className={classes.toolbar_options}
            onClick={() => {
              bookmarkCases(selectedRows);
            }}
          >
            <Button type="default" icon={<SaveOutlined />}>
              Save Cases
            </Button>
          </div>

          <Button type="default" icon={<DownloadOutlined />}>
            Download All Selected
          </Button>

          <div>
            <GridColumnsToolbarButton />
            <GridDensitySelector />
            <GridToolbarExport />
          </div>
        </div>
      </Menu>
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

  return (
    <div className={classes.tbl_container}>
      <PieChart />
      <div className={classes.search_container}>
        {searching && (
          <div className={classes.chips}>
            {searchOptions.map(option => {
              if (queryValues[option.id] !== '') {
                return (
                  <Chip
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
          anchor="right"
          open={new_search}
          onClose={toggleSearch}
          variant="persistent"
        >
          {drawerContent()}
        </Drawer>
      </div>
      <DataGrid
        rows={searching ? filter(caseData) : caseData}
        columns={columns}
        className={classes.grid}
        loading={caseData ? false : true}
        checkboxSelection={true}
        onSelectionModelChange={onCheckboxSelect}
        showCellRightBorder={true}
        disableColumnMenu={true}
        components={{ Toolbar: Toolbar }}
      />
    </div>
  );
}
