import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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

  editForm: {
    marginTop: '15%',
    padding: '1%',
    paddingRight: '10%',
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

  row: {
    fontSize: '1rem',
    display: 'flex',
    Margin: theme.spacing(2),
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [approvedQueue, setApprovedQueue] = useState([]);
  const { id } = useParams();

  // This implements the switch functionality on the form
  const [state, setState] = React.useState({
    applicantAccessToInterpreter: false,
    caseFiledWithinOneYear: false,
    applicantPerceivedCredibility: false,
    initialOrAppellate: false,
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const adminData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profile/${id}`)
      .then(res => {
        console.log(res.data);
        setIsAdmin(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const userData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profile/${id}`)
      .then(res => {
        console.log(res.data);
        setIsUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

  const { handleSubmit, errors } = useForm();
  const onSubmit = () => {};

  // endpoint to send file to backend
  const onFileChange = e => {
    const dataForm = new FormData();
    dataForm.append('target_file', e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URI}/upload/`, dataForm)
      .catch(err => console.log(err));
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // !!!!!! This is meant to settle warnings for unimplemented features !!!!!!
  console.log(
    isAdmin,
    isUser,
    isApproved,
    isDenied,
    approvedQueue,
    approvedCases,
    errors
  );

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
      <div className={classes.editForm}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes.h2Styles}>Or, fill out form manually:</h2>
            <div className="hearing-date">
              <label htmlFor="hearing-date">
                <TextField
                  id="hearing-date"
                  label="Hearing Date"
                  type="date"
                  variant="outlined"
                  defaultValue="2021-01-01"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </label>
            </div>
            <div className="judge">
              <label htmlFor="judge">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Judge"
                  name="Judge"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="case-outcome">
              <label htmlFor="case-outcome">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Case Outcome"
                  name="Case Outcome"
                  onChange={onInputChange}
                />
              </label>
            </div>
            {/* This change is pending approval from stakeholder
          <div className="hearing-type">
            <label htmlFor="hearing-type">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Hearing Type"
                name="Hearing Type"
                onChange={onInputChange}
              />
            </label>
          </div> */}
            <div className="nation-of-origin">
              <label htmlFor="nation-of-origin">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Nation of Origin"
                  name="Nation of Origin"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="protected-ground">
              <label htmlFor="protected-ground">
                <TextField
                  multiline={true}
                  variant="outlined"
                  name="Protected Ground"
                  placeholder="Protected Ground"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="application-type">
              <label htmlFor="application-type">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Application Type "
                  name="Application Type "
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="case-origin">
              <label htmlFor="case-origin">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Case Origin"
                  name="Case Origin"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="applicant-gender">
              <label htmlFor="applicant-gender">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Applicant Gender"
                  name="Applicant Gender"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="applicant-language">
              <label htmlFor="applicant-language">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Applicant Language"
                  name="Applicant Language"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="applicant-indigenous-group">
              <label htmlFor="applicant-indigenous-group">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Applicant Indigenous Group"
                  name="Applicant Indigenous Group"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="type-of-violence-experienced">
              <label htmlFor="type-of-violence-experienced">
                <TextField
                  multiline={true}
                  type="text"
                  variant="outlined"
                  placeholder="Type of Violence Experienced"
                  name="Type of Violence Experienced"
                  onChange={onInputChange}
                />
              </label>
            </div>
            <FormControl component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.applicantAccessToInterpreter}
                      onChange={handleChange}
                      name="applicantAccessToInterpreter"
                    />
                  }
                  label="Applicant Has Access To Interpreter"
                  labelPlacement="right"
                />
              </FormGroup>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.caseFiledWithinOneYear}
                      onChange={handleChange}
                      name="caseFiledWithinOneYear"
                    />
                  }
                  label="Case Filed Within The Past Year"
                  labelPlacement="right"
                />
              </FormGroup>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.initialOrAppellate}
                      onChange={handleChange}
                      name="initialOrAppellate"
                    />
                  }
                  label="Appellate Case"
                  labelPlacement="right"
                />
              </FormGroup>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.applicantPerceivedCredibility}
                      onChange={handleChange}
                      name="applicantPerceivedCredibility"
                    />
                  }
                  label="Applicant Is Perceived As Credibile"
                  labelPlacement="right"
                />
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>

            {userData && (
              <>
                <div className="submit-button">
                  <Button
                    className={classes.buttonStyles}
                    // style={buttonStyles}
                    variant="contained"
                    component="span"
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
            <br />
            {adminData && (
              <>
                <div className="approve-button">
                  <Button
                    onClick={acceptCase}
                    className={classes.buttonStyles}
                    // style={buttonStyles}
                    variant="contained"
                    component="span"
                  >
                    Approve
                  </Button>
                </div>
                <br />
                <div className="reject-button">
                  <Button
                    onClick={rejectCase}
                    className={classes.buttonStyles}
                    // style={buttonStyles}
                    variant="contained"
                    component="span"
                  >
                    Reject
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCase;
