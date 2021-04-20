import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
}));

const PendingUsersPage = props => {
  const { authState } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Hello world</h1>
    </div>
  );
};

export default PendingUsersPage;
