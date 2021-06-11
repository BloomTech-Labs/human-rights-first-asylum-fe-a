import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import {
  Form,
  Input,
  Button as AntDButton,
  Modal,
  Collapse,
  Descriptions,
  Radio,
} from 'antd';
import PendingUsers from './PendingUsers';

// Styling and Icons
import './_ManageUsersStyles.less';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  role: '',
};

const ManageUsersPage = props => {
  const { Panel } = Collapse;
  const { authState } = props;
  const [profiles, setProfiles] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    loadUsers();
  }, [authState.idToken.idToken]);

  const loadUsers = () => {
    axiosWithAuth()
      .get(`/profiles`)
      .then(res => {
        setProfiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteUser = profile => {
    axiosWithAuth()
      .delete(`/profiles/${profile.user_id}`)
      .then(res => {
        alert(`${profile.first_name}'s profile was deleted`);
        loadUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const showEditModal = id => {
    axiosWithAuth()
      .get(`/profile/${id}`)
      .then(res => {
        console.log(res.data);
        const { first_name, last_name, role, email, user_id } = res.data;
        setFormValues({ first_name, last_name, role, email, user_id });
        setIsEditModalVisible(true);
      });
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };
  const handleEditCancel = () => {
    setFormValues(initialFormValues);
    setIsEditModalVisible(false);
  };

  const postNewUser = newUser => {
    axiosWithAuth()
      .post(`/profile/`, newUser)
      .then(res => {
        loadUsers();
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const updateUser = updatedUser => {
    axiosWithAuth()
      .put(`/profile/${updatedUser.user_id}`, updatedUser)
      .then(res => {
        loadUsers();
      })
      .catch(err => console.log(err));
    setFormValues(initialFormValues);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
    };
    postNewUser(newUser);
    setIsModalVisible(false);
  };

  const onEditSubmit = e => {
    e.preventDefault();
    const updatedUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      user_id: formValues.user_id.trim(),
    };
    updateUser(updatedUser);
    setIsEditModalVisible(false);
  };

  return (
    <div className="users-container">
      <div className="users">
        <h2 className="users-header"> Manage Users </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
        <Collapse accordion>
          {profiles.map(item => {
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

                  <Descriptions.Item className="user-details" label="Joined">
                    <p className="detail">
                      {String(item.created_at).slice(0, 10)}
                    </p>
                  </Descriptions.Item>
                </Descriptions>
                <div className="buttons">
                  <AntDButton
                    className="btn-style"
                    onClick={() => showEditModal(item.user_id)}
                  >
                    Edit
                  </AntDButton>
                  <Modal
                    title=""
                    visible={isEditModalVisible}
                    onOk={handleEditOk}
                    onCancel={handleEditCancel}
                    footer={[
                      <div className="submit-button">
                        <AntDButton
                          htmlType="submit"
                          className="add-user-btn"
                          onClick={onEditSubmit}
                        >
                          <span>Submit</span>
                        </AntDButton>
                      </div>,
                    ]}
                  >
                    <Form
                      layout="vertical"
                      className="user-form"
                      onFinish={onSubmit}
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
                      <Radio.Group
                        onChange={onChange}
                        name="role"
                        value={formValues.role}
                        className="radio"
                      >
                        <Radio value="user">User</Radio>
                        <Radio value="moderator">Moderator</Radio>
                        <Radio value="admin">Admin</Radio>
                      </Radio.Group>
                    </Form>
                  </Modal>
                  <AntDButton
                    className="btn-style"
                    onClick={() => {
                      deleteUser(item);
                    }}
                  >
                    Delete
                  </AntDButton>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>

      <div className="add-user-btn-container">
        <AntDButton className="add-user-btn" onClick={showModal}>
          Add a User
        </AntDButton>
        <Modal
          title=""
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="submit-button">
              <AntDButton
                htmlType="submit"
                className="add-user-btn"
                onClick={onSubmit}
              >
                <span>Submit</span>
              </AntDButton>
            </div>,
          ]}
        >
          <Form layout="vertical" className="user-form" onFinish={onSubmit}>
            <h2 className="h1Styles">Add a User</h2>
            <p className="divider">
              <Icon
                component={() => <img src={OrangeLine} alt="divider icon" />}
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
            <Radio.Group
              onChange={onChange}
              name="role"
              value={formValues.role}
              className="radio"
            >
              <Radio value="user">User</Radio>
              <Radio value="moderator">Moderator</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form>
        </Modal>
      </div>

      <div className="pending-users-container">
        <PendingUsers authState={authState} setProfiles={setProfiles} />
      </div>
    </div>
  );
};

export default ManageUsersPage;
