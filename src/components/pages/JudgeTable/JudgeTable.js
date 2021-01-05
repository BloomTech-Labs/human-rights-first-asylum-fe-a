import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'antd';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';

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
  //   { field: 'judge_image', headerName: 'Image', width: 100 },
  { field: 'name', headerName: 'Name', width: 115 },
  { field: 'judge_county', headerName: 'County', width: 110 },
  { field: 'date_appointed', headerName: 'Date Appointed', width: 140 },
  { field: 'birth_date', headerName: 'Birth Date', width: 110 },
  { field: 'denial_rate', headerName: '% Case Denied', width: 140 },
  { field: 'approval_rate', headerName: '% Case Approved', width: 140 },
  { field: 'appointed_by', headerName: 'Appointed by', width: 120 },
];

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState({});

  judgeData.forEach((item, idx) => {
    item.id = idx;
  }); // this is very hacky, but the table doesn't take data without ids'

  const classes = useStyles();

  const handleChange = event => {
    setColumnToSearch(event.target.value);
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

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.id == rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const findRowByJudgeName = (judgeName, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.name == judgeName) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const formatJudgeName = name => {
    let arr = name.split(' ');
    let result = arr.join('%20');
    return result;
  };

  const postJudge = rowToPost => {
    axios
      .post(
        `http://localhost:8080/profile/${userInfo.sub}/judge/${formatJudgeName(
          rowToPost.name
        )}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.judge_bookmarks.slice(-1);
        let justAddedName = justAdded[0].judge_name;
        let wholeAddedRow = findRowByJudgeName(justAddedName, judgeData);
        setSavedJudges([...savedJudges, wholeAddedRow]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const bookmarkJudges = targetRows => {
    // loop through currently selected cases and do post requests
    // need to reference rows by id, as that is all that selection stores
    // need to account for duplicates as well
    let bookmarks = [];
    if (targetRows) {
      for (let i = 0; i < targetRows.length; i++) {
        bookmarks.push(findRowByID(targetRows[i], judgeData));
      }
      let savedNames = [];
      for (let i = 0; i < savedJudges.length; i++) {
        savedNames.push(savedJudges[i].name);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedNames.includes(bookmarks[i].name)) {
          console.log('Judge already saved to bookmarks');
          continue;
        } else {
          postJudge(bookmarks[i]);
        }
      }
    }
  };

  const onCheckboxSelect = selections => {
    setSelectedRows(selections);
  };

  const displayTooltip = text => {
    return <Tooltip title={text} />;
  };

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <div className={classes.colFilter}>
          <InputLabel>Search By ...</InputLabel>
          <Select value={columnToSearch} onChange={handleChange}>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="date_appointed">Date Appointed</MenuItem>
            <MenuItem value="birth_date">Birth Date</MenuItem>
            <MenuItem value="denial_rate">Denial Rate</MenuItem>
            <MenuItem value="approval_rate">Approval Rate</MenuItem>
            <MenuItem value="appointed_by">Appointed By</MenuItem>
          </Select>
        </div>
        <TextField
          value={searchQuery}
          placeholder="Enter Query ..."
          onChange={handleSearchChange}
          type="text"
          style={{ width: 950, marginLeft: 20 }}
        />
        <button
          onClick={() => {
            console.log(selectedRows.rowIds);
            bookmarkJudges(selectedRows.rowIds);
          }}
        >
          Bookmark Selected Rows
        </button>
      </div>
      <DataGrid
        rows={columnToSearch ? search(judgeData) : judgeData}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={judgeData ? false : true}
        checkboxSelection={true}
        onSelectionChange={onCheckboxSelect}
      />
    </div>
  );
}
