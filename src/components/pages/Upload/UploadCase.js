import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UploadCaseForm from './UploadCaseForm';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30rem',
      textAlign: 'center',
    },
  },

  uploadPage: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    padding: '1%',
    margin: '0 auto',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  leftDiv: {
    marginTop: '15%',
    width: '35%',
    display: 'inline-block',
    padding: '1%',
  },

  pdfUpload: {
    marginTop: '15%',
    display: 'inline-block',
    marginRight: '7.5%',
    width: '100%',
  },

  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },

  h2Styles: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    width: '100%',
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

const UploadCase = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const classes = useStyles();

  const postNewCase = newCase => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/upload/`, newCase)
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const { handleSubmit } = useForm();

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

  // endpoint to send file to backend
  const onFileChange = e => {
    const dataForm = new FormData();
    dataForm.append('target_file', e.target.files[0]);

    if (e.target.files.length === 0) {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URI}/upload/`, dataForm)
      .then(res => {
        setFormValues(res.data);
      })
      .catch(err => console.log(err));
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={classes.uploadPage}>
      {/* <div className={classes.root}> */}
      <div className={classes.leftDiv}>
        <div className={classes.pdfUpload}>
          <h1 className={classes.h1Styles}>The Case Uploader</h1>
          <h2 className={classes.h2Styles}>
            Upload PDF and wait for form on the right hand side to populate.
            Please, fill out any remaining empty or incorrect information on the
            form.
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pdf-upload">
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={onFileChange}
                />
                <Button
                  className={classes.buttonStyles}
                  variant="outlined"
                  component="span"
                >
                  Upload a case
                </Button>
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* <h2 className={classes.h2Styles}>Or, fill out form manually:</h2> */}
      <UploadCaseForm
        formValues={formValues}
        onInputChange={onInputChange}
        submit={onSubmit}
      />
    </div>
  );
};

export default UploadCase;
