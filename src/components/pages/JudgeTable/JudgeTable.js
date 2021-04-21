import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  DataGrid,
  GridColumnsToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from '@material-ui/data-grid';

import { SearchOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Menu, Input, Card, Drawer } from 'antd';
import './JudgeTable.css';

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [selectedRows, setSelectedRows] = useState({});

  const columns = [
    {
      field: 'name',
      renderHeader: params => <strong>{'Judge'}</strong>,
      width: 170,
      headerName: 'Name',
      className: 'tableHeader',
      options: {
        filter: true,
      },
      //Link to individual judge page

      renderCell: params => (
        <>
          <Link
            to={`/judge/${params.value.split(' ').join('%20')}`}
            className="judgeTableLink"
          >
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'judge_county',
      renderHeader: params => <strong>{'Case Origin'}</strong>,
      headerName: 'Case Origin',
      width: 160,
    },
    {
      field: 'date_appointed',
      renderHeader: params => <strong>{'Date Appointed'}</strong>,
      headerName: 'Date Appointed',
      width: 160,
    },
    {
      field: 'appointed_by',
      renderHeader: params => <strong>{'Appointed By'}</strong>,
      headerName: 'Appointed By',
      width: 160,
    },
    {
      field: 'denial_rate',
      renderHeader: params => <strong>{'% Denial'}</strong>,
      headerName: 'Denial Rate',
      width: 110,
    },
    {
      field: 'approval_rate',
      renderHeader: params => <strong>{'% Approval'}</strong>,
      headerName: 'Approval Rate',
      width: 130,
    },
  ];

  judgeData.forEach((item, idx) => {
    item.id = idx; //no?
  }); // this is VERY hacky, but the table doesn't take data without ids

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (currentRow.id === rowID) {
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
    if (name !== undefined || name != null) {
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
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        }
      )
      .then(res => {
        let justAdded = res.data.judge_bookmarks.slice(-1);
        let justAddedName = justAdded[0].name;
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
      <Menu className="judgeTableContainer">
        <div className="judgeTableToolbar">
          <div
            className="judgeTableToolbarOptions"
            onClick={() => {
              toggleSearch();
            }}
          >
            <Button
              className="judgeTableBtn"
              type="default"
              icon={<SearchOutlined />}
            >
              Search
            </Button>

            <div
              className="judgeTableToolbarOptions"
              onClick={() => {
                bookmarkJudges(selectedRows);
              }}
            >
              <Button
                className="judgeTableBtn"
                type="default"
                icon={<SaveOutlined />}
              >
                Save Judges
              </Button>

              <div
                className="judgeTableToolbarOptions"
                style={{
                  WebkitTextFillColor: '#215589',
                  WebkitMarginStart: '1rem',
                }}
              >
                <GridColumnsToolbarButton />
                <GridDensitySelector />
                <GridToolbarExport />
              </div>
            </div>
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
      <div className="judgeTableDrawer">
        {searchOptions.map(value => {
          return (
            <div key={value.id}>
              <p>{value.label}</p>
              <Input
                placeholder={'search query'}
                variant="outlined"
                size="medium"
                value={queryValues[value.id]}
                onChange={e => {
                  setQueryValues({
                    ...queryValues,
                    [value.id]: e.target.value,
                  });
                  setSearching(true);
                }}
                type="text"
                className="judgePageSearchInput"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="judgeTableContainer">
      {searching && (
        <div className="judgeTableCard">
          {searchOptions.map(option => {
            if (queryValues[option.id] !== '') {
              return (
                <Card
                  key={option.id}
                  label={`${option.label}: "${queryValues[option.id]}"`}
                  onDelete={() => {
                    setQueryValues({
                      ...queryValues,
                      [option.id]: '',
                    });
                  }}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
      <Drawer
        className="judgeTableDrawer"
        visible={new_search}
        onClose={toggleSearch}
      >
        {drawerContent()}
      </Drawer>

      <div className="judgeTableGridContainer">
        <DataGrid
          rows={searching ? filter(judgeData) : judgeData}
          columns={columns}
          className="judgeTable"
          autoHeight={true}
          loading={judgeData ? false : true}
          checkboxSelection={true}
          onSelectionModelChange={onCheckboxSelect}
          showCellRightBorder={true}
          components={{ Toolbar: Toolbar }}
        />
      </div>
    </div>
  );
}
