import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import UploadCaseForm from '../Upload/UploadCaseForm';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30rem',
      textAlign: 'center',
    },
  },

  uploadPage: {
    padding: '1%',
    margin: '0 auto',
    width: '80%',
  },

  buttonStyles: {
    color: '#ffffff',
    backgroundColor: '#215589',
    marginTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const initialFormValues = {
  case_url: '',
  hearing_date: '',
  judge: '',
  initial_or_appellate: '',
  // hearing_type: '' pending stakeholder approval,
  nation_of_origin: '',
  case_origin: '',
  applicant_perceived_credibility: '',
  case_outcome: '',
  applicant_gender: '',
  applicant_indigenous_group: '',
  applicant_language: '',
  type_of_violence_experienced: '',
  applicant_access_to_interpreter: '',
  protected_ground: [],
  application_type: [],
  case_filled_within_one_year: '',
  // case_status: '' pending stakeholder approval,
};

const ManageCases = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const classes = useStyles();

  const postNewCase = newCase => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/upload/`, newCase)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const [isApproved, setIsApproved] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [approvedQueue, setApprovedQueue] = useState([]);

  const approvedCases = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/manage/all`)
      .then(res => {
        console.log(res.data);
        setApprovedQueue(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const acceptCase = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/manage/approve`)
      .then(res => {
        console.log(res.data);
        setIsApproved(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const rejectCase = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/manage/reject`)
      .then(res => {
        console.log(res.data);
        setIsDenied(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    const newCase = {
      case_url: formValues.case_url.trim(),
      hearing_date: formValues.hearing_date.trim(),
      judge: formValues.judge.trim(),
      initial_or_appellate: formValues.initial_or_appellate.trim(),
      // hearing_type: formValues.hearing_type.trim() (pending stakeholder approval),
      nation_of_origin: formValues.nation_of_origin.trim(),
      case_origin: formValues.case_origin.trim(),
      applicant_perceived_credibility: formValues.applicant_perceived_credibility.trim(),
      case_outcome: formValues.case_outcome.trim(),
      applicant_gender: formValues.applicant_gender.trim(),
      applicant_indigenous_group: formValues.applicant_indigenous_group.trim(),
      applicant_language: formValues.applicant_language.trim(),
      type_of_violence_experienced: formValues.type_of_violence_experienced.trim(),
      applicant_access_to_interpreter: formValues.applicant_access_to_interpreter.trim(),
      protected_ground: formValues.protected_ground.trim(),
      application_type: formValues.application_type.trim(),
      case_filled_within_one_year: formValues.case_filled_within_one_year.trim(),
      // case_status: formValues..trim() (pending stakeholder approval),
    };
    postNewCase(newCase);
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(approvedCases, approvedQueue, isApproved, isDenied);

  return (
    <div className={classes.uploadPage}>
      <UploadCaseForm
        formValues={formValues}
        onInputChange={onInputChange}
        submit={onSubmit}
        acceptCase={acceptCase}
        rejectCase={rejectCase}
      />
    </div>
  );
};

export default ManageCases;
