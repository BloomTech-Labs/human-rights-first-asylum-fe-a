import React, { useState } from 'react';
import { Button, Card, Avatar, Modal, Form, Input } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import './_AccountPageStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

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

  const updateUser = updatedUserInfo => {
    axiosWithAuth()
      .put(`/profile/${updatedUserInfo.user_id}`, updatedUserInfo)
      .then(res => {
        setHrfUserInfo(updatedUserInfo);
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
      role: hrfUserInfo.role
    };
    updateUser(updatedUser);
    setIsEditModalVisible(false);
  };

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
              <div className="info-line">
                <p className="p-1">Role: </p>
                <p className="p-2">{hrfUserInfo.role_name}</p>
              </div>
            </div>
          </div>
          <div className="edit-btn">
            <Button
              type="primary"
              className="btn-style"
              onClick={() => showEditModal(hrfUserInfo.user_id)}
            >
              Edit
            </Button>
            <Modal
              title=""
              visible={isEditModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <div className="submit-button">
                  <Button
                    htmlType="submit"
                    className="add-user-btn"
                    onClick={onEditSubmit}
                  >
                    <span>Submit</span>
                  </Button>
                </div>,
              ]}
            >
              <Form
                layout="vertical"
                className="user-form"
                onFinish={onEditSubmit}
              >
                <h2 className="h1Styles">Edit User</h2>
                <p className="divider">
                  <Icon
                    component={() => (
                      <img src={OrangeLine} alt="divider icon" />
                    )}
                  />
                </p>
                <Form.Item label="First Name">
                  <Input
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={onChange}
                    className="text-field"
                    placeholder="First Name"
                    value={formValues.first_name}
                  />
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={onChange}
                    className="text-field"
                    placeholder="Last Name"
                    value={formValues.last_name}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                    className="text-field"
                    value={formValues.email}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
