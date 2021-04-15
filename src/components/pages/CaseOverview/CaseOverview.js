import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Skeleton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Container } from './CaseOverviewStyled';

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
    <Container>
      {caseData && (
        <>
          <Card
            style={{ width: 500, fontWeight: 'normal' }}
            actions={[
              <div
                onClick={() => history.push(`/case/${caseData.case_id}/update`)}
              >
                <EditOutlined key="edit" />
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
                  style={{ color: '#215589' }}
                  to={`/judge/${caseData.judge_name}`}
                >
                  {' '}
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
              {/* <Button>Edit</Button> */}
            </Skeleton>
          </Card>
        </>
      )}
    </Container>
  );
};

// These are just styled components see CaseOverviewStyled.js for editing
{
  /* // <Container> */
}
{
  /* /* {caseData && ( */
}
//     <>
//       <CaseSpecs>
//         {/* Link to updateCase page, this page is not yet operational
//         backend endpoints need to be built out to allow page to render & send updates to the database */}
//         <Button
//           type="primary"
//           size="small"
//           padding="15px"
//           onClick={`/case/${caseData.id}/update`}
//         >
//           Update this Case
//         </Button>
//         <KeyParagraphBold>Case ID: {caseData.case_id}</KeyParagraphBold>
//         Case Specifics
//         <KeyParagraph>Case Status: {caseData.case_status}</KeyParagraph>
//         <KeyParagraph>Date: {caseData.hearing_date}</KeyParagraph>
//         <KeyParagraph>Location: {caseData.case_origin}</KeyParagraph>
//         <KeyParagraph>
//           Type of Hearing: {caseData.hearing_type}
//         </KeyParagraph>
//         <KeyParagraph>
//           Judge:
//           <Link to={`/judge/${caseData.judge_name}`}>
//             {caseData.judge_name}
//           </Link>
//         </KeyParagraph>
//         <KeyParagraph>Court Type: {caseData.court_type}</KeyParagraph>
//       </CaseSpecs>
//       <ClientSpecs>
//         Client Specifics
//         <ValueParagraph>Origin: {caseData.nation_of_origin}</ValueParagraph>
//         <ValueParagraph>
//           Application Type : {caseData.application_type}
//         </ValueParagraph>
//         <ValueParagraph>
//           Protected Grounds: {caseData.protected_ground}
//         </ValueParagraph>
//         <ValueParagraph>
//           Credibility: {caseData.credibility_of_refugee}
//         </ValueParagraph>
//       </ClientSpecs>
//       <Results>
//         Results
//         <KeyParagraph>Decision Date: {caseData.decision_date}</KeyParagraph>
//         <KeyParagraph>Case Outcome: {caseData.case_outcome}</KeyParagraph>
//       </Results>
//     </>
//   )}
// </Container>
// );
// };

export default CaseOverview;
