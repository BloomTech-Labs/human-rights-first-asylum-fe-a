import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Collapse, Descriptions } from 'antd';
import { Form, Input, Button as AntDButton, Modal, Select } from 'antd';
import Icon from '@ant-design/icons';
import OrangeLine from '../../../styles/orange-line.svg';
import PendingUsers from './PendingUsers';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  role: '',
};

const { Option } = Select;

const ManageUsersPage = props => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { authState } = props;
  const [profiles, setProfiles] = useState([]);

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/profiles`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        setProfiles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [authState.idToken.idToken]);

  const deleteUser = profile => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/profiles/${profile.user_id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        alert(`${profile.first_name}'s profile was deleted`);
        console.log(res.data);
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

  const postNewUser = newUser => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/profile/`, newUser, {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
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
    console.log(newUser);
    postNewUser(newUser);
  };

  return (
    <>
      <Title level={2}> Manage Users </Title>
      <Collapse defaultActiveKey={['0']} accordion>
        {profiles.map(item => {
          return (
            <Panel header={`${item.first_name} ${item.last_name}`}>
              <Descriptions title="User Info">
                <Descriptions.Item label="Name">
                  {`${item.first_name} ${item.last_name}`}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {item.email}
                </Descriptions.Item>
                <Descriptions.Item label="Role">{item.role}</Descriptions.Item>
                <Descriptions.Item label="Joined">
                  {String(item.created_at).slice(0, 10)}
                </Descriptions.Item>
              </Descriptions>
              <Link to={`edit-user/${item.user_id}`}>
                <AntDButton>Edit</AntDButton>
              </Link>
              <AntDButton
                onClick={() => {
                  deleteUser(item);
                }}
              >
                Delete
              </AntDButton>
            </Panel>
          );
        })}
      </Collapse>
      <PendingUsers authState={authState} />
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

            <Form.Item name="role" label="Role">
              <Select placeholder="Select a role" onChange={onChange}>
                <Option value="user">User</Option>
                <Option value="moderator">Moderator</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ManageUsersPage;
