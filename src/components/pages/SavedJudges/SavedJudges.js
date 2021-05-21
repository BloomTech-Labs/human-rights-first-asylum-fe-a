import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

import { Button, Input, Drawer, Typography } from 'antd';
import './SavedJudges.css';

import FeatherIcon from 'feather-icons-react';

function SavedJudges({ savedJudges, deleteSavedJudge }) {
  const columns = [
    {
      field: 'first_name',
      renderHeader: params => <strong>{'Judge'}</strong>,
      headerName: 'Judge',
      width: 130,
      options: {
        filter: true,
      },
      renderCell: params => (
        <>
          {/* <Link
            to={`/judge/${params.value.split(' ').join('%20')}`}
            className="savedJudgeLink"
          > */}
          <span>{params.value}</span>
          {/* </Link> */}
        </>
        // ^^produces error after judge is deleted - bug
      ),
    },
    {
      field: 'judge_county',
      renderHeader: params => <strong>{'Court Location'}</strong>,
      headerName: 'Court Location',
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
      headerName: '% Denial',
      width: 110,
    },
    {
      field: 'approval_rate',
      renderHeader: params => <strong>{'% Approval'}</strong>,
      headerName: '% Approval',
      width: 140,
    },
    // this field "remove_judge" does not exist in the migration data
    {
      field: 'remove_judge',
      renderHeader: params => <strong>{'Remove'}</strong>,
      headerName: 'Remove',
      width: 110,
      renderCell: params => (
        <Button>
          <FeatherIcon
            icon="delete"
            onClick={() => {
              deleteSavedJudge(params.row.judge_id);
            }}
          />
        </Button>
      ),
    },
  ];

  savedJudges.forEach((item, idx) => {
    item.id = idx;
  });

  const Toolbar = () => {
    const { Title } = Typography;
    return (
      <div className="savedJudgeMenuContainer">
        <Title level={2}>Saved Judges</Title>
        <div className="savedJudgeMenubuttonContainer">
          <Button
            onClick={() => {
              toggleSearch();
            }}
          >
            <FeatherIcon icon="search" />
          </Button>
        </div>
      </div>
    );
  };

  const [queryValues, setQueryValues] = useState({
    first_name: '',
    judge_county: '',
    date_appointed: '',
    appointed_by: '',
    denial_rate: '',
    approval_rate: '',
    remove_judge: '',
  });

  const [new_search, setSearch] = useState(false);
  const toggleSearch = () => {
    setSearch(!new_search);
  };
  const [searching, setSearching] = useState(false);

  const filter = data => {
    const searchedKeys = Object.entries(queryValues).filter(
      ([k, v]) => v !== ''
    );
    const filteredData = data.filter(row => {
      const matchedHits = [];
      searchedKeys.forEach(([k, v]) => {
        if (row[k].toString().includes(v.toString())) {
          matchedHits.push(k);
        }
      });
      return matchedHits.length === searchedKeys.length;
    });
    return filteredData;
  };

  const searchOptions = [
    { id: 'first_name', label: 'Judge' },
    { id: 'judge_county', label: 'Court Location' },
    { id: 'date_appointed', label: 'Date Appointed' },
    { id: 'appointed_by', label: 'Appointed By' },
    { id: 'denial_rate', label: '% Denial' },
    { id: 'approval_rate', label: '% Approval' },
    { id: 'remove_judge', label: 'Remove' },
  ];

  const drawerContent = () => {
    return (
      <div className="savedJudgeDrawer">
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
                className="savedJudgeSearchInput"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="savedJudgeContainer">
      {savedJudges.length == 0 ? (
        <div className="savedJudgeCard">
          <h1>No Saved Judges</h1>
          <br />
          <Link to="/" className="savedJudgeLink">
            Return back to Home
          </Link>
        </div>
      ) : (
        <></>
      )}
      <Drawer
        visible={new_search}
        onClose={toggleSearch}
        width={'25%'}
        style={{ marginTop: '4rem' }}
      >
        {drawerContent()}
      </Drawer>
      <div className="savedJudgeGridContainer">
        <DataGrid
          rows={searching ? filter(savedJudges) : savedJudges}
          columns={columns}
          className="savedJudgeTable"
          autoHeight={true}
          loading={savedJudges ? false : true}
          showCellRightBorder={true}
          components={{ Toolbar: Toolbar }}
        />
      </div>
    </div>
  );
}

export default SavedJudges;
