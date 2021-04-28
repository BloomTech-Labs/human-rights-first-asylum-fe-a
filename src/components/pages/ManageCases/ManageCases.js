import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCases.css';

import { Typography, Table, Space, Button } from 'antd';

export default function ManageCases(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState('');

  const handleAccept = case_id => {
    console.log('Accepted');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 3000);
  };

  const handleReject = case_id => {
    console.log('Rejected');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 3000);
  };

  const columns = [
    { title: 'Case ID', dataIndex: 'case_id', key: 'case_id' },
    { title: 'Uploaded By', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Date Uploaded', dataIndex: 'uploaded', key: 'uploaded' },
    {
      title: 'Approve',
      dataIndex: '',
      key: 'x',
      render: () => <Button onClick={handleAccept}>Accept</Button>,
    },
    {
      title: 'Reject',
      dataIndex: '',
      key: 'y',
      render: () => <Button onClick={handleReject}>Reject</Button>,
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
            //When backend is updated, "case_outcome" needs to be switched to "status" (or whatever they decided to call case status) and "remanded" needs to be switched to "pending"
          })
        );
      })
      .then(() => {
        setApiData(filteredData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const acceptCase = () => {
    axios
      //requests currently not functioning - need to be hooked up to proper backend router
      .put(`${process.env.REACT_APP_API_URI}/manage/approve`)
      .then(res => {
        console.log(res.data);
        // setIsApproved(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const rejectCase = () => {
    axios
      //requests currently not functioning - need to be hooked up to proper backend router
      .put(`${process.env.REACT_APP_API_URI}/manage/reject`)
      .then(res => {
        console.log(res.data);
        // setIsDenied(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="manageCasesContainer">
      <Typography.Title level={2} className="manageCasesTitle">
        ManageCases
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={apiData[0]}
        expandable={{
          expandedRowRender: record => (
            <>
              <p style={{ margin: 0 }}> Case ID: {record.case_id}</p>
              <p style={{ margin: 0 }}>Date: {record.hearing_date}</p>
              <p style={{ margin: 0 }}>
                Initial Hearing:
                {record.initial_or_appellate ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>Case Origin: {record.case_origin}</p>
              <p style={{ margin: 0 }}>
                Filed 1 Year:
                {record.case_filed_within_one_year ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>
                Nation of Origin: {record.nation_of_origin}
              </p>
              <p style={{ margin: 0 }}>
                Protected Grounds:
                {record.protected_ground ? 'True' : 'False'}
              </p>
              <p style={{ margin: 0 }}>
                Applicant Gender: {record.applicant_gender}
              </p>
              <p style={{ margin: 0 }}>
                Violence Experienced: {record.type_of_violence_experienced}
              </p>
              <p style={{ margin: 0 }}>Case Outcome: {record.case_outcome}</p>
            </>
          ),
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
      ></Table>
    </div>
  );
}

// const initialFormValues = {
// case_url: '',
// hearing_date: '',
// judge: '',
// initial_or_appellate: '',
// // hearing_type: '' pending stakeholder approval,
// nation_of_origin: '',
// case_origin: '',
// applicant_perceived_credibility: '',
// case_outcome: '',
// applicant_gender: '',
// applicant_indigenous_group: '',
// applicant_language: '',
// type_of_violence_experienced: '',
// applicant_access_to_interpreter: '',
// protected_ground: [],
// application_type: [],
// case_filled_within_one_year: '',
// case_status: '' pending stakeholder approval,
// };

// const ManageCases = props => {
//   const [formValues, setFormValues] = useState(initialFormValues);

//   const postNewCase = newCase => {
//     axios
//       .post(`${process.env.REACT_APP_API_URI}/upload/`, newCase)
//       .catch(err => console.log(err));
//     setFormValues(initialFormValues);
//   };

//   const [isApproved, setIsApproved] = useState(false);
//   const [isDenied, setIsDenied] = useState(false);
//   const [approvedQueue, setApprovedQueue] = useState([]);

//   const approvedCases = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_URI}/manage/all`)
//       .then(res => {
//         console.log(res.data);
//         setApprovedQueue(res.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const acceptCase = () => {
//     axios
//       .post(`${process.env.REACT_APP_API_URI}/manage/approve`)
//       .then(res => {
//         console.log(res.data);
//         setIsApproved(res.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const rejectCase = () => {
//     axios
//       .delete(`${process.env.REACT_APP_API_URI}/manage/reject`)
//       .then(res => {
//         console.log(res.data);
//         setIsDenied(res.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const onSubmit = () => {
//     const newCase = {
//       case_url: formValues.case_url.trim(),
//       hearing_date: formValues.hearing_date.trim(),
//       judge: formValues.judge.trim(),
//       initial_or_appellate: formValues.initial_or_appellate.trim(),
//       // hearing_type: formValues.hearing_type.trim() (pending stakeholder approval),
//       nation_of_origin: formValues.nation_of_origin.trim(),
//       case_origin: formValues.case_origin.trim(),
//       applicant_perceived_credibility: formValues.applicant_perceived_credibility.trim(),
//       case_outcome: formValues.case_outcome.trim(),
//       applicant_gender: formValues.applicant_gender.trim(),
//       applicant_indigenous_group: formValues.applicant_indigenous_group.trim(),
//       applicant_language: formValues.applicant_language.trim(),
//       type_of_violence_experienced: formValues.type_of_violence_experienced.trim(),
//       applicant_access_to_interpreter: formValues.applicant_access_to_interpreter.trim(),
//       protected_ground: formValues.protected_ground.trim(),
//       application_type: formValues.application_type.trim(),
//       case_filled_within_one_year: formValues.case_filled_within_one_year.trim(),
//       // case_status: formValues..trim() (pending stakeholder approval),
//     };
//     postNewCase(newCase);
//   };

//   const onInputChange = e => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   console.log(approvedCases, approvedQueue, isApproved, isDenied);

//   return (
//     <div className="uploadPage">
//       <UploadCaseForm
//         formValues={formValues}
//         onInputChange={onInputChange}
//         submit={onSubmit}
//         acceptCase={acceptCase}
//         rejectCase={rejectCase}
//       />
//     </div>
//   );
// };

// export default ManageCases;
