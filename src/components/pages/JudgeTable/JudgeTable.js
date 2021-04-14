import React, { useState } from 'react';
import {
  DataGrid,
  GridColumnsToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from '@material-ui/data-grid';
import { Drawer } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SearchOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

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
  drawer: {
    width: 300,
    marginTop: '30%',
  },
  chips: {
    display: 'flex',
  },
  toolbar_options: {
    borderRadius: '6px',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '6px',
    width: '100%',
    color: 'darkblue',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [selectedRows, setSelectedRows] = useState({});

  const columns = [
    {
      field: 'name',
      renderHeader: params => <strong>{'Judge'}</strong>,
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
    {
      field: 'judge_county',
      renderHeader: params => <strong>{'Case Origin'}</strong>,
      width: 160,
    },
    {
      field: 'date_appointed',
      renderHeader: params => <strong>{'Date Appointed'}</strong>,
      width: 160,
    },
    {
      field: 'appointed_by',
      renderHeader: params => <strong>{'Appointed By'}</strong>,
      width: 160,
    },
    {
      field: 'denial_rate',
      renderHeader: params => <strong>{'% Denial'}</strong>,
      width: 110,
    },
    {
      field: 'approval_rate',
      renderHeader: params => <strong>{'% Approval'}</strong>,
      width: 130,
    },
  ];

  judgeData.forEach((item, idx) => {
    item.id = idx; //no?
  }); // this is VERY hacky, but the table doesn't take data without ids

  const classes = useStyles();

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
      <Menu>
        <div className={classes.toolbar}>
          <div
            className={classes.toolbar_options}
            onClick={() => {
              toggleSearch();
            }}
          >
            <Button
              style={{ background: '#3f51b5', color: '#fff' }}
              type="default"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
          <div
            className={classes.toolbar_options}
            onClick={() => {
              bookmarkJudges(selectedRows);
            }}
          >
            <Button
              style={{ background: '#3f51b5', color: '#fff' }}
              type="default"
              icon={<SaveOutlined />}
            >
              Save Judges
            </Button>
          </div>
          <div>
            <GridColumnsToolbarButton />
            <GridDensitySelector />
            <GridToolbarExport />
          </div>
        </div>
      </Menu>
    );
  };

  const [queryValues, setQueryValues] = useState({
    name: '',
    judge_county: '',
    date_appointed: '',
    appointed_by: '',
    denial_rate: '',
    approval_rate: '',
  });

  const [new_search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!new_search);
  };
  const [searching, setSearching] = useState(false);

  const filter = data => {
    // searchedKeys is AT MOST 16 keys
    const searchedKeys = Object.entries(queryValues).filter(
      ([k, v]) => v !== ''
    );
    // for each ROW in DATA -- O(n) where n is the number of rows in our data
    const filteredData = data.filter(row => {
      const matchedHits = [];
      // map through each searched [K, V] pair -- O(searched_keys) where searchedKeys is at min 0 and at most 16
      // so nesting this inside is NOT all too expensive.
      searchedKeys.forEach(([k, v]) => {
        // if the stringified value at row[key] includes the searched-for value,
        // then we'll push the key to our matchedHits
        if (row[k].toString().includes(v.toString())) {
          matchedHits.push(k);
        }
      });
      // if the row[k] == v at EVERY searched-for key, then we'll return TRUE
      // else return FALSE
      return matchedHits.length === searchedKeys.length;
    });
    // filteredData is only going to contain rows where  every
    // searched column includes subtext that matches the searched term
    return filteredData;
  };

  const searchOptions = [
    { id: 'name', label: 'Judge' },
    { id: 'judge_county', label: 'Case Origin' },
    { id: 'date_appointed', label: 'Date Appointed' },
    { id: 'appointed_by', label: 'Appointed by' },
    { id: 'denial_rate', label: '% Denial' },
    { id: 'approval_rate', label: '% Approval' },
  ];
  const drawerContent = () => {
    return (
      <div className={classes.drawer}>
        {searchOptions.map(value => {
          return (
            <div key={value.id}>
              <p style={{ marginLeft: '15%' }}>{value.label}</p>
              <TextField
                placeholder={'search query'}
                variant="outlined"
                size="small"
                value={queryValues[value.id]}
                onChange={e => {
                  setQueryValues({
                    ...queryValues,
                    [value.id]: e.target.value,
                  });
                  setSearching(true);
                }}
                type="text"
                style={{ marginLeft: '15%', marginBottom: 10 }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.tbl_container}>
      <div className={classes.search_container}>
        {searching && (
          <div className={classes.chips}>
            {searchOptions.map(option => {
              if (queryValues[option.id] !== '') {
                return (
                  <Chip
                    key={option.id}
                    label={`${option.label}: "${queryValues[option.id]}"`}
                    onDelete={() => {
                      setQueryValues({
                        ...queryValues,
                        [option.id]: '',
                      });
                    }}
                    style={{ marginRight: 5 }}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
        <Drawer
          anchor="right"
          open={new_search}
          onClose={toggleSearch}
          variant="persistent"
        >
          {drawerContent()}
        </Drawer>
      </div>
      <DataGrid
        rows={searching ? filter(judgeData) : judgeData}
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
