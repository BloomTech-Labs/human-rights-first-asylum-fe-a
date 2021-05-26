import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import Delete from '../../../styles/icons/delete.svg';
import './_SavedCasesStyles.less';

function SavedCases({ savedCases, deleteBookmark }) {
  const columns = [
    {
      title: 'View Case',
      dataIndex: 'case_id',
      key: 'case_id',
      render: (text, record) => (
        <Link to={`/case/${record.case_id}`}>{text}</Link>
      ),
      width: '15%',
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
      title: 'Application Type',
      dataIndex: 'application_type',
      key: 'application_type',
      width: '20%',
    },
    {
      title: 'Judge',
      dataIndex: 'judge_id',
      key: 'judge_id',
      width: '15%',
    },
    {
      title: 'Outcome',
      dataIndex: 'case_outcome',
      key: 'case_outcome',
      width: '15%',
    },
    {
      title: 'Remove',
      key: 'remove',
      width: '5%',
      render: (text, record) => (
        <Icon
          onClick={() => deleteBookmark(record.case_id)}
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
