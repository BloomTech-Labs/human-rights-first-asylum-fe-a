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
      title: 'Case Number',
      dataIndex: 'case_number',
      key: 'case_number',
      render: text => <Link to={`/case/${text}`}>{text}</Link>,
    },
    {
      title: 'Country of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
    },
    {
      title: 'Protected Grounds',
      dataIndex: 'protected_grounds',
      key: 'protected_grounds',
    },
    {
      title: 'Application Type',
      dataIndex: 'application_type',
      key: 'application_type',
    },
    {
      title: 'Judge',
      dataIndex: 'judge_id',
      key: 'judge_id',
    },
    {
      title: 'Outcome',
      dataIndex: 'case_outcome',
      key: 'case_outcome',
    },
    {
      title: 'Remove',
      key: 'remove',
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
        <h2 className="saved-cases-header">Review Cases</h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Table columns={columns} dataSource={savedCases} />
      </div>
    </div>
  );
}

export default SavedCases;
