import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Button } from 'antd';
import './_SideDrawer.less';

import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

function SideDrawer() {
  const [collapsed, setCollapsed] = useState(false);

  const role = window.localStorage.getItem('role');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const history = useHistory();

  const handleRoute = ({ key }) => {
    if (key) {
      history.push(`${key}`);
    }
  };

  return (
    <div style={{ width: 246, height: '100vh' }}>
      <Menu
        defaultSelectedKeys={['/']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        onClick={handleRoute}
        style={{ backgroundColor: '#F4F6F7', height: '100vh' }}
      >
        <Button
          onClick={toggleCollapsed}
          type="primary"
          style={{
            marginBottom: 16,
            backgroundColor: '#f4f6f7',
            marginLeft: 16,
            color: '#2a5c8d',
          }}
        >
          {React.createElement(
            collapsed ? DoubleRightOutlined : DoubleLeftOutlined
          )}
        </Button>

        <Menu.Item className="home" key="/">
          Home
        </Menu.Item>

        <Menu.Item className="cases" key="/cases">
          Cases
        </Menu.Item>

        <Menu.Item className="judges" key="/judges">
          Judges
        </Menu.Item>

        <Menu.Item className="my-cases" key="/my-cases">
          My Cases
        </Menu.Item>

        <SubMenu
          key="saved"
          className="saved-submenu"
          title="Saved"
          style={{ backgroundColor: '#F4F6F7', paddingRight: 30 }}
        >
          <Menu.Item key="/saved-cases">Saved Cases</Menu.Item>
          <Menu.Item key="/saved-judges">Saved Judges</Menu.Item>
        </SubMenu>

        {role === 'moderator' || role === 'admin' ? (
          <>
            <SubMenu
              key="admin-tools"
              title="Admin Tools"
              className="admin-tools-submenu"
              style={{ backgroundColor: '#F4F6F7', paddingRight: 30 }}
            >
              <Menu.Item key="/add-users">Add Users</Menu.Item>
              <Menu.Item key="/manage-users">Manage Users</Menu.Item>
              <Menu.Item key="/add-faq">Add FAQ</Menu.Item>
              <Menu.Item key="/manage-faq">Manage FAQ</Menu.Item>
              <Menu.Item key="/manage-requested">
                Review Requested Users
              </Menu.Item>
            </SubMenu>

            <Menu.Item className="review-cases" key="/manage-cases">
              Review Cases
            </Menu.Item>
          </>
        ) : null}
      </Menu>
    </div>
  );
}

export default SideDrawer;
