import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import PDFViewer from '../PDFViewer/PDFViewer';
import { Button } from 'antd';
import pdf from '../PDFViewer/samplePDF.pdf';

function SavedJudges({ savedJudges, deleteSavedJudge }) {
  const [showPdf, setShowPdf] = useState(false);
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
  const divStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    width: '100%',
    flexDirection: 'column',
  };
  const h1Styles = {
    fontSize: '1.3rem',
  };

  const columns = [
    // { field: 'id', headerName: 'id', width: 100 },
    {
      field: 'name',
      headerName: 'Judge Name',
      width: 170,
      color: 'navy',
      //Link to individual judge page
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
    { field: 'judge_county', headerName: 'Court Location', width: 160 },
    { field: 'date_appointed', headerName: 'Date Appointed', width: 140 },
    { field: 'appointed_by', headerName: 'Appointed by', width: 160 },
    { field: 'denial_rate', headerName: '% Denial', width: 110 },
    { field: 'approval_rate', headerName: '% Approval', width: 110 },
    {
      field: 'remove_case',
      headerName: 'Remove',
      width: 110,
      renderCell: params => (
        <IconButton>
          <DeleteIcon onClick={() => deleteSavedJudge(params.value)} />
        </IconButton>
      ),
    },
  ];
  const classes = useStyles();

  savedJudges.forEach((item, idx) => {
    item.id = idx;
  }); // this is VERY hacky, but the table doesn't take data without ids
  console.log(savedJudges);
  return (
    <div className={classes.tbl_container}>
      {savedJudges.length === 0 ? (
        <div style={divStyles}>
          <h1 style={h1Styles}>No Saved Judges</h1>
          <br />
          <Link to="/" style={{ color: '#3f51b5' }}>
            Return back to Home
          </Link>
        </div>
      ) : (
        <></>
      )}
      <DataGrid
        rows={savedJudges}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={savedJudges ? false : true}
        showCellRightBorder={true}
      />
    </div>
  );
}

export default SavedJudges;
