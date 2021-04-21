import React from 'react';
import AddUsersPage from '../ManageUsers/AddUsers';
import PendingUsers from '../ManageUsers/PendingUsers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));

const ManageUsersPage = props => {
  const { authState } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AddUsersPage authState={authState} />
      <PendingUsers authState={authState} />
    </div>
  );
};

export default ManageUsersPage;
