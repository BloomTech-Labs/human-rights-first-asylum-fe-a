import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './_SideDrawer.less';
const { SubMenu } = Menu;

function SideDrawer() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = window.localStorage.getItem('role_name');

  const history = useHistory();

  const handleRoute = ({ key }) => {
    if (key) {
      history.push(`${key}`);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={{ width: '200px', height: '100vh', position: 'fixed' }}>
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        theme="light"
        onClick={handleRoute}
        style={{
          backgroundColor: '#F4F6F7',
          height: '100vh',
          position: 'sticky',
        }}
        inlineCollapsed={isCollapsed}
        className="sideDrawerMenu"
      >
        <Menu.Item className="home" key="/">
          Home
        </Menu.Item>

        <Menu.Item className="cases" key="/cases">
          Cases
        </Menu.Item>

        <Menu.Item className="judges" key="/judges">
          Judges
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

        <Menu.Item className="my-cases" key="/my-cases">
          My Cases
        </Menu.Item>

        {role === 'moderator' || role === 'admin' ? (
          <>
            <SubMenu
              key="admin-tools"
              title="Admin Tools"
              className="admin-tools-submenu"
              style={{ backgroundColor: '#F4F6F7', paddingRight: 30 }}
            >
              <Menu.Item key="/manage-users">Manage Users</Menu.Item>
              <Menu.Item key="/manage-faq">Manage FAQ</Menu.Item>
              <Menu.Item className="review-cases" key="/manage-cases">
                Review Cases
              </Menu.Item>
            </SubMenu>
          </>
        ) : null}
        <Button
          className="collapseButton"
          type="primary"
          onClick={toggleCollapse}
          shape="round"
        >
          {React.createElement(
            isCollapsed ? ArrowRightOutlined : ArrowLeftOutlined
          )}
        </Button>
      </Menu>
    </div>
  );
}

export default SideDrawer;
