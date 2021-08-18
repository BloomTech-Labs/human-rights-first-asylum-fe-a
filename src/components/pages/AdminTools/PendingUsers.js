import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Button as AntDButton, notification, Table } from 'antd';

import { CheckCircleOutlined } from '@ant-design/icons';

const PendingUsersPage = props => {
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
  const successNotification = () => {
    notification.open({
      message: 'User Status',
      description: 'User added successfully!',
      top: 128,
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
    });
  };
  const approveUser = profile => {
    console.log(profile);
    successNotification();
    axiosWithAuth()
      .put(`/profile/${profile.user_id}`, profile)
      .then(res => {
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
      .delete(`/profiles/${profile.user_id}`)
      .then(res => {
        alert(`Profile request from ${profile.email} was rejected`);
        setPendingProfiles(
          pendingProfiles.filter(
            pendingProfile => pendingProfile.id !== profile.id
          )
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Date Requested',
      dataIndex: 'date requested',
      key: 'date requested',
      render: (_, pendingProfiles) => (
        <p className="detail">
          {String(pendingProfiles.created_at).slice(0, 10)}
        </p>
      ),
    },
    {
      title: 'Approve',
      key: 'approve',
      render: (_, pendingProfiles) => (
        <AntDButton
          className="btn-style"
          id="pendingProfiles.user_id"
          onClick={() => {
            approveUser(pendingProfiles);
          }}
        >
          Approve
        </AntDButton>
      ),
    },
    {
      title: 'Reject',
      key: 'reject',
      render: (_, pendingProfiles) => (
        <AntDButton
          className="btn-style"
          onClick={() => {
            rejectUser(pendingProfiles);
          }}
        >
          Reject
        </AntDButton>
      ),
    },
  ];

  return (
    <div className="users">
      <Table columns={columns} dataSource={pendingProfiles} />
    </div>
  );
};

export default PendingUsersPage;
