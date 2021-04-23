import React, { useState } from 'react';
import axios from 'axios';
import UploadCaseForm from '../Upload/UploadCaseForm';
import './ManageCases.css';

import { Typography, Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Case Name',
    dataIndex: 'Case Name',
    key: 'Case Name',
  },
  {
    title: 'User Name',
    dataIndex: 'User Name',
    key: 'User Name',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
  },
  {
    title: 'Time',
    key: 'Time',
    dataIndex: 'Time',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function ManageCases(props) {
  return (
    <div className="Manage-Cases-Container">
      <Typography.Title level={2}>ManageCases</Typography.Title>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

// const initialFormValues = {
//   case_url: '',
//   hearing_date: '',
//   judge: '',
//   initial_or_appellate: '',
//   // hearing_type: '' pending stakeholder approval,
//   nation_of_origin: '',
//   case_origin: '',
//   applicant_perceived_credibility: '',
//   case_outcome: '',
//   applicant_gender: '',
//   applicant_indigenous_group: '',
//   applicant_language: '',
//   type_of_violence_experienced: '',
//   applicant_access_to_interpreter: '',
//   protected_ground: [],
//   application_type: [],
//   case_filled_within_one_year: '',
//   // case_status: '' pending stakeholder approval,
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
