import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

function SavedCases({ savedCases, deleteBookmark }) {
  const useStyles = makeStyles(theme => ({
    grid: {
      marginTop: 200,
    },
    tbl_container: {
      display: 'flex',
      flexDirection: 'column',
      width: '57%',
      margin: 'auto',
      marginTop: 100,
      flexGrow: 1,
    },
    select: {
      margin: 70,
      height: 20,
    },
    colFilter: {
      display: 'flex',
      flexDirection: 'column',
      width: 500,
    },
  }));
  const columns = [
    {
      field: 'id',
      headerName: 'ID & Downloads',
      width: 200,
      renderCell: params => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton>
            <DeleteIcon onClick={() => deleteBookmark(params.value)} />
          </IconButton>
          <span>{params.value}</span>
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
    { field: 'court_type', headerName: 'Court Type', width: 105 },
    { field: 'refugee_origin', headerName: 'Refugee Origin', width: 130 },
    { field: 'protected_ground', headerName: 'Protected Ground', width: 150 },
    { field: 'social_group_type', headerName: 'Social Group', width: 130 },
    { field: 'judge_name', headerName: 'Judge Name', width: 120 },
    { field: 'judge_decision', headerName: 'Decision', width: 90 },
    { field: 'case_status', headerName: 'Case Status', width: 110 },
  ];
  const classes = useStyles();
  return (
    <>
      {savedCases.length === 0 ? (
        <div style={divStyles}>
          <h1 style={h1Styles}>No Saved Cases</h1>
          <br />
          <Link to="/" style={{ color: '#3f51b5' }}>
            Go Back Home
          </Link>
        </div>
      ) : (
        <DataGrid
          rows={savedCases}
          columns={columns}
          className={classes.grid}
          autoHeight={true}
          // showCellRightBorder={true}
        />
      )}
    </>
  );
}

export default SavedCases;

const divStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
};
const h1Styles = {
  fontSize: '1.3rem',
};
