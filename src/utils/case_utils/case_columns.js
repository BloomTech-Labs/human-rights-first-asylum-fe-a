import React from 'react';
import { formatDate } from '../format_date_util';

export function case_columns(
  getColumnSearchProps,
  match_tag_value_with_column_key,
  Link,
  popUpDetails,
  FileTextOutlined,
  FilePdfOutlined
) {
  const columns = [
    {
      title: 'Case Details',
      dataIndex: 'case_row',
      key: 'x',
      render: text => <FileTextOutlined onClick={() => popUpDetails(text)} />,
    },
    {
      title: 'Case Date',
      dataIndex: 'decision_date',
      key: 'decision_date',
      sorter: (a, b) => a.decision_date.localeCompare(b.decision_date),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'decision_date',
        match_tag_value_with_column_key.key
      ),
      render: text => formatDate(text),
    },
    {
      title: 'Judge Name',
      dataIndex: 'judge_name',
      key: 'judge_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'judge_name',
        match_tag_value_with_column_key.key
      ),
      render: (text, record) => (
        <Link to={`/judge/${record.judge_id}`}>{text}</Link>
      ),
    },
    {
      title: 'Origin City',
      dataIndex: 'case_origin_city',
      key: 'case_origin_city',
      sorter: (a, b) => a.case_origin_city.localeCompare(b.case_origin_city),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'case_origin_city',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Origin State',
      dataIndex: 'case_origin_state',
      key: 'case_origin_state',
      sorter: (a, b) => a.case_origin_state.localeCompare(b.case_origin_state),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'case_origin_state',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Filed within Year',
      dataIndex: 'filed_within_year',
      key: 'filed_within_year',
      sorter: (a, b) => a.filed_within_year.localeCompare(b.filed_within_year),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'filed_within_year',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Protected Grounds',
      dataIndex: 'protected_grounds',
      key: 'protected_grounds',
      sorter: (a, b) => a.protected_grounds.localeCompare(b.protected_grounds),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'protected_grounds',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Outcome',
      dataIndex: 'outcome',
      key: 'outcome',
      sorter: (a, b) => a.outcome.localeCompare(b.outcome),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('outcome', match_tag_value_with_column_key.key),
    },
    {
      title: 'Country of Origin',
      dataIndex: 'country_of_origin',
      key: 'country_of_origin',
      sorter: (a, b) => a.country_of_origin.localeCompare(b.country_of_origin),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'country_of_origin',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Applicant Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('gender', match_tag_value_with_column_key.key),
    },
    {
      title: 'Violence Experienced',
      dataIndex: 'type_of_violence',
      key: 'type_of_violence',
      sorter: (a, b) => a.type_of_violence.localeCompare(b.type_of_violence),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'type_of_violence',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Applicant Language',
      dataIndex: 'applicant_language',
      key: 'applicant_language',
      sorter: (a, b) =>
        a.applicant_language.localeCompare(b.applicant_language),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'applicant_language',
        match_tag_value_with_column_key.key
      ),
    },
    {
      title: 'Download PDF',
      dataIndex: 'url',
      key: 'url',
      render: text => (
        <a href={text}>
          {' '}
          <FilePdfOutlined />
        </a>
      ),
    },
  ];

  return columns;
}
