import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Icon from '@ant-design/icons';
import Delete from '../../../styles/icons/delete.svg';
import './_SavedJudgesStyles.less';
import { Divider } from 'antd';

function SavedJudges({ savedJudges, deleteSavedJudge }) {
  const columns = [
    {
      title: 'Judge Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '20%',
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
      title: 'Court Location',
      dataIndex: 'judge_county',
      key: 'judge_county',
      width: '20%',
    },
    {
      title: 'Biography',
      dataIndex: 'biography',
      key: 'biography',
      width: '20%',
    },
    {
      title: 'Appointed By',
      dataIndex: 'appointed_by',
      key: 'appointed_by',
      width: '20%',
    },
    {
      title: 'Remove',
      key: 'remove',
      width: '10%',
      render: record => (
        <Icon
          onClick={() => deleteSavedJudge(record.judge_id)}
          component={() => <img src={Delete} alt="delete icon" />}
        />
      ),
    },
  ];

  return (
    <div className="savedJudgesContainer">
      <div className="savedJudges">
        <h2 className="saved-judges-header">Saved Judges</h2>
        {/* <Divider /> */}
        <Table columns={columns} dataSource={savedJudges} />
      </div>
    </div>
  );
}

export default SavedJudges;
