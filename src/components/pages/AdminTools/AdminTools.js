import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));

const AdminToolsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="add-users">Add Users</Link>
      <Link to="manage-requested">Review Requested Users</Link>
      <Link to="manage-users">Manage Users</Link>
    </div>
  );
};

export default AdminToolsPage;
