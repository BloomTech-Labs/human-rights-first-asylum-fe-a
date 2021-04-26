import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCases.css';

import { Modal, Typography, Table, Space, Button } from 'antd';

const { Column } = Table;

const data = [
  {
    case_id: '1',
    user_id: 'John Brown',
    uploaded: '4/21/2021 12:05:06',
    address: 'New York No. 1 Lake Park',
  },
  {
    case_id: '2',
    user_id: 'Jim Green',
    uploaded: '4/21/2021 1:06:27',
    address: 'London No. 1 Lake Park',
  },
  {
    case_id: '3',
    user_id: 'Joe Black',
    uploaded: '4/21/2021 8:40:35',
    address: 'Sidney No. 1 Lake Park',
  },
];

export default function ManageCases(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const [status, setStatus] = useState('');

  let filteredData = [];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/cases`)
      .then(res => {
        filteredData.push(
          res.data.filter(caseOutcome => {
            return caseOutcome.case_outcome === 'Remanded';
          })
        );
      })
      .catch(error => console.log(error));
  });

  console.log(filteredData);

  const showModal = () => {
    setVisible(true);
  };

  const handleAccept = case_id => {
    setModalText(`Case number ${case_id} has been accepted`);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleReject = case_id => {
    setModalText(`Case number ${case_id} has been rejected`);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const acceptCase = () => {
    axios
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
      <Table dataSource={data}>
        <Column
          title="Case ID"
          className="columnTitle"
          dataIndex="case_id"
          key="case_id"
          render={data => (
            <Space size="middle">
              <a> {data}</a>
            </Space>
          )}
        />
        <Column
          title="Uploaded By"
          className="columnTitle"
          dataIndex="user_id"
          key="user_id"
        />
        <Column
          title="Date Uploaded"
          className="columnTitle"
          dataIndex="uploaded"
          key="uploaded"
        />
        <Column
          title="Action"
          className="columnTitle"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                onClick={acceptCase}
                className="acceptCaseButton"
                variant="contained"
                component="span"
              >
                Accept
              </Button>
              <Button
                onClick={rejectCase}
                className="rejectCaseButton"
                variant="contained"
                component="span"
              >
                Reject
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

{
  /* <Link to={`/case/${params.value}`} className="caseTableLink">
            <span> {params.row['case_id']}</span>
          </Link> */
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
