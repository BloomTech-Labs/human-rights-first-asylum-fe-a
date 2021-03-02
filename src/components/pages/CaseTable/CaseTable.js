import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Buttons
import Tabs from '../Home/Tabs';
import SaveButton from './SaveButton';
// Imports for PDF Modal
import PDFViewer from '../PDFViewer/PDFViewer';
import { Button } from 'antd';
import pdf from '../PDFViewer/samplePDF 2.pdf';
import './CaseTable.css';

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

  // State for PDF Modal
  const [showPdf, setShowPdf] = useState(false);
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
      width: 200,
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
      headerName: 'PSG',
      width: 130,
      className: 'tableHeader',
    },

    {
      field: 'judge_decision',
      headerName: 'Case Outcome',
      width: 140,
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
              pdf={`${process.env.REACT_APP_API_URI}/case/${params.row.id}/view-pdf`} // this will be set to viewPdf when endpoint is available
              onCancel={() => setShowPdf(false)}
              visible={showPdf}
            />
            <Button onClick={viewPdf}>PDF</Button>
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

  // function to show pdf data from backend endpoint in pdf viewer
  // depending on what case is selected
  const viewPdf = () => {
    setShowPdf(!showPdf);
    axios
      .get('http://localhost:3000/') // dummy data for now. No endpoints exist
      .then(res => {
        console.log(res);
        if (!res) {
          console.log(
            'This case does not have a pdf. It was uploded using CSV'
          );
        }
      });
  };
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

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <Tabs
          setShowCaseTable={setShowCaseTable}
          showCaseTable={showCaseTable}
        />
        <div className={classes.colFilter}>
          <Select value={columnToSearch} onChange={handleChange} displayEmpty>
            {/* This puts the search by text inside of the search bar, give it all other components the same height */}
            <MenuItem value="" disabled>
              Search By...
            </MenuItem>
            <MenuItem value="hearing_date">Hearing Date</MenuItem>
            <MenuItem value="id">Case ID</MenuItem>
            <MenuItem value="judge_name">Judge Name</MenuItem>
            <MenuItem value="hearing_location">Venue</MenuItem>
            <MenuItem value="refugee_origin">Refugee Origin</MenuItem>
            <MenuItem value="protected_ground">Protected Ground</MenuItem>
            <MenuItem value="social_group_type">PSG</MenuItem>
            <MenuItem value="judge_decision">Case Outcome</MenuItem>
          </Select>
        </div>
        <TextField
          value={searchQuery}
          placeholder="Enter Query..."
          onChange={handleSearchChange}
          type="text"
          style={{ width: '50%', marginLeft: 40 }}
        />
        <SaveButton
          selectedRows={selectedRows}
          bookmarkCases={bookmarkCases}
          text={'Save Cases'}
        />
      </div>
      <DataGrid
        rows={columnToSearch ? search(caseData) : caseData}
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
