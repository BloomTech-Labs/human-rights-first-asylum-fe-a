import React, { useState } from 'react';
import { Button, Card, Avatar, Modal, Form, Input } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import './_AccountPageStyles.less';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
};

const AccountPage = props => {
  const { hrfUserInfo, setHrfUserInfo } = props;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const showEditModal = id => {
    axiosWithAuth()
      .get(`/profile/${id}`)
      .then(res => {
        console.log(res.data);
        const { first_name, last_name, email, user_id } = res.data;
        setFormValues({ first_name, last_name, email, user_id });
        setIsEditModalVisible(true);
      });
  };

  const handleOk = () => {
    setIsEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  // this axios call is what receives the data to be rendered on the Account Details page
  const updateUser = updatedUserInfo => {
    axiosWithAuth()
      .put(`/profile/${updatedUserInfo.user_id}`, updatedUserInfo)
      .then(res => {
        setHrfUserInfo(res.data.updated_profile);
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onEditSubmit = e => {
    e.preventDefault();
    const updatedUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      user_id: formValues.user_id.trim(),
    };
    updateUser(updatedUser);
    setIsEditModalVisible(false);
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="faq-header">My Account </h2>
        <div className="account-divider" />
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
                <p className="p-1">First: </p>
                <p className="p-2">{hrfUserInfo.first_name}</p>
              </div>
              <div className="info-line">
                <p className="p-1">Last: </p>
                <p className="p-2">{hrfUserInfo.last_name}</p>
              </div>
              <div className="info-line">
                <p className="p-1">Email: </p>
                <p className="p-2">{hrfUserInfo.email}</p>
              </div>
              {/* The three ternary operators below handle what the UI renders on the 'Role:' line of the Account Details page */}
              <div className="info-line">
                <p className="p-1">Role: </p>
                {hrfUserInfo.role_id === 1 ? (
                  <p className="p-2">admin</p>
                ) : (
                  <p className="p-2"></p>
                )}
                {hrfUserInfo.role_id === 2 ? (
                  <p className="p-2">moderator</p>
                ) : (
                  <p className="p-2"></p>
                )}
                {hrfUserInfo.role_id === 3 ? (
                  <p className="p-2">user</p>
                ) : (
                  <p className="p-2"></p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
