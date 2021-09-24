import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Table, Space, Button, Input, Tabs, notification, Tag } from 'antd';
import './_JudgeTableStyles.less';

// Column utils imports
import { judge_columns } from '../../../utils/judge_utils/judge_columns';

import { formatDate } from '../../../utils/format_date_util.js';

import {
  removeSearchTerm,
  processFilters,
  matchMultipleKeyWords,
} from '../../../utils/filter_keyword_utils.js';
export default function JudgeTable(props) {
  const { judgeData, userInfo, savedJudges, setSavedJudges } = props;
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
    selectedRowID: [],
    isDisabled: true,
  });

  const { searchText, searchedColumn, selectedRowID, isDisabled } = state;
  const [initialFilters, setInitialFilters] = useState([]);
  const [
    match_tag_value_with_column_key,
    set_match_tag_value_with_column_key,
  ] = useState({
    key: '',
    value: '',
  });
  const [removing, setRemoving] = useState(false);

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

  const { TabPane } = Tabs;

  const onSelectChange = selectedRowID => {
    setState({ selectedRowID });
    selectedRowID.length > 0
      ? setState({ isDisabled: false })
      : setState({ isDisabled: true });
  };

  const removeSearchTag_helper = async (setKeys, newValue) => {
    await setKeys([newValue]);
    setRemoving(false);
  };
  //* Config for ANT start
  const getColumnSearchProps = (dataIndex, columnToBeSearched) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          type="text"
          id={`searchInput_${dataIndex}`}
          placeholder={`Search ${dataIndex.replace(/_/g, ' ')}`}
          value={
            match_tag_value_with_column_key.value != selectedKeys[0] &&
            dataIndex == columnToBeSearched
              ? match_tag_value_with_column_key.value
              : selectedKeys[0]
          }
          onChange={e => {
            set_match_tag_value_with_column_key({
              value: e.target.value,
              key: dataIndex,
            });
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        {match_tag_value_with_column_key.value != selectedKeys[0] &&
        removing &&
        dataIndex == columnToBeSearched
          ? removeSearchTag_helper(
              setSelectedKeys,
              match_tag_value_with_column_key.value
            )
          : ''}
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            id={`search_${dataIndex}`}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            id={`reset_${dataIndex}`}
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
        ? matchMultipleKeyWords(
            dataIndex == 'decision_date'
              ? formatDate(record[dataIndex])
              : record[dataIndex],
            value
          )
        : '',

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
  //* Config for ANT End
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

  function changeSorter(pagination, filters, sorter, extra) {
    setInitialFilters(initialFilters);
  }

  const rowSelection = {
    selectedRowID,
    onChange: onSelectChange,
  };

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];

      if (currentRow.judge_id === rowID) {
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
      notification.open({
        message: 'Saved Status',
        description: 'Please select judge(s) to be saved',
        top: 128,
        duration: 8,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      });
    } else {
      for (let i = 0; i < targetRows.length; i++) {
        bookmarks.push(findRowByID(targetRows[i], judgeData));
      }

      let savedIDs = [];
      for (let i = 0; i < savedJudges.length; i++) {
        savedIDs.push(savedJudges[i].judge_id);
      }

      for (let i = 0; i < bookmarks.length; i++) {
        if (savedIDs.includes(bookmarks[i].judge_id)) {
          console.log('Judge already saved to bookmarks');
          continue;
        } else {
          postJudge(bookmarks[i]);
        }
      }
      notification.open({
        message: 'Saved Status',
        description: 'Judge(s) Successfully Saved',
        top: 128,
        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      });
    }
  };

  return (
    <div className="judge-container">
      <h2 className="h1Styles">Judges</h2>
      <div className="judge-table-divider" />
      <div className="judge-table-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Judges" key="1">
            <div className="filterGallery">
              Filters:
              {processFilters(initialFilters).map(filter => {
                return filter.value[0].split(', ').map(eachKeyWord => {
                  return (
                    <Tag key={eachKeyWord}>
                      {eachKeyWord}{' '}
                      <span
                        className="remove-filter-button"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          removeSearchTerm(
                            initialFilters,
                            filter.key,
                            eachKeyWord,
                            setRemoving,
                            setInitialFilters,
                            set_match_tag_value_with_column_key
                          )
                        }
                      >
                        <CloseOutlined
                          style={{
                            marginLeft: '0.5rem',
                          }}
                        />
                      </span>
                    </Tag>
                  );
                });
              })}
            </div>

            <div className="judge-table">
              <Table
                className="judges_table"
                rowSelection={rowSelection}
                rowKey={record => record.judge_id}
                columns={judge_columns(
                  Link,
                  getColumnSearchProps,
                  match_tag_value_with_column_key
                )}
                dataSource={judgesData}
                onChange={(pag, filt) => {
                  setInitialFilters(filt);
                }}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <Button
                className="save-cases-btn"
                disabled={isDisabled}
                onClick={() => {
                  bookmarkJudges(selectedRowID);
                }}
              >
                Save
              </Button>
            }
            disabled
            key="3"
          />
        </Tabs>
      </div>
    </div>
  );
}
