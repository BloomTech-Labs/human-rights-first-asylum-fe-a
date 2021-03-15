import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// Buttons
import Tabs from '../Home/Tabs';
import SaveButton from './SaveButton';
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
    width: 240,
    marginTop: '40%',
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
    setShowCaseTable,
    showCaseTable,
  } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
      field: 'hearing_date',
      headerName: 'Hearing Date',
      width: 150,
      className: 'tableHeader',
    },
    {
      field: 'id',
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
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'judge_name',
      headerName: 'Judge Name',
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
      field: 'hearing_location',
      headerName: 'Venue',
      width: 120,
      className: 'tableHeader',
    },

    {
      field: 'refugee_origin',
      headerName: 'Refugee Origin',
      width: 130,
      className: 'tableHeader',
    },

    {
      field: 'protected_ground',
      headerName: 'Protected Ground',
      width: 150,
      className: 'tableHeader',
    },
    {
      field: 'social_group_type',
      headerName: 'Social Group',
      width: 130,
      className: 'tableHeader',
    },
    {
      field: 'credibility_of_determination',
      headerName: 'Credibility Determined',
      width: 160,
      className: 'tableHeader',
    },

    {
      field: 'judge_decision',
      headerName: 'Case Outcome',
      width: 140,
      className: 'tableHeader',
    },
    {
      field: 'is_applicant_indigenous',
      headerName: 'Indigenous aplicant',
      width: 160,
      className: 'tableHeader',
    },
    {
      field: 'applicant_language',
      headerName: 'Applicant Language',
      width: 160,
      className: 'tableHeader',
    },
    {
      field: 'applicant_access_to_interpreter',
      headerName: 'Access to Intepreter',
      width: 160,
      className: 'tableHeader',
    },
    {
      field: 'one_year_guideline',
      headerName: 'One Year Guideline',
      width: 160,
      className: 'tableHeader',
    },
    {
      field: 'determined_applicant_credibility',
      headerName: 'Refugee Credibility',
      width: 160,
      className: 'tableHeader',
    },
    // MODAL for PDFs

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

  const handleChange = event => {
    setColumnToSearch(event.target.value);
    setSearchQuery('');
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const search = rows => {
    return rows.filter(
      row =>
        row[columnToSearch].toLowerCase().indexOf(searchQuery.toLowerCase()) >
        -1
    );
  };
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
    id: '',
    judge_name: '',
    hearing_location: '',
    refugee_origin: '',
    protected_ground: '',
    social_group_type: '',
    judge_decision: '',
    applicant_access_to_interpreter: '',
    applicant_language: '',
    determined_applicant_credibility: '',
    is_applicant_indigenous: '',
    one_year_guideline: '',
  });

  const [search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!search);
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
    { id: 'id', label: 'Case ID' },
    { id: 'judge_name', label: 'Judge Name' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'hearing_location', label: 'Venue' },
    { id: 'social_group_type', label: 'PSG' },
    { id: 'judge_decision', label: 'Case Outcome' },
    { id: 'refugee_origin', label: 'Refugee Origin' },
    { id: 'is_applicant_indigenous', label: 'Indigenous Applicant' },
    { id: 'applicant_language', label: 'Applicant Language' },
    { id: 'applicant_access_to_interpreter', label: 'Access to Intepreter' },
    { id: 'one_year_guideline', label: 'One Year Guideline' },
    { id: 'determined_applicant_credibility', label: 'Refugee Credibility' },
  ];
  const drawerContent = () => {
    return (
      <div className={classes.drawer}>
        <h6
          style={{
            fontSize: 'larger',
            fontWeight: 'bold',
            paddingBottom: '1%',
            marginLeft: 10,
          }}
        >
          Advanced search
        </h6>
        <p style={{ paddingBottom: '5%', marginLeft: 10 }}>
          Search by 1 or more data fields. Multiple Search terms will be
          combined with AND logic.
        </p>
        {searchOptions.map(value => {
          return (
            <div className={classes.querydiv}>
              <p style={{ marginLeft: 10 }}>{value.label}</p>
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
                }}
                type="text"
                style={{ marginLeft: 10, marginBottom: 10 }}
              />
            </div>
          );
        })}
        <button
          onClick={() => {
            toggleSearch();
            setSearching(true);
          }}
          style={{
            width: '30%',
            margin: 'auto',
            display: 'block',
            marginBottom: 10,
          }}
        >
          search
        </button>
      </div>
    );
  };

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <Tabs
          setShowCaseTable={setShowCaseTable}
          showCaseTable={showCaseTable}
        />

        {searching && (
          <div className={classes.chips}>
            {searchOptions.map(option => {
              if (queryValues[option.id] !== '') {
                return (
                  <Chip
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
              }
            })}
          </div>
        )}
        <div className={classes.buttons}>
          <button
            onClick={() => {
              toggleSearch();
            }}
            className={classes.filterButton}
          >
            Filter Cases
          </button>
          <SaveButton
            selectedRows={selectedRows}
            bookmarkCases={bookmarkCases}
            text={'Save Cases'}
          />
        </div>
        <Drawer anchor="right" open={search} onClose={toggleSearch}>
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
        onSelectionChange={onCheckboxSelect}
        showCellRightBorder={true}
      />
    </div>
  );
}
