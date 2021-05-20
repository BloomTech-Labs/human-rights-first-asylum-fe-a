import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

import { Button, Input, Card, Drawer, Typography } from 'antd';
import './JudgeTable.css';

import FeatherIcon from 'feather-icons-react';

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = [
    {
      field: 'first_name',
      renderHeader: params => <strong>{'Judge'}</strong>,
      width: 170,
      headerName: 'Name',
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
    item.id = idx;
  }); // this is VERY hacky, but the table doesn't take data without ids

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      let adjustedRowID = parseInt(rowID) + 1;
      if (currentRow.judge_id === adjustedRowID) {
        return currentRow;
      }
    }
    return 'This judge could not be identified';
  };

  const postJudge = rowToPost => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/profiles/${userInfo.sub}/judge/${rowToPost.judge_id}`,
        rowToPost,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        }
      )

      .then(res => {
        setSavedJudges(res.data.judge_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const bookmarkJudges = targetRows => {
    let bookmarks = [];
    if (targetRows.length === 0) {
      alert('Please select judge(s) to be saved');
    } else {
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
      alert('Judge(s) Successfully Saved');
    }
  };

  const Toolbar = () => {
    const { Title } = Typography;
    return (
      <div className="menuContainer">
        <Title level={2}>Judges</Title>
        <div className="buttonContainer">
          <Button
            onClick={() => {
              toggleSearch();
            }}
          >
            <FeatherIcon icon="search" />
          </Button>
          <Button
            onClick={() => {
              bookmarkJudges(selectionModel);
            }}
          >
            <FeatherIcon icon="bookmark" />
          </Button>
        </div>
      </div>
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
        visible={new_search}
        onClose={toggleSearch}
        width={'25%'}
        style={{ marginTop: '4rem' }}
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
          onSelectionModelChange={newSelection => {
            setSelectionModel(newSelection.selectionModel);
          }}
          selectionModel={selectionModel}
          showCellRightBorder={false}
          showColumnRightBorder={false}
          components={{ Toolbar: Toolbar }}
        />
      </div>
    </div>
  );
}
