import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CaseUpdate from './CaseUpdate';

const CaseOverview = props => {
  const token = localStorage.getItem('okta-token-storage');
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCase() {
      axiosWithAuth()
        .get(`/case/${id}`)
        .then(res => {
          setCaseData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (token) {
      setLoading(true);
      fetchCase();
    }
  }, [id, token]);

  return (
    <div className="case-container">
      <Card
        style={{ width: 500, fontWeight: 'normal', margin: '10% 15% 0% 22%' }}
        actions={[
          !loading && (
            <div onClick={() => setIsEditing(!isEditing)}>
              <EditOutlined key="edit" style={{ color: '#215589' }} />
            </div>
          ),
        ]}
      >
        <Skeleton loading={loading} active>
          {isEditing ? (
            <CaseUpdate
              authState={JSON.parse(token)}
              caseData={caseData}
              setCasesData={props.setCasesData}
              casesData={props.casesData}
            />
          ) : (
            <>
              <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                Case Details
              </p>
              <p> Case ID: {caseData.case_id}</p>
              <p>Date: {caseData.hearing_date}</p>
              <p>
                Judge:
                <Link
                  style={{ color: '#215589', marginLeft: '5px' }}
                  to={`/judge/${caseData.judge_name}`}
                >
                  {caseData.judge_name}
                </Link>
              </p>
              <p>
                Initial Hearing:{' '}
                {caseData.initial_or_appellate ? 'True' : 'False'}
              </p>
              <p>Case Origin: {caseData.case_origin}</p>
              <p>Filed 1 Year: {caseData.check_for_one_year}</p>
              <br />
              <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                Client Specifics
              </p>
              <p>Nation of Origin: {caseData.nation_of_origin}</p>
              <p>
                Protected Grounds:{' '}
                {caseData.protected_ground ? 'True' : 'False'}
              </p>
              <p>Applicant Gender: {caseData.applicant_gender}</p>
              <p>
                Violence Experienced: {caseData.type_of_violence_experienced}
              </p>
              <br />
              <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                Results
              </p>
              <p>Case Outcome: {caseData.outcome}</p>
              <br />
            </>
          )}
        </Skeleton>
      </Card>
    </div>
  );
};

export default CaseOverview;
