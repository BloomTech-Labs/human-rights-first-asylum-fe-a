import React, { useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';


import { Table, Space, Button, Input, Tabs, notification, Tag } from 'antd';

import './CaseTable.less';
import CaseDetails from '../CaseOverview/CaseDetails';
//* Case column utils import
import { case_columns } from '../../../utils/case_utils/case_columns.js';

//* Utils for filter keywords
import {
  removeSearchTerm,
  processFilters,
  matchMultipleKeyWords,
} from '../../../utils/filter_keyword_utils';

import { formatDate } from '../../../utils/format_date_util.js';

import DecisionRateChart from './DecisionRateChart';

const initialDetails = {
  date: '5/26/2021',
  origin_city: 'Detroit',
};

export default function CaseTable(props) {
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
    selectedRowID: [],
    isDisabled: true,
  });

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [detailsData, setDetailsData] = useState(initialDetails);

  //* state to keep track of filters being applied to the table (Initial cases section)
  const [initialFilters, setInitialFilters] = useState([]);

  const [
    match_tag_value_with_column_key,
    set_match_tag_value_with_column_key,
  ] = useState({
    key: '',
    value: '',
  });

  const [removing, setRemoving] = useState(false);

  const [queryValues] = useState({
    number: '',
    decision_date: '',
    judge: '',
    case_origin_city: '',
    case_origin_state: '',
    check_for_one_year: '',
    application_type: '',
    protected_grounds: '',
    outcome: '',
    country_of_origin: '',
    gender: '',
    type_of_persecution: '',
    indigenous_group: '',
    applicant_language: '',
    credibility: '',
  });

  const popUpDetails = rowData => {
    setDetailsData(rowData);
    setIsDetailsVisible(true);
  };

  const { caseData, userInfo, savedCases, setSavedCases } = props;

  let casesData = caseData.map(cases => ({
    judge_name:
      cases.last_name +
      ', ' +
      cases.first_name +
      ' ' +
      cases.middle_initial +
      '.',

    check_for_one_year:
      cases.check_for_one_year
        .toString()
        .charAt(0)
        .toUpperCase() + cases.check_for_one_year.toString().slice(1),
    case_row: cases,
    ...cases,
  }));

  const { TabPane } = Tabs;

  const { searchText, searchedColumn, selectedRowID, isDisabled } = state;

  const onSelectChange = selectedRowID => {
    setState({ selectedRowID });
    selectedRowID.length > 0
      ? setState({ isDisabled: false })
      : setState({ isDisabled: true });
  };

  //* Removes search tag by taking in a new value of search string
  //* and reassigns that search string to the key at which the searched column matches the key
  const removeSearchTag_helper = async (setKeys, newValue) => {
    await setKeys([newValue]);
    setRemoving(false);
  };
  //* Config Function for ANT Start
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
            className="table-search-button"
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
            Save
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
  //* Config Function for ANT End

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

  const rowSelection = {
    selectedRowID,
    onChange: onSelectChange,
  };

  const findRowByID = (rowID, rowData) => {
    for (let i = 0; i < rowData.length; i++) {
      let currentRow = rowData[i];
      if (rowData[i].case_id === rowID) {
        return currentRow;
      }
    }
    return 'Please select case';
  };

  const postBookmark = case_id => {
    axiosWithAuth()
      .post(`/profile/${userInfo.sub}/case/${case_id}`, case_id)
      .then(res => {
        setSavedCases(res.data.case_bookmarks);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const bookmarkCases = selectedRowID => {
    if (selectedRowID.length === 0) {
      notification.open({
        message: 'Saved Status',
        description: 'Please select cases(s) to be saved',
        top: 128,
        duration: 8,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      });
    } else {
      let bookmarks = [];
      selectedRowID.forEach(row => bookmarks.push(findRowByID(row, caseData)));

      let savedIds = [];
      if (savedCases) {
        savedCases.forEach(id => savedIds.push(id.case_id));
      }

      bookmarks.forEach(b => {
        if (savedIds.includes(b.case_id)) {
        } else {
          postBookmark(b.case_id);
        }
      });
      notification.open({
        message: 'Saved Status',
        description: 'Case(s) Successfully Saved',
        top: 128,
        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      });
    }
  };

  const filter = data => {
    const searchedKeys = Object.entries(queryValues).filter(
      ([k, v]) => v !== ''
    );
    const filteredData = data.filter(row => {
      const matchedHits = [];
      searchedKeys.forEach(([k, v]) => {
        if (
          row[k]
            .toString()
            .toLowerCase()
            .includes(v.toString().toLowerCase())
        ) {
          matchedHits.push(k);
        }
      });
      return matchedHits.length === searchedKeys.length;
    });
    return filteredData;
  };

  const nonAppCases = casesData.filter(item => item.appellate === false);

  return (
    <div className="cases-container">
      <h2 className="h1Styles">Cases</h2>

      <CaseDetails
        caseData={detailsData}
        setHasUpdated={props.setHasUpdated}
        setCaseData={setDetailsData}
        setIsDetailsVisible={setIsDetailsVisible}
        isDetailsVisible={isDetailsVisible}
      />
      <div className="viz-container">
        <DecisionRateChart data={caseData} className="casesViz" />
      </div>

      <div className="case-table-container">
        <Tabs defaultActiveKey="1" className="tabs">
          <TabPane tab="Initial Cases" key="1">
            <div>
              Filters:
              {processFilters(initialFilters).map(filter => {
                return filter.value[0].split(', ').map(eachKeyWord => {
                  return (
                    <Tag key={eachKeyWord}>
                      {eachKeyWord}{' '}
                      <span
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
                        X
                      </span>
                    </Tag>
                  );
                });
              })}
            </div>

            <div className="case-table">
              <Table
                className="cases_table iCases"
                rowSelection={rowSelection}
                rowKey={record => record.case_id}
                columns={case_columns(
                  getColumnSearchProps,
                  match_tag_value_with_column_key,
                  Link,
                  popUpDetails,
                  FileTextOutlined,
                  FilePdfOutlined
                )}
                dataSource={nonAppCases}

                //* Table's "onChange" accepts a callback function. Callback function accepts 4 arguments
                //* pagination details, filter object, sorter, and current data respectivly. However,
                //* currently I only need filter object. Therefore, only have first and second parameter written.

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
                  bookmarkCases(selectedRowID);
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
