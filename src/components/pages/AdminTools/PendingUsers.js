import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Button as AntDButton, Collapse, Descriptions } from 'antd';

// Styles and Icons
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const PendingUsersPage = props => {
  const { Panel } = Collapse;
  const { authState, setProfiles } = props;
  const [pendingProfiles, setPendingProfiles] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/profiles/pending`)
      .then(res => {
        setPendingProfiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  const approveUser = profile => {
    console.log(profile);
    axiosWithAuth()
      .post(`/profile/`, profile)
      .then(res => {
        alert(`Profile request from ${profile.email} was approved`);
        console.log(res.data);
        setProfiles(res.data.profile);
        setPendingProfiles(
          pendingProfiles.filter(
            pendingProfile => pendingProfile.user_id !== profile.user_id
          )
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejectUser = profile => {
    axiosWithAuth()
      .delete(`/profiles/pending/${profile.id}`)
      .then(res => {
        alert(`Profile request from ${profile.email} was rejected`);
        console.log(res.data);
        setPendingProfiles(
          pendingProfiles.filter(
            pendingProfile => pendingProfile.user_id !== profile.user_id
          )
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="users">
      <h2 className="users-header"> Pending Users </h2>
      <p className="divider">
        <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
      </p>
      <Collapse accordion>
        {pendingProfiles.map(item => {
          return (
            <Panel
              className="item-name"
              header={`${item.first_name} ${item.last_name}`}
            >
              <Descriptions className="user-info-title" title="User Info">
                <Descriptions.Item className="user-details" label="Name">
                  <p className="detail">{`${item.first_name} ${item.last_name}`}</p>
                </Descriptions.Item>

                <Descriptions.Item className="user-details" label="Email">
                  <p className="detail">{item.email}</p>
                </Descriptions.Item>

                <Descriptions.Item className="user-details" label="Role">
                  <p className="detail">{item.role}</p>
                </Descriptions.Item>

                <Descriptions.Item
                  className="user-details"
                  label="Date Requested"
                >
                  <p className="detail">
                    {String(item.created_at).slice(0, 10)}
                  </p>
                </Descriptions.Item>
              </Descriptions>
              <div className="buttons">
                <AntDButton
                  className="btn-style"
                  onClick={() => {
                    console.log(item);
                    approveUser(item);
                  }}
                >
                  Approve
                </AntDButton>
                <AntDButton
                  className="btn-style"
                  onClick={() => {
                    rejectUser(item);
                  }}
                >
                  Reject
                </AntDButton>
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default PendingUsersPage;
