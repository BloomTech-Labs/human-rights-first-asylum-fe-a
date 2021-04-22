import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    margin: '5% 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  h1Styles: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    margin: '1%',
  },
}));

const PendingUsersPage = props => {
  const { authState } = props;
  const [pendingProfiles, setPendingProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profiles/pending`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        setPendingProfiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  const approveUser = profile => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/profile/`, profile, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        alert(`Profile request from ${profile.email} was approved`);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejectUser = profile => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/profiles/pending/${profile.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + authState.idToken.idToken,
          },
        }
      )
      .then(res => {
        alert(`Profile request from ${profile.email} was rejected`);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.h1Styles}>Manage Requested Users</h1>
      <div>
        {pendingProfiles.map(profile => (
          <div className={classes.profile}>
            <p className={classes.p}>
              {' '}
              <strong>Email:</strong> {profile.email}
            </p>
            <p className={classes.p}>
              {' '}
              <strong>First Name:</strong> {profile.firstName}
            </p>
            <p className={classes.p}>
              {' '}
              <strong>Last Name:</strong> {profile.lastName}
            </p>
            <p className={classes.p}>
              <strong>Date requested:</strong>{' '}
              {String(profile.created_at).slice(0, 10)}
            </p>
            <Button
              onClick={() => {
                approveUser(profile);
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                rejectUser(profile);
              }}
            >
              Reject
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingUsersPage;
