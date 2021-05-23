import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import { Button as AntDButton, Collapse, Descriptions } from 'antd';

const PendingUsersPage = props => {
  const { Panel } = Collapse;
  const { authState } = props;
  const [pendingProfiles, setPendingProfiles] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/profiles/pending`, {
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
    axiosWithAuth()
      .post(`/profile/`, profile, {
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
    axiosWithAuth()
      .delete(`/profiles/pending/${profile.id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
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
      <h2> Manage Pending Users </h2>
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
