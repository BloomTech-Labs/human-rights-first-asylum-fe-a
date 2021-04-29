import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
  },
  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },
  buttonStyles: {
    color: '#ffffff',
    backgroundColor: '#215589',
    marginTop: '3%',
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      <Link to={`edit-user/${hrfUserInfo.id}`}>
        <Button className={classes.buttonStyles}>Edit</Button>
      </Link>
    </div>
  );
};

export default AccountPage;
