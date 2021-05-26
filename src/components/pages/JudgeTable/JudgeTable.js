import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Space, Button, Input, Tabs } from 'antd';
import './_JudgeTableStyles.less';

import Save from '../../../styles/icons/save.svg';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges, authState } = props;
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
    selectedRowID: [],
    selectionModel: [],
  });

  const { TabPane } = Tabs;
  const { searchText, searchedColumn, selectedRowID, selectionModel } = state;

  let judgesData = judgeData.map(judges => ({
    judge_name:
      judges.last_name +
      ', ' +
      judges.first_name +
      ' ' +
      judges.middle_initial +
      '.',
    ...judges,
  }));

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
          placeholder={`Search ${dataIndex.replace(/_/g, ' ')}`}
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

  function changeSorter(sorter) {
    console.log(sorter);
  }

  const rowSelection = {
    selectedRowID,
    onChange: onSelectChange,
  };

  function formatDate(text) {
    var year = text.slice(0, 4);
    var month = text.slice(5, 7);
    var day = text.slice(8, 10);
    return month + '/' + day + '/' + year;
  }

  const columns = [
    {
      title: 'Judge Name',
      dataIndex: 'judge_name',
      key: 'judge_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('judge_name'),
      render: (text, record) => (
        <Link to={`/judge/${record.judge_id}`}>{text}</Link>
      ),
    },
    // Link to individual judge page
    //   renderCell: params => (
    //     <>
    //       <Link to={`/judge/${params.row.judge_id}`} className="judgeTableLink">
    //         <span>{params.value}</span>
    //       </Link>
    //     </>
    //   ),
    // },
    {
      title: 'Judge County',
      dataIndex: 'judge_county',
      key: 'judge_county',
      sorter: (a, b) => a.judge_county.localeCompare(b.judge_county),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('judge_county'),
    },
    {
      title: 'Date Appointed',
      dataIndex: 'date_appointed',
      key: 'date_appointed',
      sorter: (a, b) => a.date_appointed.localeCompare(b.date_appointed),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('date_appointed'),
      render: text => formatDate(text),
    },
    {
      title: 'Appointed By',
      dataIndex: 'appointed_by',
      key: 'appointed_by',
      sorter: (a, b) => a.appointed_by.localeCompare(b.appointed_by),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('appointed_by'),
    },
    {
      title: 'Denial Rate',
      dataIndex: 'denial_rate',
      key: 'denial_rate',
      sorter: (a, b) => a.denial_rate.localeCompare(b.denial_rate),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('denial_rate'),
    },
    {
      title: 'Approval Rate',
      dataIndex: 'approval_rate',
      key: 'approval_rate',
      sorter: (a, b) => a.approval_rate.localeCompare(b.approval_rate),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('approval_rate'),
    },
  ];

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
    axiosWithAuth()
      .post(`/profiles/${userInfo.sub}/judge/${rowToPost.judge_id}`, rowToPost)

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
        savedNames.push(savedJudges[i].first_name);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedNames.includes(bookmarks[i].first_name)) {
          console.log('Judge already saved to bookmarks');
          continue;
        } else {
          postJudge(bookmarks[i]);
        }
      }
      alert('Judge(s) Successfully Saved');
    }
  };

  return (
    <div className="judge-container">
      <h2 className="h1Styles">Judges</h2>
      <p className="divider">
        <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
      </p>
      <div className="judge-table-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Judges" key="1">
            <Button
              className="save-judge-btn"
              onClick={() => {
                bookmarkJudges(selectedRowID);
              }}
            >
              <Icon component={() => <img src={Save} alt="save icon" />} />
            </Button>

            <div className="judge-table">
              <Table
                className="judges_table"
                rowSelection={rowSelection}
                rowKey={record => record.judge_id}
                columns={columns}
                dataSource={judgesData}
                onChange={changeSorter}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
