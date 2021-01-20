import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { WrapText } from '@material-ui/icons';

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
    width: 200,
  },
}));

const columns = [
  {
    field: 'id',
    headerName: 'ID & Downloads',
    width: 200,

    renderCell: params => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          wordWrap: 'break-word',
        }}
      >
        <span>{params.value}</span>
      </div>
    ),
  },

  // {field: 'download', headerName: 'Download', width: 100},
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
  { field: 'judge_decision', headerName: 'Decision', width: 90 },
  { field: 'case_status', headerName: 'Case Status', width: 110 },

  {
    field: 'download',
    headerName: 'Download',
    width: 120,
    renderCell: params => (
      <div>
        <a
          style={{ marginLeft: 20, marginRight: 5 }}
          href={`http://localhost:8080/case/${params.value}/download-pdf`}
        >
          PDF
        </a>
        <a
          style={{ marginLeft: 20, marginRight: 5 }}
          href={`http://localhost:8080/case/${params.value}/download-csv`}
        >
          CSV
        </a>
      </div>
    ),
  },
];

export default function CaseTable(props) {
  const { caseData, userInfo, savedCases, setSavedCases, authState } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState({});

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
        `http://localhost:8080/profile/${userInfo.sub}/case/${rowToPost.id}`,
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
  };

  const onCheckboxSelect = selections => {
    setSelectedRows(selections);
  };

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <div className={classes.colFilter}>
          <InputLabel>Search By ...</InputLabel>
          <Select value={columnToSearch} onChange={handleChange}>
            <MenuItem value="id">Case ID</MenuItem>
            <MenuItem value="court_type">Court Type</MenuItem>
            <MenuItem value="refugee_origin">Refugee Origin</MenuItem>
            <MenuItem value="protected_ground">Protected Ground</MenuItem>
            <MenuItem value="credibility_of_refugee">
              Refugee Credibility
            </MenuItem>
            <MenuItem value="case_status">Case Status</MenuItem>
            <MenuItem value="social_group_type">Social Group</MenuItem>
            <MenuItem value="judge_name">Judge Name</MenuItem>
          </Select>
        </div>
        <TextField
          value={searchQuery}
          placeholder="Enter Query ..."
          onChange={handleSearchChange}
          type="text"
          style={{ width: 950, marginLeft: 20 }}
        />

        <button onClick={() => bookmarkCases(selectedRows.rowIds)}>
          Bookmark Selected Cases
        </button>
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

        // onRowHover={item => console.log(item.row)}
      />
    </div>
  );
}
