import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import {
  Form,
  Input,
  Button as AntDButton,
  Modal,
  Radio,
  Tabs,
  Table,
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
  role_id: '',
};

const ManageUsersPage = props => {
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
      .delete(`/profiles/${profiles.user_id}`)
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
    name === 'role_id'
      ? setFormValues({ ...formValues, [name]: parseInt(value) })
      : setFormValues({ ...formValues, [name]: value });
  };
  console.log(formValues);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const showEditModal = id => {
    axiosWithAuth()
      .get(`/profile/${id}`)
      .then(res => {
        console.log(res.data);
        const { first_name, last_name, role_id, email, user_id } = res.data;
        setFormValues({ first_name, last_name, role_id, email, user_id });
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
      role_id: formValues.role_id,
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
      role_id: formValues.role_id,
      user_id: formValues.user_id.trim(),
    };
    updateUser(updatedUser);
    setIsEditModalVisible(false);
  };
  const { TabPane } = Tabs;

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
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
      render: (_, profiles) => (
        <div className="detail">{String(profiles.created_at).slice(0, 10)}</div>
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, profiles) => (
        <AntDButton
          className="btn-style"
          id="profiles.user_id"
          onClick={() => {
            showEditModal(profiles.user_id);
          }}
        >
          Edit
        </AntDButton>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, profiles) => (
        <AntDButton
          className="btn-style"
          onClick={() => {
            deleteUser(profiles);
          }}
        >
          Delete
        </AntDButton>
      ),
    },
  ];

  return (
    <div className="users-container">
      <div className="users">
        <h2 className="users-header"> Manage Users </h2>
        <p className="divider">
          <Icon component={() => <img src={OrangeLine} alt="divider icon" />} />
        </p>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Manage Users" key="1">
          <Table
            columns={columns}
            dataSource={profiles}
            isModalVisible={isModalVisible}
          />
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
            <Form layout="vertical" className="user-form" onFinish={onSubmit}>
              <h2 className="h1Styles">Edit User</h2>
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
                name="role_id"
                value={formValues.role_id}
                className="radio"
              >
                <Radio value="3">User</Radio>
                <Radio value="2">Moderator</Radio>
                <Radio value="1">Admin</Radio>
              </Radio.Group>
            </Form>
          </Modal>
        </TabPane>
        <TabPane tab="Pending Users" key="2">
          <div className="pending-users-container">
            <PendingUsers authState={authState} setProfiles={setProfiles} />
          </div>
        </TabPane>
      </Tabs>
      <div className="add-user-btn-container">
        <AntDButton className="add-user" onClick={showModal}>
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
    </div>
  );
};
export default ManageUsersPage;
