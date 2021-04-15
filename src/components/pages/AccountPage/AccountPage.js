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
        <strong>Okta name:</strong> {oktaUserInfo.name}
      </p>
      <p>
        <strong>HRF name:</strong> {hrfUserInfo.name}
      </p>
      <p>
        <strong>Date joined:</strong>{' '}
        {String(hrfUserInfo.created_at).slice(0, 10)}
      </p>
      <p>
        <strong>Location:</strong> {oktaUserInfo.zoneinfo}
      </p>
      {hrfUserInfo.is_admin === true ? (
        <p>
          <strong>Role:</strong> Admin
        </p>
      ) : (
        <p>
          <strong>Role:</strong> User
        </p>
      )}
    </div>
  );
};

export default AccountPage;
