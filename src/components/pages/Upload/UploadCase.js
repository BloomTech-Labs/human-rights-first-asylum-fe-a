import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

  const divStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '140vh',
    width: '100%',
  };

  const h1Styles = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
  };

  const buttonStyles = {
    width: '5rem',
    height: '2rem',
    color: 'black',
  };

  const { handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

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
              color="primary"
              variant="contained"
              component="span"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
