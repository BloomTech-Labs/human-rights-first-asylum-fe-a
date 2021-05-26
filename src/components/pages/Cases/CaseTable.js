import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import Save from '../../../styles/icons/save.svg';
import Icon from '@ant-design/icons';

import { Table, Space, Button, Input, Tabs } from 'antd';
import './CaseTable.less';

export default function CaseTable(props) {
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
    selectedRowID: [],
    current: 'iCase',
  });

  const { caseData, userInfo, savedCases, setSavedCases } = props;

  let casesData = caseData.map(cases => ({
    judge_name:
      cases.last_name +
      ', ' +
      cases.first_name +
      ' ' +
      cases.middle_initial +
      '.',
    one_year:
      cases.filed_in_one_year
        .toString()
        .charAt(0)
        .toUpperCase() + cases.filed_in_one_year.toString().slice(1),
    ...cases,
  }));

  const { TabPane } = Tabs;

  const { searchText, searchedColumn, selectedRowID } = state;

  const onSelectChange = selectedRowID => {
    console.log('selectedRowID changed: ', selectedRowID);
    setState({ selectedRowID });
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          type="text"
          id="searchInput"
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        //setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  function formatDate(text) {
    var year = text.slice(0, 4);
    var month = text.slice(5, 7);
    var day = text.slice(8, 10);
    return month + '/' + day + '/' + year;
  }

  function changeSorter(sorter) {
    console.log(sorter);
  }

  const columns = [
    {
      title: 'Case Details',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Link>
          {' '}
          <FileTextOutlined />{' '}
        </Link>
      ),
    },
    {
      title: 'Case Date',
      dataIndex: 'case_date',
      key: 'case_date',
      sorter: (a, b) => a.case_date.localeCompare(b.case_date),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('case_date'),
      render: text => formatDate(text),
    },
    {
      title: 'Judge Name',
      dataIndex: 'judge_name',
      key: 'judge_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('judge_name'),
      render: text => <Link>{text}</Link>,
    },
    {
      title: 'Origin City',
      dataIndex: 'case_origin_city',
      key: 'case_origin_city',
      sorter: (a, b) => a.case_origin_city.localeCompare(b.case_origin_city),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('case_origin_city'),
    },
    {
      title: 'Origin State',
      dataIndex: 'case_origin_state',
      key: 'case_origin_state',
      sorter: (a, b) => a.case_origin_state.localeCompare(b.case_origin_state),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('case_origin_state'),
    },
    {
      title: 'File in 1 Year',
      dataIndex: 'one_year',
      key: 'one_year',
      sorter: (a, b) => a.one_year.localeCompare(b.one_year),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('one_year'),
    },
    {
      title: 'Protected Grounds',
      dataIndex: 'protected_grounds',
      key: 'protected_grounds',
      sorter: (a, b) => a.protected_grounds.localeCompare(b.protected_grounds),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('protected_grounds'),
    },
    {
      title: 'Outcome',
      dataIndex: 'case_outcome',
      key: 'case_outcome',
      sorter: (a, b) => a.case_outcome.localeCompare(b.case_outcome),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('case_outcome'),
    },
    {
      title: 'Country of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
      sorter: (a, b) => a.country_of_origin.localeCompare(b.country_of_origin),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('country_of_origin'),
    },
    {
      title: 'Applicant Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Violence Experienced',
      dataIndex: 'type_of_violence',
      key: 'type_of_violence',
      sorter: (a, b) => a.type_of_violence.localeCompare(b.type_of_violence),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('type_of_violence'),
    },
    {
      title: 'Applicant Language',
      dataIndex: 'applicant_language',
      key: 'applicant_language',
      sorter: (a, b) =>
        a.applicant_language.localeCompare(b.applicant_language),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('applicant_language'),
    },
    {
      title: 'Download PDF',
      dataIndex: 'case_url',
      key: 'case_url',
      render: text => (
        <a href={text}>
          {' '}
          <FilePdfOutlined />
        </a>
      ),
    },
  ];
  const findRowByID = (selectedRowID, caseData) => {
    caseData.forEach(row => {
      if (row.case_id === selectedRowID) {
        return row;
      } else {
        return 'Please select row to save.';
      }
    });
  };

  const postBookmark = rowToPost => {
    axiosWithAuth()
      .post(`/profile/${userInfo.sub}/case/${rowToPost}`, rowToPost)
      // .then(res => {
      //   let justAdded = res.data.case_bookmarks.slice(-1); // response comes back as array of all existing bookmarks
      //   let justAddedID = justAdded[0].case_id;
      //   let wholeAddedRow = findRowByID(justAddedID, caseData);
      //   setSavedCases([...savedCases, wholeAddedRow]);

      .then(res => {
        console.log(res.data);
        setSavedCases(res.data.case_bookmarks);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const bookmarkCases = selectedRowID => {
    // loop through currently selected cases and do post requests
    // need to reference rows by id, as that is all that selection stores
    // need to account for duplicates as well
    let bookmarks = [];
    if (selectedRowID.length === 0) {
      alert('Please select cases(s) to be saved');
    } else {
      selectedRowID.forEach(row => bookmarks.push(findRowByID(row, caseData)));
    }

    let savedIds = [];
    if (savedCases) {
      savedCases.forEach(id => savedIds.push(id.case_id));
    }
    bookmarks.forEach(b => {
      if (savedIds.includes(b.case_id)) {
        console.log('Case already saved to bookmarks');
      } else {
        postBookmark(b);
      }
    });
    alert('Cases Successfully Saved');
  };

  const [queryValues, setQueryValues] = useState({
    case_number: '',
    case_date: '',
    judge: '',
    case_origin_city: '',
    case_origin_state: '',
    filed_in_one_year: '',
    application_type: '',
    protected_grounds: '',
    case_outcome: '',
    country_of_origin: '',
    gender: '',
    type_of_violence: '',
    indigenous_group: '',
    applicant_language: '',
    credible: '',
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
        if (
          row[k]
            .toString()
            .toLowerCase()
            .includes(v.toString().toLowerCase())
        ) {
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

  const data = searching ? filter(caseData) : caseData;

  const DecisionRateChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
        terminated += 1;
      }
      return null;
    });

    return (
      <Plot
        data={[
          {
            type: 'bar',
            x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
            y: [granted, denied, remanded, sustained, terminated],
          },
        ]}
        layout={{ width: 500, height: 300, title: 'Decision Rate' }}
      />
    );
  };

  const CaseDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
        terminated += 1;
      }
      return null;
    });

    return (
      <Plot
        data={[
          {
            type: 'bar',
            x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
            y: [granted, denied, remanded, sustained, terminated],
          },
        ]}
        layout={{ width: 500, height: 300, title: 'Case Data' }}
      />
    );
  };

  const rowSelection = {
    selectedRowID,
    onChange: onSelectChange,
  };

  const nonAppCases = casesData.filter(item => item.appellate === false);
  const appCases = casesData.filter(item => item.appellate === true);

  // const handleClick = e => {
  //   console.log('click ', e);
  //   setState({ current: e.key });
  // };

  // const [tabValue, setTabValue] = useState(0);

  // const onChange = (e, newTabValue) => {
  //   setTabValue(newTabValue);
  // };
  // This is part of the Tabs component
  function callback(key) {
    console.log(key);
  }

  const SaveButton = () => {
    return (
      <>
        <Button
          className="save-cases-btn"
          onClick={() => {
            bookmarkCases(rowSelection);
          }}
        >
          <Icon component={() => <img src={Save} alt="save icon" />} />
        </Button>
      </>
    );
  };

  return (
    <div className="cases-container">
      <div className="viz-container">
        <DecisionRateChart />
        <div className="divider"></div>
        <CaseDataChart />
      </div>

      <div className="case-table-container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Initial Cases" key="1">
            <SaveButton />
            <div className="case-table">
              <Table
                className="cases_table iCases"
                rowSelection={rowSelection}
                rowKey={record => record.case_id}
                columns={columns}
                dataSource={nonAppCases}
                onChange={changeSorter}
              />
            </div>
          </TabPane>

          <TabPane tab="Appellate Cases" key="2">
            <SaveButton />
            <div className="case-table">
              <Table
                className="cases_table appCases"
                rowSelection={rowSelection}
                rowKey={record => record.case_id}
                columns={columns}
                dataSource={appCases}
                onChange={changeSorter}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
