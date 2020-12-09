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

export default function CaseTable(props) {
  const { caseData } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const classes = useStyles();

  const handleChange = event => {
    setColumnToSearch(event.target.value);
  };

  return (
    <div className={classes.tbl_container}>
      <InputLabel>Search By ...</InputLabel>
      <Select value={columnToSearch} onChange={handleChange}>
        <MenuItem value="court_type">Court Type</MenuItem>
        <MenuItem value="hearing_type">Hearing Type</MenuItem>
        <MenuItem value="refugee_origin">Refugee Origin</MenuItem>
        <MenuItem value="protected_ground">Protected Ground</MenuItem>
      </Select>
      <DataGrid
        rows={caseData}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={caseData ? false : true}
      />
    </div>
  );
}
