import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import { Modal, Button, Progress, Table, Tabs } from 'antd';
import {
  ExclamationCircleTwoTone,
  FileTextOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import './MyCases.less';
import ReviewCaseForm from './ReviewCaseForm';
const initialFormValues = {
  date: '',
  judge: '',
  outcome: '',
  country_of_origin: '',
  protected_grounds: '',
  application_type: '',
  case_origin_city: '',
  case_origin_state: '',
  gender: '',
  applicant_language: '',
  indigenous_group: '',
  type_of_persecution: '',
  initial_or_appellate: false,
  filed_in_one_year: false,
  credibility: false,
};
export default function MyCases(props) {
  const { TabPane } = Tabs;
  const { user, myPendingCases, getPendingCases } = props;
  const [myApprovedCases, setMyApprovedCases] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [flipper, serflipper] = useState(false);

  useEffect(() => {
    getPendingCases();
  }, []);

  const pendingColumns = [
    {
      width: '25%',
      title: row => <strong>{'File Name'}</strong>,
      dataIndex: 'file_name',
      key: 'file_name',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      width: '10%',
      align: 'center',
      dataIndex: 'created_at',
      key: 'uploaded',
      title: row => <strong>{'Uploaded On'}</strong>,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      width: '15%',
      align: 'center',
      dataIndex: 'url',
      title: row => <strong>{'View PDF'}</strong>,
      render: link => (
        <a href={link}>
          {' '}
          <FilePdfOutlined />
        </a>
      ),
    },
    {
      title: row => <strong>{'Status'}</strong>,
      key: 'status',
      width: '15%',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: row =>
        row.status === 'Review' ? (
          <div className="column-items">
            <Button
              size="small"
              style={{ backgroundColor: '#2a5c8d', color: 'white' }}
              onClick={e => {
                e.preventDefault();
                showModal(row);
                setCurrentId(row.case_id);
              }}
            >
              Review
            </Button>
            <ExclamationCircleTwoTone twoToneColor="red" />
          </div>
        ) : (
          <>
            {row.status}
            <div style={{ margin: 2 }}>
              {row.status === 'Processing' ? (
                <Progress percent={30} size="small" status="active" />
              ) : null}
              {row.status === 'Pending' ? (
                <Progress percent={50} size="small" status="active" />
              ) : null}
              {row.status === 'Error' ? (
                <Progress percent={100} size="small" status="exception" />
              ) : null}
              {row.status === 'Approved' ? (
                <Progress percent={100} size="small" />
              ) : null}
            </div>
          </>
        ),
    },
    {
      width: '25%',
      align: 'center',
      dataIndex: 'comment',
      key: 'comment',
      title: row => <strong>{'Comment'}</strong>,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      width: '10em',
      title: row => <strong>{'Cancel'}</strong>,
      key: 'cancel',
      align: 'center',
      render: row => (
        <CloseCircleOutlined onClick={() => onDelete(row.case_id)} />
      ),
    },
  ];
  const approvedColumns = [
    {
      key: '',
      title: row => <strong>{'Case Details'}</strong>,
      render: row => (
        <>
          <Link>
            {' '}
            <FileTextOutlined />{' '}
          </Link>
        </>
      ),
    },
    {
      key: 'url',
      title: row => <strong>{'View PDF'}</strong>,
      render: params => (
        <Button
          size="small"
          style={{ backgroundColor: 'aliceblue' }}
          icon={
            <svg
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.363 2C13.518 2 12 8 12 8C12 8 18 6.35 18 10.457V22H2V2H9.363ZM10.189 0H0V24H20V9.614C20 7.223 13.352 0 10.189 0ZM15 13H12.372V16.686H13.279V15.214H14.769V14.482H13.279V13.784H15V13ZM10.1 13H8.501V16.686H10.1C10.637 16.686 11.061 16.505 11.362 16.151C11.917 15.493 11.949 14.117 11.3 13.459C11.002 13.159 10.588 13 10.1 13ZM9.408 13.783H9.904C10.377 13.783 10.706 13.956 10.819 14.427C10.883 14.694 10.896 15.106 10.798 15.375C10.67 15.726 10.417 15.903 10.044 15.903H9.407V13.783H9.408ZM6.668 13H5V16.686H5.907V15.409H6.668C7.287 15.409 7.732 15.132 7.892 14.646C7.987 14.355 7.987 14.049 7.892 13.761C7.732 13.277 7.286 13 6.668 13ZM5.907 13.732H6.453C6.688 13.732 6.92 13.76 7.029 13.96C7.096 14.083 7.096 14.326 7.029 14.449C6.92 14.648 6.688 14.676 6.453 14.676H5.907V13.732Z"
                fill="#BD5A27"
              />
            </svg>
          }
          onClick={e => {
            e.preventDefault();
          }}
        ></Button>
      ),
    },
    {
      key: 'status',
      title: row => <strong>{'Status'}</strong>,
      render: row => <span>Approved</span>,
    },
  ];

  const showModal = values => {
    setVisible(true);
    setFormValues(values);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onDelete = case_id => {
    trackPromise(axiosWithAuth().delete(`/cases/${case_id}`))
      .then(res => {
        getPendingCases();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="myCaseContainer">
      <div className="myCaseTableContainer">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Initial Cases" key="1">
            <div className="myCaseTable">
              <Table
                rowKey={record => record.case_id}
                columns={pendingColumns}
                dataSource={myPendingCases.map(c => {
                  return {
                    ...c,
                    created_at: c.created_at.slice(0, c.created_at.search('T')),
                  };
                })}
              />
            </div>
          </TabPane>
          <TabPane tab="Appellate Cases" key="2">
            <div className="myCaseTable">
              <Table
                rowKey={record => record.case_id}
                columns={approvedColumns}
                dataSource={myApprovedCases}
              />
            </div>
          </TabPane>
        </Tabs>
        <Modal
          title="Review Case Details"
          visible={visible}
          onCancel={handleCancel}
          footer={[]}
        >
          <ReviewCaseForm
            formValues={formValues}
            currentId={currentId}
            getPendingCases={getPendingCases}
            setVisible={setVisible}
            isVisible={visible}
          />
        </Modal>
      </div>
    </div>
  );
}
