import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
import pdf from '../PDFViewer/samplePDF.pdf';
import './CaseTable.css';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  colFilter: {
    // flexDirection: 'column',
    marginLeft: '10%',
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

  const searchOptions = [
    { id: 'id', label: 'Case ID' },
    { id: 'judge_name', label: 'Judge Name' },
    { id: 'protected_ground', label: 'Protected Ground' },
    { id: 'hearing_location', label: 'Venue' },
    { id: 'psg', label: 'PSG' },
    { id: 'judge_decision', label: 'Case Outcome' },
    { id: 'refugee_origin', label: 'Refugee Origin' },
  ];
  // State for PDF Modal
  const [showPdf, setShowPdf] = useState(false);
  const columns = [
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
              pdf={pdf}
              onCancel={() => setShowPdf(false)}
              visible={showPdf}
            />
            <Button onClick={() => setShowPdf(!showPdf)}>PDF</Button>
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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [checkedValues, setCheckedValues] = useState([]);
  const [queryValues, setQueryValues] = useState({
    id: '',
    judge_name: '',
    hearing_location: '',
    refugee_origin: '',
    protected_ground: '',
    psg: '',
    judge_decision: '',
  });
  const filter = rows => {
    const returnedRows = [];
    const keysArray = Object.keys(queryValues);
    const filtered = keysArray.filter(key => queryValues[key] !== '');
    if (filtered.length > 0) {
      rows.forEach(element => {
        let counter = 0;
        filtered.forEach(key => {
          const keyValue = element[key];
          if (keyValue.includes(queryValues[key])) {
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
  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <Tabs
          setShowCaseTable={setShowCaseTable}
          showCaseTable={showCaseTable}
        />
        <div className={classes.colFilter}>
          <Autocomplete
            multiple
            id="options-checkboxes"
            options={searchOptions}
            onChange={(event, value) => setCheckedValues(value)}
            disableCloseOnSelect
            getOptionLabel={option => option.label}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                />
                {option.label}
              </React.Fragment>
            )}
            style={{ width: 400 }}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Filter by..."
                placeholder="Filter by..."
              />
            )}
          />
        </div>
        {checkedValues.length > 0 ? (
          <div className={classes.queryFields}>
            <p style={{ marginLeft: 10, marginTop: 10 }}>
              enter query values below:
            </p>
            {checkedValues.map(value => {
              return (
                <TextField
                  placeholder={`${value.label}`}
                  onChange={e => {
                    setQueryValues({
                      ...queryValues,
                      [value.id]: e.target.value,
                    });
                  }}
                  type="text"
                  style={{ padding: '5px', marginLeft: 10, marginTop: 10 }}
                />
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
        <SaveButton
          selectedRows={selectedRows}
          bookmarkCases={bookmarkCases}
          text={'Save Cases'}
        />
      </div>
      <DataGrid
        rows={checkedValues.length > 0 ? filter(caseData) : caseData}
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
