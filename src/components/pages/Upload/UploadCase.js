import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import UploadCaseForm from './UploadCaseForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
  case_number: '',
  case_url: '',
  date: '',
  judge: '',
  case_outcome: '',
  country_of_origin: '',
  protected_grounds: '',
  application_type: '',
  case_origin_city: '',
  case_origin_state: '',
  gender: '',
  applicant_language: '',
  indigenous_group: '',
  type_of_violence: '',
  initial_or_appellate: false,
  filed_in_one_year: false,
  credible: false,
  status: 'pending',
  uploaded: '',
};

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

  const successNotification = () => {
    notification.open({
      message: 'Upload Status',
      description: 'Case uploaded successfully!',
      top: 128,
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
    });
  };

  const failNotification = () => {
    notification.open({
      message: 'Upload Status',
      description:
        'There was an issue with the upload. Please try again and if the issue persists contact the site administrator.',
      top: 128,
      duration: 8,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    });
  };

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
        setFormValues(res.data);
        setIsLoading(false);
        successNotification();
      })
      .catch(() => {
        setIsLoading(false);
        failNotification();
      });
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={classes.uploadPage}>
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
      <UploadCaseForm formValues={formValues} onInputChange={onInputChange} />
    </div>
  );
};

export default UploadCase;
