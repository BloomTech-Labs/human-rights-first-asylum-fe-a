import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// This form is still missing all functionality
// Eventually it should upload a PDF and pre-fill the text areas with the relevant case information
// and the user can then edit as necessary and submit it to the table

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30rem',
      textAlign: 'center',
    },
  },
}));

export const UploadCase = () => {
  const classes = useStyles();

  const [isAdmin, setIsAdmin] = useState(false);

  const divStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '190vh',
    width: '100%',
  };

  const h1Styles = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#215589',
  };

  const buttonStyles = {
    color: '#ffffff',
    backgroundColor: '#BC541E',
  };

  const { handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  // const handleAdminTasks = () => {
  //   this.setState({isAdmin: true});
  // };

  // const handleUserTasks = () => {
  //   this.setState({isAdmin: false});
  // };

  return (
    <div style={divStyles}>
      <div className={classes.root}>
        <div className="form-header">
          <h1 style={h1Styles}>Upload a New Case</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pdf-upload">
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
              />
              <Button
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Choose Files
              </Button>
            </label>
          </div>
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
          <div className="decision-date">
            <label htmlFor="decision-date">
              <TextField
                id="decision-date"
                label="Decision Date"
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
          <div className="court-type">
            <label htmlFor="court-type">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Court Type"
                name="Court Type"
              />
            </label>
          </div>
          <div className="hearing-type">
            <label htmlFor="hearing-type">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Hearing Type"
                name="Hearing Type"
              />
            </label>
          </div>
          <div className="refugee-origin">
            <label htmlFor="refugee-origin">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Refugee Origin"
                name="Refugee Origin"
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
              />
            </label>
          </div>
          <div className="social-group">
            <label htmlFor="social-group">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Social Group"
                name="Social Group"
              />
            </label>
          </div>
          <div className="location">
            <label htmlFor="location">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Location"
                name="Location"
              />
            </label>
          </div>
          <div className="refugee-credibility">
            <label htmlFor="refugee-credibility">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Refugee Credibility"
                name="Refugee Credibility"
              />
            </label>
          </div>
          <div className="judge-name">
            <label htmlFor="judge-name">
              <TextField
                multiline={true}
                type="text"
                variant="outlined"
                placeholder="Judge Name"
                name="Judge Name"
              />
            </label>
          </div>
          <div className="decision">
            <label htmlFor="decision">
              <TextField
                multiline={true}
                variant="outlined"
                placeholder="Decision"
                name="Decision"
              />
            </label>
          </div>
          <div className="case-status">
            <label htmlFor="case-status">
              <TextField
                multiline={true}
                variant="outlined"
                placeholder="Case Status"
                name="Case Status"
              />
            </label>
          </div>

          <div className="submit-button">
            <Button
              className="btn-upload"
              style={buttonStyles}
              variant="contained"
              component="span"
            >
              Submit
            </Button>
          </div>
          <br />

          {isAdmin && (
            <>
              <div className="approve-button">
                <Button
                  className="btn-upload"
                  style={buttonStyles}
                  variant="contained"
                  component="span"
                >
                  Approve
                </Button>
              </div>
              <br />
              <div className="reject-button">
                <Button
                  className="btn-upload"
                  style={buttonStyles}
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
  );
};
