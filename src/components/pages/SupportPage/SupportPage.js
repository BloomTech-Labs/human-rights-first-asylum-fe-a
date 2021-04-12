import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  form: {
    width: '40%',
  },
  faq: {
    width: '40%',
  },
  h4Styles: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  h2Styles: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    width: '100%',
  },
  textField: {
    width: '100%',
    margin: '0 auto',
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

const SupportPage = () => {
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h2 className={classes.h2Styles}> Contact Us </h2>
        <form>
          <label htmlFor="message">
            <TextField
              id="message"
              label="Message"
              type="text"
              variant="outlined"
              className={classes.textField}
            />
          </label>
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
        </form>
      </div>
      <div className={classes.faq}>
        <h2 className={classes.h2Styles}>FAQ</h2>
        <h4 className={classes.h4Styles}>Q: How do I upload a case?</h4>
        <p>
          A: You must have a case file PDF ready to be uploaded then our system
          pulls the necessary information from it to fill out a form for you to
          check and make sure it is correct. Someone else please write the real
          version of this!
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
