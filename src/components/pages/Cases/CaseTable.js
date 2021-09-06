import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import OrangeLine from '../../../styles/orange-line.svg';
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Save from '../../../styles/icons/save.svg';
import Icon from '@ant-design/icons';

import { Table, Space, Button, Input, Tabs, notification, Tag } from 'antd';
import './CaseTable.less';
import CaseDetails from '../CaseOverview/CaseDetails';

// Case column utils import
import { case_columns } from '../../../utils/case_utils/case_columns';

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
  });

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [detailsData, setDetailsData] = useState(initialDetails);

  // state to keep track of filters being applied to the table (Initial cases section)
  const [initialFilters, setInitialFilters] = useState([]);
  // keeping track of filters applied to the appelate section
  const [appFilters, setAppFilters] = useState([]);

  // state to keep track of the current table being displayed
  const [currentKey, setCurrentKey] = useState(1);

  const [tempHook, setTempHook] = useState({
    key: '',
    value: '',
  });

  const [removing, setRemoving] = useState(false);

  const [searching, setSearching] = useState(false);

  const [queryValues] = useState({
    number: '',
    date: '',
    judge: '',
    case_origin_city: '',
    case_origin_state: '',
    filed_in_one_year: '',
    application_type: '',
    protected_grounds: '',
    outcome: '',
    country_of_origin: '',
    gender: '',
    type_of_violence: '',
    indigenous_group: '',
    applicant_language: '',
    credible: '',
  });

  const popUpDetails = rowData => {
    setDetailsData(rowData);
    setIsDetailsVisible(true);
  };

  const { caseData, userInfo, savedCases, setSavedCases } = props;
  // console.log('CASE DATA', caseData)
  let casesData = caseData.map(cases => ({
    judge_name:
      cases.last_name +
      ', ' +
      cases.first_name +
      ' ' +
      cases.middle_initial +
      '.',
    filed_within_year:
      cases.filed_in_one_year
        .toString()
        .charAt(0)
        .toUpperCase() + cases.filed_in_one_year.toString().slice(1),
    case_row: cases,
    ...cases,
  }));

  const { TabPane } = Tabs;

  const { searchText, searchedColumn, selectedRowID } = state;

  const onSelectChange = selectedRowID => {
    setState({ selectedRowID });
  };

  //! start of my code
  function matchMultipleKeyWords(data, keywords) {
    let keywordsArr = keywords.split(',');
    let mutatedData = data.toString().toLowerCase();

    for (let keyword of keywordsArr) {
      if (mutatedData.includes(keyword.toLowerCase())) {
        return true;
      }
    }

    return false;
  }
  //! end of my code

  const tempFunction = async (setKeys, newValue) => {
    await setKeys([newValue]);
    setRemoving(false);
  };
  //! Config Function for ANT Start
  const getColumnSearchProps = (dataIndex, testHook) => ({
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
            tempHook.value != selectedKeys[0] && dataIndex == testHook
              ? tempHook.value
              : selectedKeys[0]
          }
          onChange={e => {
            setTempHook({
              value: e.target.value,
              key: dataIndex,
            });
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        {tempHook.value != selectedKeys[0] && removing && dataIndex == testHook
          ? tempFunction(setSelectedKeys, tempHook.value)
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
            //! start of my code  changed it to use ID instead of className
            //! end of my code
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
    //! start of my code
    onFilter: (value, record) =>
      record[dataIndex] ? matchMultipleKeyWords(record[dataIndex], value) : '',
    //! end of my code
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
  // Config Function for ANT End

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

  // returns processed array of filters
  const processFilters = filters => {
    //! console.log('FILTER', filters)
    let res = [];
    for (const i in filters) {
      if (filters[i]) {
        //! start of my code
        res.push({
          key: i,
          value: filters[i],
          //! end of my code
        });
      } else if (!filters[i]) {
        let temp = [];
        if (
          currentKey === 1 &&
          initialFilters.length > 0 &&
          //! start of my code
          initialFilters.includes(`${filters[i]}`)
          //! end of my code
        ) {
          initialFilters.forEach(value => {
            if (value !== undefined) {
              const term = value.split(':')[0];
              if (term !== i) {
                temp.push(value);
              }
            }
          });
          res = temp;
          //
        }
      }
    }
    //! console.log('RESSS', res)
    return res;
  };

  // function fires every time that the table is filtered
  function changeSorter(pagination, filters, sorter, extra) {
    Number(currentKey) === 1
      ? setInitialFilters(filters)
      : setAppFilters(filters);
  }

  // This is part of the Tabs component
  function callback(key) {
    setCurrentKey(key);
  }

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
          // This should be an alert
          //! console.log('Case already saved to bookmarks');
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

  //? Right now we will only return "caseData", but never "filter(caseData)"
  //? This functionality needs to be implemented!!!!!!
  const data = searching ? filter(caseData) : caseData;

  //? To be detemined whether we should keep it here,
  //? or delete this piece of code
  // const CaseDataChart = () => {
  //   let denied = 0;
  //   let granted = 0;
  //   let remanded = 0;
  //   let sustained = 0;
  //   let terminated = 0;

  //   data.map(eachCase => {
  //     if (eachCase.outcome === 'Denied') {
  //       denied += 1;
  //     }
  //     if (eachCase.outcome === 'Granted') {
  //       granted += 1;
  //     }
  //     if (eachCase.outcome === 'Remanded') {
  //       remanded += 1;
  //     }
  //     if (eachCase.outcome === 'Sustained') {
  //       sustained += 1;
  //     }
  //     if (eachCase.outcome === 'Terminated') {
  //       terminated += 1;
  //     }
  //     return null;
  //   });

  //   return (
  //     <Plot
  //       data={[
  //         {
  //           type: 'bar',
  //           x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
  //           y: [granted, denied, remanded, sustained, terminated],
  //         },
  //       ]}
  //       layout={{ width: 500, height: 300, title: 'Case Data' }}
  //     />
  //   );
  // };

  const nonAppCases = casesData.filter(item => item.appellate === false);
  // const appCases = casesData.filter(item => item.appellate === true);

  //! Start of my code
  const removeSearchTerm = async (filterState, keyWord, value) => {
    let filteredKeyWords = filterState[keyWord][0]
      .split(',')
      .filter(word => word != value)
      .join(',');

    filterState[keyWord] = filteredKeyWords.length ? [filteredKeyWords] : null;

    setInitialFilters(filterState);

    await setTempHook(
      filterState[keyWord]
        ? {
            value: filterState[keyWord][0],
            key: keyWord,
          }
        : {
            value: '',
            key: keyWord,
          }
    );

    setRemoving(true);
    if (filterState[keyWord]) {
      document.getElementById(`search_${keyWord}`).click();
    } else {
      document.getElementById(`reset_${keyWord}`).click();
    }

    return;
    //! End of my code
  };

  //! console.log('INITIAL FILTERS', initialFilters)
  return (
    <div className="cases-container">
      <h2 className="h1Styles">Cases</h2>
      <p className="divider">
        <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
      </p>

      <CaseDetails
        caseData={detailsData}
        setIsDetailsVisible={setIsDetailsVisible}
        isDetailsVisible={isDetailsVisible}
      />
      <div className="viz-container">
        <DecisionRateChart data={data} className="casesViz" />
      </div>

      <div className="case-table-container">
        <Tabs defaultActiveKey="1" onChange={callback} className="tabs">
          <TabPane tab="Initial Cases" key="1">
            <div>
              Filters: {/* //!  My code starting */}
              {processFilters(initialFilters).map(filter => {
                // console.log('EACH FILTER ', filter.value[0]);
                return filter.value[0].split(',').map(eachKeyWord => {
                  console.log('EACH KEYWORD', eachKeyWord);
                  return (
                    <Tag key={eachKeyWord}>
                      {eachKeyWord}{' '}
                      {/* //! Spans were created for the filter on both the initial and appellate case tables
                        //! The onClick was placed on this one to test functionality, but not on the appellate table
                        //! RemoveSearchTerm notes above the function */}
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          removeSearchTerm(
                            initialFilters,
                            filter.key,
                            eachKeyWord
                          )
                        }
                      >
                        X
                      </span>
                    </Tag>
                  );
                });
              })}
              {/* //! My code finished  */}
            </div>

            <div className="case-table">
              <Table
                className="cases_table iCases"
                rowSelection={rowSelection}
                rowKey={record => record.case_id}
                columns={case_columns(
                  getColumnSearchProps,
                  tempHook,
                  Link,
                  popUpDetails,
                  FileTextOutlined,
                  FilePdfOutlined
                )}
                dataSource={nonAppCases}
                onChange={changeSorter}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <Button
                className="save-cases-btn"
                onClick={() => {
                  bookmarkCases(selectedRowID);
                }}
              >
                <Icon component={() => <img src={Save} alt="save icon" />} />
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
