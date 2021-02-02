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
      .put(`${process.env.REACT_APP_API_URI}/case/${id}/update`, newCase)
      .then(res => {
        props.setCaseData([...props.caseData, res.data]);
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
        </div>
      )}
    </Container>
  );
};

export default CaseUpdate;
