import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Collapse, Descriptions } from 'antd';
import { Button as AntDButton } from 'antd';

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

  return (
    <>
      <Title level={2}> Manage Pending Users </Title>
      <Collapse defaultActiveKey={['0']} accordion>
        {pendingProfiles.map(item => {
          return (
            <Panel header={`${item.firstName} ${item.lastName}`}>
              <Descriptions title="User Info">
                <Descriptions.Item label="Name">
                  {`${item.firstName} ${item.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label="Role"> </Descriptions.Item>
                <Descriptions.Item label="Date Requsted">
                  {String(item.created_at).slice(0, 10)}
                </Descriptions.Item>
              </Descriptions>
              <AntDButton
                className="add-user-btn"
                onClick={() => {
                  approveUser(item);
                }}
              >
                Approve
              </AntDButton>
              <AntDButton
                className="add-user-btn"
                onClick={() => {
                  rejectUser(item);
                }}
              >
                Reject
              </AntDButton>
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
};

export default PendingUsersPage;
