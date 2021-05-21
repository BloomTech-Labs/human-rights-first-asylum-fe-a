import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Avatar } from 'antd';
import './AccountPage.css';

const AccountPage = props => {
  const { oktaUserInfo, hrfUserInfo } = props;

  return (
    <div className="accountRoot">
      <Card title="Account information" className="accountCard">
        <Avatar className="avatar" size={64} shape="square">
          User{hrfUserInfo.avatarUrl}
        </Avatar>
        <p>
          <strong>Email:</strong> {oktaUserInfo.email}
        </p>
        <p>
          <strong>Name:</strong>{' '}
          {`${hrfUserInfo.first_name} ${hrfUserInfo.last_name}`}
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
        <Link to={`edit-user/${hrfUserInfo.user_id}`}>
          <Button className="buttonStyles">Edit</Button>
        </Link>
      </Card>
    </div>
  );
};

export default AccountPage;
