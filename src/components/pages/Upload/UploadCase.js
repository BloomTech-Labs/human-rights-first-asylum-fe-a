import React, { useState } from 'react';
import axios from 'axios';
// import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import UploadCaseForm from './UploadCaseForm';
import CircularProgress from '@material-ui/core/CircularProgress';

import './CaseForm.css';

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
    display: 'flex',
    marginRight: '7.5%',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
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
  date: '',
  judge: '',
  case_outcome: '',
  country_of_origin: '',
  protegted_grounds: '',
  application_type: '',
  case_origin_city: '',
  case_origin_state: '',
  gender: '',
  applicant_language: '',
  indigenous_group: '',
  type_of_violence: '',
  initial_or_appelate: false,
  filed_in_one_year: false,
  credible: false,
};

// spinner for upload
const HRFBlueLoader = withStyles(() => ({
  root: {
    '& .MuiCircularProgress-circle': {
      color: '#215589',
    },
  },
}))(CircularProgress);

const UploadCase = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  // const postNewCase = newCase => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URI}/upload/`, newCase)
  //     .catch(err => console.log(err));
  //   setFormValues(initialFormValues);
  // };

  // const onSubmit = () => {
  //   const newCase = {
  //     case_url: formValues.case_url.trim(),
  //     hearing_date: formValues.hearing_date.trim(),
  //     judge: formValues.judge.trim(),
  //     initial_or_appellate: formValues.initial_or_appellate.trim(),
  //     // hearing_type: formValues.hearing_type.trim() (pending stakeholder approval),
  //     nation_of_origin: formValues.nation_of_origin.trim(),
  //     case_origin: formValues.case_origin.trim(),
  //     applicant_perceived_credibility: formValues.applicant_perceived_credibility.trim(),
  //     case_outcome: formValues.case_outcome.trim(),
  //     applicant_gender: formValues.applicant_gender.trim(),
  //     applicant_indigenous_group: formValues.applicant_indigenous_group.trim(),
  //     applicant_language: formValues.applicant_language.trim(),
  //     type_of_violence_experienced: formValues.type_of_violence_experienced.trim(),
  //     applicant_access_to_interpreter: formValues.applicant_access_to_interpreter.trim(),
  //     protected_ground: formValues.protected_ground.trim(),
  //     application_type: formValues.application_type.trim(),
  //     case_filled_within_one_year: formValues.case_filled_within_one_year.trim(),
  //     // case_status: formValues..trim() (pending stakeholder approval),
  //   };
  //   postNewCase(newCase);
  // };

  // endpoint to send file to backend
  const onFileChange = e => {
    const dataForm = new FormData();
    dataForm.append('target_file', e.target.files[0]);

    if (e.target.files.length === 0) {
      return;
    }

    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URI}/upload/`, dataForm)
      .then(res => {
        console.log(res);
        setFormValues(res.data);
        setIsLoading(false);
        alert('Case uploaded successfully');
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
            Select a case PDF to upload. Once the case finishes uploading,
            please make any necessary corrections before submitting.
          </h2>
          <form>
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
                  <p className="button-text">Select case file</p>
                </Button>
              </label>
              <>
                {isLoading ? (
                  <div className="spinner_container">
                    <HRFBlueLoader />
                  </div>
                ) : (
                  <p />
                )}
              </>
            </div>
          </form>
        </div>
      </div>
      {/* <h2 className={classes.h2Styles}>Or, fill out form manually:</h2> */}
      <UploadCaseForm
        formValues={formValues}
        onInputChange={onInputChange}
        // submit={onSubmit}
      />
    </div>
  );
};

export default UploadCase;
