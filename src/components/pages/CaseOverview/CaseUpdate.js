import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from './CaseOverviewStyled';
const initialInfo = {
  case_status: '',
  hearing_date: '',
  hearing_location: '',
  hearing_type: '',
  judge_name: '',
  judge_decision: '',
  court_type: '',
  refugee_origin: '',
  social_group_type: '',
  protected_ground: '',
  credibility_of_refugee: '',
  decision_date: '',
};

const CaseUpdate = props => {
  const history = useHistory();
  const { id } = useParams();
  const [newCase, setNewCase] = useState(initialInfo);
  const { authState, caseData } = props;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/case/${id}`, {
        headers: {
          Authorization: 'Bearer ' + authState,
        },
      })
      .then(res => setNewCase(res.data))
      .catch(error => console.log(error));
  }, [id, authState]);

  const handleChange = event => {
    event.presists();
    let value = event.target.value;

    setNewCase({
      ...newCase,
      [event.target.name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URI}/case/${id}`, newCase)
      .then(res => {
        props.setCaseData([...props.caseData, res.data]);
        props.fetchCase();
        history.push('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      New Page
      {caseData && (
        <div>
          <h2>{props.id}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Case Status
              <input
                type="text"
                name="case_status"
                onChange={handleChange}
                value={caseData.case_status}
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="hearing_date"
                onChange={handleChange}
                value={caseData.hearing_date}
              />
            </label>
            <label>
              Location
              <input
                type="text"
                name="hearing_location"
                onChange={handleChange}
                value={caseData.hearing_location}
              />
            </label>
            <label>
              Type of Hearing
              <input
                type="text"
                name="hearing_type"
                onChange={handleChange}
                value={caseData.hearing_type}
              />
            </label>
            <label>
              Judge Name
              <input
                type="text"
                name="judge_name"
                onChange={handleChange}
                value={caseData.judge_name}
              />
            </label>
            <label>
              Court Type
              <input
                type="text"
                name="court_type"
                onChange={handleChange}
                value={caseData.court_type}
              />
            </label>
            <label>
              Client Origin
              <input
                type="text"
                name="refugee_origin"
                onChange={handleChange}
                value={caseData.refugee_origin}
              />
            </label>
            <label>
              Social Group
              <input
                type="text"
                name="social_group"
                onChange={handleChange}
                value={caseData.social_group_type}
              />
            </label>
            <label>
              Protected Grounds
              <input
                type="text"
                name="protected_ground"
                onChange={handleChange}
                value={caseData.protected_ground}
              />
            </label>
            <label>
              Credibility
              <input
                type="text"
                name="credibility_of_refugee"
                onChange={handleChange}
                value={caseData.credibility_of_refugee}
              />
            </label>
            <label>
              Decision Date
              <input
                type="date"
                name="decision_date"
                onChange={handleChange}
                value={caseData.decision_date}
              />
            </label>
            <label>
              Judge Decision
              <input
                type="text"
                name="judge_decision"
                onChange={handleChange}
                value={caseData.judge_decision}
              />
            </label>
          </form>
        </div>
      )}
    </Container>
  );
};

export default CaseUpdate;
