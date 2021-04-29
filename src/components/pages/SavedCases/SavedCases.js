import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

import { Button, Input, Drawer, Typography } from 'antd';
import './SavedCases.css';

import FeatherIcon from 'feather-icons-react';

function SavedCases({ savedCases, deleteBookmark }) {
  const columns = [
    {
      field: 'case_number',
      renderHeader: params => <strong>{'Case Number'}</strong>,
      headerName: 'Case Number',
      width: 120,
      options: {
        filter: true,
      },
      //link to individual case page
      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} className="savedCasesLink">
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    {
      field: 'country_of_origin',
      renderHeader: params => <strong>{'Country Of Origin'}</strong>,
      headerName: 'Country of Origin',
      width: 175,
    },
    {
      field: 'protected_grounds',
      renderHeader: params => <strong>{'Protected Grounds'}</strong>,
      headerName: 'Protected Grounds',
      width: 180,
    },
    {
      field: 'application_type',
      renderHeader: params => <strong>{'Application Type'}</strong>,
      headerName: 'Application Type',
      width: 180,
    },
    {
      field: 'judge',
      renderHeader: params => <strong>{'Judge'}</strong>,
      headerName: 'Judge',
      width: 120,
    },
    {
      field: 'case_outcome',
      renderHeader: params => <strong>{'Decision'}</strong>,
      headerName: 'Decision',
      width: 130,
    },

    // this field (if wanted on this page) should turn into buttons that is implemented in the Toolbar
    // that will match the other pages
    // meaning: a download pdf button, and a export(CSV) button if that is still wanted on this page

    // {
    //   field: 'download',
    //   renderHeader: params => <strong>{'Download'}</strong>,
    //   headerName: 'Download',
    //   width: 120,
    //   renderCell: params => (
    //     <div>
    //       <a
    //         style={{ color: '#215589' }}
    //         href={`${process.env.REACT_APP_API_URI}/case/${params.value}/download-pdf`}
    //       >
    //         PDF
    //       </a>
    //       <a
    //         style={{ marginLeft: 20, color: '#215589' }}
    //         href={`${process.env.REACT_APP_API_URI}/case/${params.value}/download-csv`}
    //       >
    //         CSV
    //       </a>
    //     </div>
    //   ),
    // },

    // this field "remove_case" does not exist in the migration data
    // it is an idea to delete a saved case from this table using "deleteBookmark()"
    {
      field: 'remove_case',
      renderHeader: params => <strong>{'Remove Case'}</strong>,
      headerName: 'Remove',
      width: 110,
      renderCell: params => (
        <Button>
          <FeatherIcon
            icon="delete"
            onClick={() => {
              deleteBookmark(params.row.id); //maybe?
            }}
          />
        </Button>
      ),
    },
  ];

  const Toolbar = () => {
    const { Title } = Typography;
    return (
      <div className="savedCasesMenuContainer">
        <Title level={2}>Saved Cases</Title>
        <div className="savedCasesMenubuttonContainer">
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
    case_number: '',
    country_of_origin: '',
    protected_grounds: '',
    application_type: '',
    judge: '',
    case_outcome: '',
    remove_case: '',
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
    { id: 'case_number', label: 'Case Number' },
    { id: 'country_of_origin', label: 'Country of Origin' },
    { id: 'protected_grounds', label: 'Protected Grounds' },
    { id: 'application_type', label: 'Application Type' },
    { id: 'judge', label: 'Judge' },
    { id: 'case_outcome', label: 'Decision' },
    { id: 'remove_case', label: 'Remove Case' },
  ];

  const drawerContent = () => {
    return (
      <div className="savedCasesDrawer">
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
                className="savedCasesSearchInput"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="savedCasesContainer">
      {savedCases.length === 0 ? (
        <div className="savedCasesCard">
          <h1>No Saved Cases</h1>
          <br />
          <Link to="/" className="savedCasesLink">
            Return back to Home
          </Link>
        </div>
      ) : (
        // This is so the top part only displays when there are no cases, but also displays the empty table below
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
      <div className="savedCasesGridContainer">
        <DataGrid
          rows={searching ? filter(savedCases) : savedCases}
          columns={columns}
          className="savedCasesTable"
          autoHeight={true}
          loading={savedCases ? false : true}
          showCellRightBorder={true}
          components={{ Toolbar: Toolbar }}
        />
      </div>
    </div>
  );
}

export default SavedCases;
