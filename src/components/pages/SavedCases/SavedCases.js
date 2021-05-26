import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import Delete from '../../../styles/icons/delete.svg';
import Case from '../../../styles/icons/case.svg';
import PDF from '../../../styles/icons/pdf.svg';

import './_SavedCasesStyles.less';

function SavedCases({ savedCases, setSavedCases, deleteBookmark }) {
  const handleClick = deleteCase => {
    deleteBookmark(deleteCase);
    setSavedCases(
      savedCases.filter(savedCase => savedCase.case_id !== deleteCase)
    );
  };
  const columns = [
    {
      title: 'Case',
      dataIndex: 'case_id',
      key: 'case_id',
      render: (text, record) => (
        <Link to={`/case/${record.case_id}`}>
          <Icon component={() => <img src={Case} alt="case icon" />} />
        </Link>
      ),
      width: '5%',
    },
    {
      title: 'PDF',
      dataIndex: 'case_url',
      key: 'case_url',
      render: (text, record) => (
        <a href={record.case_url}>
          <Icon component={() => <img src={PDF} alt="download" />} />
        </a>
      ),
      width: '5%',
    },
    {
      title: 'Judge',
      dataIndex: 'judge_id',
      key: 'judge_id',
      width: '17%',
      render: (text, record) => (
        <Link to={`/judge/${record.judge_id}`}>
          {record.first_name}
          <span> </span>
          {record.middle_initial}
          <span> </span>
          {record.last_name}
        </Link>
      ),
    },
    {
      title: 'City',
      dataIndex: 'case_origin_city',
      key: 'case_origin_city',
      width: '10%',
    },
    {
      title: 'Country of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
      width: '20%',
    },
    {
      title: 'Protected Grounds',
      dataIndex: 'protected_grounds',
      key: 'protected_grounds',
      width: '20%',
    },
    {
      title: 'Outcome',
      dataIndex: 'case_outcome',
      key: 'case_outcome',
      width: '10%',
    },
    {
      title: 'Application Type',
      dataIndex: 'application_type',
      key: 'application_type',
      width: '15%',
    },
    {
      title: 'Remove',
      key: 'remove',
      width: '5%',
      render: (text, record) => (
        <Icon
          onClick={() => handleClick(record.case_id)}
          component={() => <img src={Delete} alt="delete icon" />}
        />
      ),
    },
  ];

  return (
    <div className="savedCasesContainer">
      <div className="savedCases">
        <h2 className="saved-cases-header">Saved Cases</h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Table columns={columns} dataSource={savedCases} />
      </div>
    </div>
  );
}

export default SavedCases;
