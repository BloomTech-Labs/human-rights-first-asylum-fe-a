import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
  },
  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },
}));

const SupportPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.h1Styles}>Support</h1>
    </div>
  );
};

export default SupportPage;
