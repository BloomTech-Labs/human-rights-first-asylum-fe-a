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

const AccountPage = props => {
  const { oktaUserInfo, hrfUserInfo } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.h1Styles}>Account information</h1>
      <img src={hrfUserInfo.avatarUrl} alt="" />
      <p>
        <strong>Email:</strong> {oktaUserInfo.email}
      </p>
      <p>
        <strong>Name:</strong>{' '}
        {`${hrfUserInfo.firstName} ${hrfUserInfo.lastName}`}
      </p>
      <p>
        <strong>Date joined:</strong>{' '}
        {String(hrfUserInfo.created_at).slice(0, 10)}
      </p>
      <p>
        <strong>Location:</strong> {oktaUserInfo.zoneinfo}
      </p>
      <p>
        <strong>Role:</strong> {hrfUserInfo.role}
      </p>
    </div>
  );
};

export default AccountPage;
