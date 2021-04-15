import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const CaseOverview = props => {
  const { authState } = props;
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCase() {
      axios
        .get(`${process.env.REACT_APP_API_URI}/case/${id}`, {
          headers: {
            Authorization: 'Bearer ' + authState,
          },
        })
        .then(res => {
          setCaseData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setLoading(true);
    fetchCase();
  }, [id, authState]);

  return (
    <>
      <Card
        style={{ width: 500, fontWeight: 'normal', margin: '10% 15% 0% 22%' }}
        actions={[
          <div onClick={() => history.push(`/case/${caseData.case_id}/update`)}>
            <EditOutlined key="edit" style={{ color: '#215589' }} />
          </div>,
        ]}
      >
        <Skeleton loading={loading}>
          <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Case Details
          </p>
          <p> Case ID: {caseData.case_id}</p>
          <p>Date: {caseData.hearing_date}</p>
          <p>Location: {caseData.case_origin}</p>
          <p>
            Judge:
            <Link
              style={{ color: '#215589', marginLeft: '5px' }}
              to={`/judge/${caseData.judge_name}`}
            >
              {caseData.judge_name}
            </Link>
          </p>
          <p>Court Type: {caseData.court_type}</p>
          <br />
          <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Client Specifics
          </p>
          <p>Origin: {caseData.nation_of_origin}</p>
          <p>Application Type: {caseData.application_type}</p>
          <p>Protected Grounds:{caseData.protected_ground}</p>
          <p>Credibility: {caseData.credibility}</p>
          <br />
          <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            Results
          </p>
          <p>Decision Date: {caseData.decision_date}</p>
          <p>Case Outcome: {caseData.case_outcome}</p>
          <br />
        </Skeleton>
      </Card>
    </>
  );
};

export default CaseOverview;
