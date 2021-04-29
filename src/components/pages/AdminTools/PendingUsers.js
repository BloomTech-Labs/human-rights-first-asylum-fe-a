import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
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
    width: '50%',
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

const PendingUsersPage = props => {
  const { Title } = Typography;
  const { Panel } = Collapse;
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
      <div className={classes.panal}>
        <Title level={2}> Manage Requested Users </Title>
        <Collapse defaultActiveKey={['0']} accordion>
          {pendingProfiles.map(item => {
            return (
              <Panel header={`${item.firstName} ${item.lastName}`}>
                <p>
                  <strong>Name:</strong> {`${item.firstName} ${item.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Role:</strong> (Defaults to User){' '}
                </p>
                <p>
                  <strong>Date requested:</strong>{' '}
                  {String(item.created_at).slice(0, 10)}
                </p>
                <div className={classes.buttons}>
                  <Button
                    className={classes.buttonStyles}
                    onClick={() => {
                      approveUser(item);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    className={classes.buttonStyles}
                    onClick={() => {
                      rejectUser(item);
                    }}
                  >
                    Reject
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

export default PendingUsersPage;
