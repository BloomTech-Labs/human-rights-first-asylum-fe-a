import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import './_ManageCasesStyles.less';

import { notification, Table, Button, Modal, Input, Form } from 'antd';
import {
  FilePdfOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
const { TextArea } = Input;

//***There is a bug*** Currently, when you expand one caseObj they all expand. This may be an issue with accept and reject buttons - we don't want to accept all or reject all on accident!
//
export default function ManageCases(props) {
  const { authState } = props;
  const [apiData, setApiData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCase, setCurrentCase] = useState();
  const [comment, setComment] = useState('');

  const handleAccept = record => {
    axiosWithAuth()
      .put(`/cases/pending/approve/${record.case_id}`, { status: 'Approved' })
      .then(res => {
        notification.open({
          message: 'Case Approved',
          top: 128,
          icon: <CheckCircleOutlined style={{ color: 'green' }} />,
        });
        setApiData([apiData[0].filter(c => c.case_id !== record.case_id)]);
      })
      .catch(err => {
        notification.open({
          message: 'Database Error',
          description: 'failed to approve case',
          top: 128,
          icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        });
      });
  };

  const handleReject = record => {
    record.comment = comment;

    axiosWithAuth()
      .put(`/cases/comment/${record.case_id}`, record)
      .then(res => {
        axiosWithAuth()
          .put(`/cases/pending/approve/${record.case_id}`, { status: 'Review' })
          .then(res => {
            notification.open({
              message: 'Case Rejected',
              top: 128,
              icon: <CheckCircleOutlined style={{ color: 'green' }} />,
            });
            setApiData([apiData[0].filter(c => c.case_id !== record.case_id)]);
            setIsModalVisible(false);
          })
          .catch(err => {
            notification.open({
              message: 'Database Error',
              description: 'failed to reject case',
              top: 128,
              icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            });
            setIsModalVisible(false);
          });
      })
      .catch(err => {
        notification.open({
          message: 'Database Error',
          description: 'failed to reject the case',
          top: 128,
          icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        });
      });
  };

  const handleChangeComment = e => {
    setComment(e.target.value);
  };

  const showModal = record => {
    setCurrentCase(record);
    setComment('');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Case ID', dataIndex: 'case_id', key: 'case_id', width: '25%' },
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
    {
      title: 'Uploaded By',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '25%',
    },
    {
      title: 'Date Uploaded',
      dataIndex: 'uploaded',
      key: 'uploaded',
      width: '20%',
    },
    {
      title: 'Approve',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (_, record) => (
        <Button onClick={() => handleAccept(record)} id="acceptCaseButton">
          Accept
        </Button>
      ),
    },
    {
      title: 'Reject',
      dataIndex: '',
      key: 'y',
      width: '10%',
      render: (_, record) => (
        <Button onClick={() => showModal(record)} id="rejectCaseButton">
          Reject
        </Button>
      ),
    },
  ];

  useEffect(() => {
    let filteredData = [];
    axiosWithAuth()
      .get(`/cases/pending`)
      .then(res => {
        filteredData.push(
          res.data.filter(caseStatus => {
            return caseStatus.status === 'Pending';
            //currently, there is only one pending case in the seed data. If you want to test multiple case objects, try setting "status" to outcome and "pending" to "remanded" or "denied"
          })
        );
      })
      .then(() => {
        setApiData(filteredData);
      })
      .catch(err => {
        console.log(err);
        //need to change functionality to render the error to the screen for user
      });
  }, []);

  return (
    <div className="manage-cases-container">
      <div className="manage-cases">
        <h2 className="manage-cases-title">Review Cases</h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Table
          columns={columns}
          dataSource={apiData[0]}
          expandable={{
            expandedRowRender: caseObj => (
              <div key={caseObj.case_id}>
                <p style={{ margin: 0 }}>
                  Pending Case ID: {caseObj.pending_case_id}
                </p>
                <p style={{ margin: 0 }}>Date: {caseObj.date}</p>
                <p style={{ margin: 0 }}>Case Outcome: {caseObj.outcome}</p>
                <p style={{ margin: 0 }}>
                  Country of Origin: {caseObj.country_of_origin}
                </p>
                <p style={{ margin: 0 }}>
                  Protected Grounds:
                  {caseObj.protected_ground ? 'True' : 'False'}
                </p>
                <p style={{ margin: 0 }}>
                  Application Type: {caseObj.application_type}
                </p>
                <p style={{ margin: 0 }}>
                  Case Origin State: {caseObj.case_origin_state}
                </p>
                <p style={{ margin: 0 }}>
                  Case Origin City: {caseObj.case_origin_city}
                </p>
                <p style={{ margin: 0 }}>Applicant Gender: {caseObj.gender}</p>
                <p style={{ margin: 0 }}>
                  Applicant Language: {caseObj.applicant_language}
                </p>
                <p style={{ margin: 0 }}>
                  Initial Hearing:
                  {caseObj.initial_or_appellate ? 'True' : 'False'}
                </p>
                <p style={{ margin: 0 }}>
                  Filed 1 Year:
                  {caseObj.filed_within_one_year ? 'True' : 'False'}
                </p>
                <p style={{ margin: 0 }}>
                  Credible:
                  {caseObj.credible ? 'True' : 'False'}
                </p>
                <p style={{ margin: 0 }}>
                  Violence Experienced: {caseObj.type_of_violence_experienced}
                </p>
              </div>
            ),
            rowExpandable: caseObj => caseObj.name !== 'Not Expandable',
          }}
        ></Table>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleReject}
          onCancel={handleCancel}
          footer={[
            <div className="rejectionModal">
              <Form
                rules={[{ required: true, message: 'Please leave a comment' }]}
              >
                <h2 className="rejectionModalTitle">
                  Tell us why you rejected this case
                </h2>
                <TextArea
                  onChange={handleChangeComment}
                  value={comment}
                  rows={4}
                />
                <div className="rejectionModalButtonContainer">
                  <Button
                    className="review-btn"
                    onClick={() => handleReject(currentCase)}
                  >
                    Reject
                  </Button>
                </div>
              </Form>
            </div>,
          ]}
        ></Modal>
      </div>
    </div>
  );
}
