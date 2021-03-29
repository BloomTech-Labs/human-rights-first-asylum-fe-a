import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from '@material-ui/data-grid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
    color: 'darkblue',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [columnToSearch, setColumnToSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState({});

  const columns = [
    {
      field: 'name',
      headerName: 'Judge',
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
    { field: 'judge_county', headerName: 'Case Origin', width: 160 },
    { field: 'date_appointed', headerName: 'Date Appointed', width: 140 },
    { field: 'appointed_by', headerName: 'Appointed by', width: 160 },
    { field: 'denial_rate', headerName: '% Denial', width: 110 },
    { field: 'approval_rate', headerName: '% Approval', width: 110 },
  ];

  judgeData.forEach((item, idx) => {
    item.id = idx; //no?
  }); // this is VERY hacky, but the table doesn't take data without ids

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
      // eslint-disable-next-line
      if (currentRow.id == rowID) {
        return currentRow;
      }
    }
    return 'Row does not exist ID';
  };

  const findRowByJudgeName = (judgeName, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.name === judgeName) {
        return currentRow;
      }
    }
    return 'Row does not exist NAME';
  };

  const formatJudgeName = name => {
    // eslint-disable-next-line
    if (name != undefined || name != null) {
      return name.split(' ').join('%20');
    }
  };

  const postJudge = rowToPost => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/profile/${
          userInfo.sub
        }/judge/${formatJudgeName(rowToPost.name)}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.judge_bookmarks.slice(-1);
        let justAddedName = justAdded[0].judge;
        let wholeAddedRow = findRowByJudgeName(justAddedName, judgeData);
        console.log(wholeAddedRow);
        let reformattedJudge = {
          user_id: userInfo.sub,
          judge: wholeAddedRow.name,
        };
        setSavedJudges([...savedJudges, reformattedJudge]);
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
    alert('Judges Successfully Saved');
  };

  const onCheckboxSelect = selections => {
    setSelectedRows(selections);
  };

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <div
          className={classes.toolbar}
          onClick={() => {
            alert('This is not yet functional');
          }}
        >
          <SearchIcon />
          <p>SEARCH</p>
        </div>
        <div
          className={classes.toolbar}
          onClick={() => {
            bookmarkJudges(selectedRows);
          }}
        >
          <BookmarkBorderIcon />
          <p>SAVE JUDGES</p>
        </div>
        <GridColumnsToolbarButton />
        <GridDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        <div className={classes.colFilter}>
          {/* This puts the search by text inside of the search bar, give it all other components the same height */}
          <Select value={columnToSearch} onChange={handleChange} displayEmpty>
            <MenuItem value="" disabled>
              Search By...
            </MenuItem>
            <MenuItem value="name">Judge</MenuItem>
            <MenuItem value="judge_county">Case Origin</MenuItem>
            <MenuItem value="date_appointed">Date Appointed</MenuItem>
            <MenuItem value="appointed_by">Appointed By</MenuItem>
            <MenuItem value="denial_rate">Denial Rate</MenuItem>
            <MenuItem value="approval_rate">Approval Rate</MenuItem>
          </Select>
        </div>
        <TextField
          value={searchQuery}
          placeholder="Enter Query..."
          onChange={handleSearchChange}
          type="text"
          style={{ width: '50%', marginLeft: 40 }}
        />
        {/* <SaveButton
          selectedRows={selectedRows}
          bookmarkCases={bookmarkJudges}
          text={'Save Judges'}
        /> */}
      </div>
      <DataGrid
        rows={columnToSearch ? search(judgeData) : judgeData}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={judgeData ? false : true}
        checkboxSelection={true}
        onSelectionModelChange={onCheckboxSelect}
        showCellRightBorder={true}
        components={{ Toolbar: Toolbar }}
      />
    </div>
  );
}
