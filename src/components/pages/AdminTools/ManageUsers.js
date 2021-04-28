import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography, Collapse } from 'antd';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '7%',
    margin: '5% 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  p: {
    margin: '1%',
  },
  panal: {
    width: '40%',
  },
  buttonStyles: {
    color: '#ffffff',
    backgroundColor: '#215589',
    marginTop: '1%',
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
}));

const ManageUsersPage = props => {
  const { Title } = Typography;
  const { Panel } = Collapse;
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
      <div className={classes.panal}>
        <Title level={2}> Manage Users </Title>
        <Collapse defaultActiveKey={['0']} accordion>
          {profiles.map(item => {
            return (
              <Panel header={`${item.firstName} ${item.lastName}`}>
                <p>
                  <strong>Name:</strong> {`${item.firstName} ${item.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Role:</strong> {item.role}
                </p>
                <p>
                  <strong>Date joined:</strong>{' '}
                  {String(item.created_at).slice(0, 10)}
                </p>
                <div className={classes.buttons}>
                  <Link to={`edit-user/${item.id}`}>
                    <Button className={classes.buttonStyles}>Edit</Button>
                  </Link>
                  <Button
                    className={classes.buttonStyles}
                    onClick={() => {
                      deleteUser(item);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

export default ManageUsersPage;
