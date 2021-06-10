import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import './_ManageCasesStyles.less';

import { Table, Button } from 'antd';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

//***There is a bug*** Currently, when you expand one caseObj they all expand. This may be an issue with accept and reject buttons - we don't want to accept all or reject all on accident!

export default function ManageCases(props) {
  const [apiData, setApiData] = useState([]);
  const handleAccept = record => {
    console.log('Accepted');
    console.log(record);
    //Need to make and connect put request to handle "status"(or whatever they decided to call case status) update
    axiosWithAuth()
      .post(`/pendingCases/approve/${record.pending_case_id}`, record)
      .then(res => {
        console.log('accept successful');
        setApiData(apiData.filter(c => c.pending_case_id != record.pending_case_id));
      })
      .catch(err => {
        console.log('accept failed');
        console.log(err);
      });
  };

  const handleReject = record => {
    console.log('Rejected');
    console.log(record);
    //Need to make and connect put request to handle "status" (or whatever they decided to call case status) update
    axiosWithAuth()
    .delete(`/pendingCases/approve/${record.pending_case_id}`)
    .then(res => {
      console.log('reject successful');
      setApiData(apiData.filter(c => c.pending_case_id != record.pending_case_id));
    })
    .catch(err => {
      console.log('reject failed');
      console.log(err);
    });
  };

  const columns = [
    { title: 'Pending Case ID', dataIndex: 'pending_case_id', key: 'pending_case_id', width: '25%' },
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
        <Button onClick={() => handleReject(record)} id="rejectCaseButton">
          Reject
        </Button>
      ),
    },
  ];

  let filteredData = [];

  useEffect(() => {
    axiosWithAuth()
      .get(`/pendingCases`)
      .then(res => {
        filteredData.push(
          res.data.filter(caseStatus => {
            return caseStatus.status === 'Pending';
            //currently, there is only one pending case in the seed data. If you want to test multiple case objects, try setting "status" to case_outcome and "pending" to "remanded" or "denied"
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
                <p style={{ margin: 0 }}>Pending Case ID: {caseObj.pending_case_id}</p>
                <p style={{ margin: 0 }}>Date: {caseObj.date}</p>
                <p style={{ margin: 0 }}>
                  Case Outcome: {caseObj.case_outcome}
                </p>
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
                  {caseObj.case_filed_within_one_year ? 'True' : 'False'}
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
      </div>
    </div>
  );
}
