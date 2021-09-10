import React from 'react';
import { formatDate } from '../format_date_util';

export function judge_columns(Link, getColumnSearchProps) {
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

  return columns;
}
