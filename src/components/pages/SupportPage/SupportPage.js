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
  pStyles: {
    marginBottom: '1.5rem',
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
        <p className={classes.pStyles}>
          A: Please navigate to the "Upload Case" page via the menu to the left
          of your screen to upload your case files. Once your files are
          succesfully uploaded, our system will comb through them and extract
          the necessary information to then populate the form to the right of
          the screen on the case upload page for your final approval before
          completing your submission.
        </p>
        <h4 className={classes.h4Styles}>Q: Where does your data come from?</h4>
        <p className={classes.pStyles}>
          A: We aggregate data that you, the user, provide. We scrape the data
          from case files asylum attorneys upload from all over the country and
          display it for you in a neat, easily digestable package.
        </p>
        <h4 className={classes.h4Styles}>
          Q: I know other attorneys that could benefit from this application,
          how can they gain access?
        </h4>
        <p className={classes.pStyles}>A: currently invite only</p>
      </div>
    </div>
  );
};

export default SupportPage;
