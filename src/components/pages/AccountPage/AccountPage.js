import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar } from 'antd';

import './_AccountPageStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const AccountPage = props => {
  const { oktaUserInfo, hrfUserInfo } = props;

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="faq-header">My Account </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>

        <Card
          title={`${hrfUserInfo.first_name} ${hrfUserInfo.last_name}`}
          className="card"
        >
          <div className="card-contents">
            <Avatar className="avatar" size={110} shape="circle">
              User{hrfUserInfo.avatarUrl}
            </Avatar>
            <div className="user-info">
              <div className="info-line">
                <p className="p-1">Email: </p>
                <p className="p-2">{oktaUserInfo.email}</p>
              </div>

              <div className="info-line">
                <p className="p-1">Date joined:</p>
                <p className="p-2">
                  {String(hrfUserInfo.created_at).slice(0, 10)}
                </p>
              </div>

              <div className="info-line">
                <p className="p-1">Location: </p>
                <p className="p-2">{oktaUserInfo.zoneinfo}</p>
              </div>

              <div className="info-line">
                <p className="p-1">Role: </p>
                <p className="p-2">{hrfUserInfo.role}</p>
              </div>
            </div>
          </div>
          <div className="edit-btn">
            <Link to={`edit-user/${hrfUserInfo.user_id}`}>
              <Button className="edit-button">Edit</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
