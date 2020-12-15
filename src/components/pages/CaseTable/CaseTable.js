import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 15,
  },
  tbl_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
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
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'court_type', headerName: 'Court Type', width: 115 },
  { field: 'hearing_type', headerName: 'Hearing Type', width: 120 },
  { field: 'refugee_origin', headerName: 'Refugee Origin', width: 150 },
  { field: 'protected_ground', headerName: 'Protected Ground', width: 150 },
  { field: 'hearing_location', headerName: 'Location', width: 120 },
  { field: 'hearing_date', headerName: 'Hearing Date', width: 120 },
  { field: 'decision_date', headerName: 'Decision Date', width: 150 },
  {
    field: 'credibility_of_refugee',
    headerName: 'Refugee Credibility',
    width: 160,
  },
  { field: 'social_group_type', headerName: 'Social Group', width: 150 },
  { field: 'judge_name', headerName: 'Judge Name', width: 120 },
  { field: 'judge_decision', headerName: 'Decision', width: 120 },
  { field: 'case_status', headerName: 'Case Status', width: 120 },
];

const sampleRows = [
  {
    id: 'test01',
    court_type: 'Supreme Court',
    hearing_type: 'Primary',
    refugee_origin: 'Honduras',
    hearing_location: 'Miami',
    protected_ground: 'Political',
    hearing_date: '01-11-16',
    decision_date: '02-12-16',
    credibility_of_refugee: 'Questionable',
    case_status: 'Closed',
    social_group_type: 'Male',
    judge_decision: 'Yes',
    judge_name: 'Elaine Gonzalez',
  },
  {
    id: 'test02',
    court_type: 'Lower',
    hearing_type: 'Primary',
    refugee_origin: 'El Salvador',
    hearing_location: 'Miami',
    protected_ground: 'Political',
    hearing_date: '01-11-16',
    decision_date: '02-12-16',
    credibility_of_refugee: 'Questionable',
    case_status: 'Closed',
    social_group_type: 'Male',
    judge_decision: 'Yes',
    judge_name: 'Elaine Gonzalez',
  },
  {
    id: 'test03',
    court_type: 'Supreme ',
    hearing_type: 'Secondary',
    refugee_origin: 'Honduras',
    hearing_location: 'Atlanta',
    protected_ground: 'War',
    hearing_date: '04-23-18',
    decision_date: 'NA',
    credibility_of_refugee: 'High',
    case_status: 'Open',
    social_group_type: 'Female',
    judge_decision: 'NA',
    judge_name: 'John Watson',
  },
];

export default function CaseTable(props) {
  const { caseData, setSavedCases, savedCases } = props;
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

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.id === rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist';
  };

  const bookmarkCases = targetRows => {
    // loop through currently selected cases and do post requests
    // need to reference rows by id, as that is all that selection stores
    // need to account for duplicates as well
    if (targetRows) {
      for (let i = 0; i < targetRows.length; i++) {
        console.log(findRowByID(targetRows[i], caseData));
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
            <MenuItem value="court_type">Court Type</MenuItem>
            <MenuItem value="hearing_type">Hearing Type</MenuItem>
            <MenuItem value="refugee_origin">Refugee Origin</MenuItem>
            <MenuItem value="hearing_location">Hearing Location</MenuItem>
            <MenuItem value="protected_ground">Protected Ground</MenuItem>
            <MenuItem value="hearing_date">Hearing Date</MenuItem>
            <MenuItem value="decision_date">Decision Date</MenuItem>
            <MenuItem value="credibility_of_refugee">
              Refugee Credibility
            </MenuItem>
            <MenuItem value="case_status">Case Status</MenuItem>
            <MenuItem value="social_group_type">Social Group</MenuItem>
            <MenuItem value="judge_name">Judge Name</MenuItem>
            <MenuItem value="hearing_date">Hearing Date</MenuItem>
          </Select>
        </div>
        <TextField
          value={searchQuery}
          placeholder="Enter Query ..."
          onChange={handleSearchChange}
          type="text"
          style={{ width: 950, marginLeft: 20 }}
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
      />
      <button onClick={() => bookmarkCases(selectedRows.rowIds)}>
        Bookmark Selected Rows
      </button>
    </div>
  );
}
