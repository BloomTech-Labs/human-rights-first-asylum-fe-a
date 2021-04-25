import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

const ManageUsersPage = props => {
  const { authState } = props;
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profiles`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        setProfiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  const deleteUser = profile => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/profiles/${profile.id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        alert(`${profile.name}'s profile was deleted`);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.h1Styles}>Manage Users</h1>
      <div>
        {profiles.map(profile => (
          <div className={classes.profile}>
            <p className={classes.p}>
              {' '}
              <strong>Email:</strong> {profile.email}
            </p>
            <p className={classes.p}>
              {' '}
              <strong>Name:</strong>{' '}
              {`${profile.firstName} ${profile.lastName}`}
            </p>
            <p className={classes.p}>
              <strong>Date requested:</strong>{' '}
              {String(profile.created_at).slice(0, 10)}
            </p>
            <Link to={`edit-user/${profile.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={() => {
                deleteUser(profile);
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsersPage;
