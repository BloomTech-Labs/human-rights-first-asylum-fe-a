import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 100,
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
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'court_type', headerName: 'Court Type', width: 115 },
  { field: 'hearing_type', headerName: 'Hearing Type', width: 120 },
  { field: 'refugee_origin', headerName: 'Refugee Origin', width: 120 },
  { field: 'protected_ground', headerName: 'Protected Ground', width: 120 },
  { field: 'hearing_location', headerName: 'Location', width: 120 },
  { field: 'hearing_date', headerName: 'Hearing Date', width: 120 },
  { field: 'decision_date', headerName: 'Decision Date', width: 120 },
  {
    field: 'credibility_of_refugee',
    headerName: 'Refugee Credibility',
    width: 120,
  },
  { field: 'social_group_type', headerName: 'Social Group Type', width: 120 },
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
  const { caseData } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const classes = useStyles();

  const handleChange = event => {
    setColumnToSearch(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const search = rows => {
    return rows.filter(
      row => row[columnToSearch].toLowerCase().indexOf(searchQuery) > -1
    );
  };

  return (
    <div className={classes.tbl_container}>
      <InputLabel>Search By ...</InputLabel>
      <Select value={columnToSearch} onChange={handleChange}>
        <MenuItem value="court_type">Court Type</MenuItem>
        <MenuItem value="hearing_type">Hearing Type</MenuItem>
        <MenuItem value="refugee_origin">Refugee Origin</MenuItem>
        <MenuItem value="protected_ground">Protected Ground</MenuItem>
        <MenuItem value="judge_name">Judge Name</MenuItem>
      </Select>
      <TextField
        value={searchQuery}
        placeholder="Enter Query ..."
        onChange={handleSearchChange}
        type="text"
      />

      <DataGrid
        rows={columnToSearch ? search(sampleRows) : sampleRows}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={caseData ? false : true}
        sortModel
      />
    </div>
  );
}
