import React, { useState } from 'react';
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

  editForm: {
    marginTop: '5%',
    padding: '1%',
    paddingRight: '10%',
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

const UploadCaseForm = props => {
  const { formValues, onInputChange, submit, acceptCase, rejectCase } = props;

  const classes = useStyles();

  // This implements the switch functionality on the form
  const [state, setState] = useState({
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

  const admin = window.localStorage.getItem('Admin');

  const { handleSubmit } = useForm();

  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  };

  return (
    <div className={classes.uploadPage}>
      {/* <div className={classes.root}> */}
      <div className={classes.editForm}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  value={formValues.hearing_date}
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
                  name="judge"
                  onChange={onInputChange}
                  value={formValues.judge}
                />
              </label>
            </div>
            <div className="case-outcome">
              <label htmlFor="case-outcome">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Case Outcome"
                  name="case_outcome"
                  onChange={onInputChange}
                  value={formValues.case_outcome}
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
                value={formValues.hearing_type}
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
                  name="nation_of_origin"
                  onChange={onInputChange}
                  value={formValues.nation_of_origin}
                />
              </label>
            </div>
            <div className="protected-ground">
              <label htmlFor="protected-ground">
                <TextField
                  multiline={true}
                  variant="outlined"
                  name="protected_ground"
                  placeholder="Protected Ground"
                  onChange={onInputChange}
                  value={formValues.protected_ground}
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
                  name="application_type"
                  onChange={onInputChange}
                  value={formValues.application_type}
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
                  name="case_origin"
                  onChange={onInputChange}
                  value={formValues.case_origin}
                />
              </label>
            </div>
            <div className="applicant-gender">
              <label htmlFor="applicant-gender">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Applicant Gender"
                  name="applicant_gender"
                  onChange={onInputChange}
                  value={formValues.applicant_gender}
                />
              </label>
            </div>
            <div className="applicant-language">
              <label htmlFor="applicant-language">
                <TextField
                  multiline={true}
                  variant="outlined"
                  placeholder="Applicant Language"
                  name="applicant_language"
                  onChange={onInputChange}
                  value={formValues.applicant_language}
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
                  name="applicant_indigenous_group"
                  onChange={onInputChange}
                  value={formValues.applicant_indigenous_group}
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
                  name="type_of_violence_experienced"
                  onChange={onInputChange}
                  value={formValues.type_of_violence_experienced}
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
                  label="Applicant Is Perceived As Credibility"
                  labelPlacement="right"
                />
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>

            {admin === 'false' ? (
              <>
                <div className="submit-button">
                  <Button
                    onClick={onSubmit}
                    className={classes.buttonStyles}
                    variant="contained"
                    component="span"
                  >
                    Submit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="approve-button">
                  <Button
                    onClick={acceptCase}
                    className={classes.buttonStyles}
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

export default UploadCaseForm;
