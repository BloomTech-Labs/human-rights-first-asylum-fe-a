import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// Imports for PDF Modal
import PDFViewer from '../PDFViewer/PDFViewer';
import { Button } from 'antd';
import './CaseTable.css';
import { Drawer } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 15,
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
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
    color: 'darkblue',
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
      headerName: 'Case ID',
      width: 130,
      className: 'tableHeader',
      options: {
        filter: true,
      },
      //link to individual case page

      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} style={{ color: '#215589' }}>
            <span>{params.row['case_id']}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'hearing_date',
      headerName: 'Hearing Date',
      width: 115,
      className: 'tableHeader',
    },
    {
      field: 'judge_name',
      headerName: 'Judge',
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
      headerName: 'Initial or Appellate',
      width: 80,
      className: 'tableHeader',
    },
    {
      field: 'case_origin',
      headerName: 'Case Origin',
      width: 150,
      className: 'tableHeader',
    },
    {
      field: 'case_filed_within_one_year',
      headerName: 'Case Filed Within One Year',
      width: 80,
      className: 'tableHeader',
    },
    {
      field: 'application_type ',
      headerName: 'Application Type ',
      width: 130,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'protected_ground',
      headerName: 'Protected Ground',
      width: 150,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'case_outcome',
      headerName: 'Case Outcome',
      width: 120,
      className: 'tableHeader',
    },
    {
      field: 'nation_of_origin',
      headerName: 'Nation of Origin',
      width: 130,
      className: 'tableHeader',
    },
    {
      field: 'applicant_gender',
      headerName: 'Applicant Gender',
      width: 130,
      className: 'tableHeader',
    },
    {
      field: 'type_of_violence_experienced',
      headerName: 'Type of Violence Experienced',
      width: 130,
      className: 'tableHeader',
    },
    {
      field: 'applicant_indigenous_group',
      headerName: 'Applicant Indigenous Group',
      width: 160,
      className: 'tableHeader',
      hide: true,
    },
    {
      field: 'applicant_language',
      headerName: 'Applicant Language',
      width: 110,
      className: 'tableHeader',
    },
    {
      field: 'applicant_access_to_interpreter',
      headerName: 'Access to Interpreter',
      width: 80,
      className: 'tableHeader',
    },
    {
      field: 'applicant_perceived_credibility',
      headerName: 'Applicant Perceived Credibility',
      width: 160,
      className: 'tableHeader',
      hide: true,
    },
    // MODAL for PDFs / to be removed?

    {
      field: 'view_pdf',
      headerName: 'View PDF',
      width: 110,
      className: 'tableHeader',
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
      width: 120,
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
            <a
              style={{ marginLeft: 20, color: '#215589' }}
              href={`${process.env.REACT_APP_API_URI}/case/${params.row.id}/download-csv`}
            >
              CSV
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
      if (currentRow.id === rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const postBookmark = rowToPost => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/profile/${userInfo.sub}/case/${rowToPost.id}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.case_bookmarks.slice(-1); // response comes back as array of all existing bookmarks
        let justAddedID = justAdded[0].case_id;
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
        savedIds.push(savedCases[i].id);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedIds.includes(bookmarks[i].id)) {
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
    judge_name: '',
    case_origin: '',
    nation_of_origin: '',
    protected_ground: '',
    application_type: '',
    case_outcome: '',
    applicant_access_to_interpreter: '',
    applicant_language: '',
    applicant_perceived_credibility: '',
    applicant_indigenous_group: '',
    case_filed_within_one_year: '',
  });

  const [new_search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!new_search);
  };
  const [searching, setSearching] = useState(false);
  const filter = rows => {
    const returnedRows = [];
    const keysArray = Object.keys(queryValues);
    const filtered = keysArray.filter(key => queryValues[key] !== '');
    if (filtered.length > 0) {
      rows.forEach(element => {
        let counter = 0;
        filtered.forEach(key => {
          const keyValue = element[key].toString();
          if (keyValue.includes(queryValues[key].toString())) {
            counter++;
          }
          if (counter === filtered.length) {
            returnedRows.push(element);
          }
        });
      });
      return returnedRows;
    }
    return rows;
  };
  const searchOptions = [
    { id: 'case_id', label: 'Case ID' },
    { id: 'judge_name', label: 'Judge' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'case_origin', label: 'Case Origin' },
    { id: 'application_type ', label: 'Application Type' },
    { id: 'case_outcome', label: 'Case Outcome' },
    { id: 'nation_of_origin', label: 'Nation of Origin' },
    { id: 'applicant_indigenous_group', label: 'Indigenous Applicant' },
    { id: 'applicant_language', label: 'Applicant Language' },
    { id: 'applicant_access_to_interpreter', label: 'Access to Interpreter' },
    { id: 'case_filed_within_one_year', label: 'Case Filed Within One Year' },
    {
      id: 'applicant_perceived_credibility',
      label: 'Applicant Perceived Credibility',
    },
  ];
  const drawerContent = () => {
    return (
      <div className={classes.drawer}>
        {searchOptions.map(value => {
          return (
            <div className={classes.querydiv} key={value.id}>
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
      <GridToolbarContainer>
        <div
          className={classes.toolbar}
          onClick={() => {
            toggleSearch();
          }}
        >
          <SearchIcon />
          <p>SEARCH</p>
        </div>
        <div
          className={classes.toolbar}
          onClick={() => {
            bookmarkCases(selectedRows);
          }}
        >
          <BookmarkBorderIcon />
          <p>SAVE CASES</p>
        </div>
        <GridColumnsToolbarButton />
        <GridDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div className={classes.tbl_container}>
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
        autoHeight={true}
        loading={caseData ? false : true}
        checkboxSelection={true}
        onSelectionModelChange={onCheckboxSelect}
        showCellRightBorder={true}
        components={{ Toolbar: Toolbar }}
      />
    </div>
  );
}
