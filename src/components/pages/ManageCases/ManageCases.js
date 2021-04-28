import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCases.css';

import { Typography, Table, Button } from 'antd';

//***There is a bug*** Currently, when you expand one caseObj they all expand. This may be an issue with accept and reject buttons - we don't want to accept all or reject all on accident!

export default function ManageCases(props) {
  const [apiData, setApiData] = useState([]);
  const handleAccept = case_id => {
    console.log('Accepted');
    //Need to make and connect put request to handle "status"(or whatever they decided to call case status) update
  };

  const handleReject = case_id => {
    console.log('Rejected');
    //Need to make and connect put request to handle "status" (or whatever they decided to call case status) update
  };

  const columns = [
    //will have to update dataIndex and keys for "Uploaded By" once backend is updated
    { title: 'Case ID', dataIndex: 'case_id', key: 'case_id' },
    { title: 'Uploaded By', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Date Uploaded', dataIndex: 'uploaded', key: 'uploaded' },
    {
      title: 'Approve',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Button onClick={handleAccept} id="acceptCaseButton">
          Accept
        </Button>
      ),
    },
    {
      title: 'Reject',
      dataIndex: '',
      key: 'y',
      render: () => (
        <Button onClick={handleReject} id="rejectCaseButton">
          Reject
        </Button>
      ),
    },
  ];

  let filteredData = [];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/cases`)
      .then(res => {
        filteredData.push(
          res.data.filter(caseStatus => {
            return caseStatus.case_outcome === 'Remanded';
            //When backend is updated, "case_outcome" needs to be switched to "status" (or whatever they decided to call case status) and "remanded" needs to be switched to "Pending"
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
    <div className="manageCasesContainer">
      <Typography.Title level={2} className="manageCasesTitle">
        ManageCases
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={apiData[0]}
        expandable={{
          expandedRowRender: caseObj => (
            <div key={caseObj.case_id}>
              <p style={{ margin: 0 }}> Case ID: {caseObj.case_id}</p>
              <p style={{ margin: 0 }}>Date: {caseObj.hearing_date}</p>
              <p style={{ margin: 0 }}>
                Initial Hearing:
                {caseObj.initial_or_appellate ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>Case Origin: {caseObj.case_origin}</p>
              <p style={{ margin: 0 }}>
                Filed 1 Year:
                {caseObj.case_filed_within_one_year ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>
                Nation of Origin: {caseObj.nation_of_origin}
              </p>
              <p style={{ margin: 0 }}>
                Protected Grounds:
                {caseObj.protected_ground ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>
                Applicant Gender: {caseObj.applicant_gender}
              </p>
              <p style={{ margin: 0 }}>
                Violence Experienced: {caseObj.type_of_violence_experienced}
              </p>
              <p style={{ margin: 0 }}>Case Outcome: {caseObj.case_outcome}</p>
            </div>
          ),
          rowExpandable: caseObj => caseObj.name !== 'Not Expandable',
        }}
      ></Table>
    </div>
  );
}
