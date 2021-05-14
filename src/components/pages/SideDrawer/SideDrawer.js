import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Button } from 'antd';

import {
  DotChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileDoneOutlined,
  ToolOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

// example path to images
import CaseIcon from '../../../styles/icons/case.svg';

const { SubMenu } = Menu;

function SideDrawer() {
  const [collapsed, setCollapsed] = useState(false);

  const role = window.localStorage.getItem('role');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const history = useHistory();
  const handleRoute = ({ key }) => {
    history.push(`${key}`);
  };

  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>

      <Menu
        defaultSelectedKeys={['none']}
        defaultOpenKeys={['saved']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={handleRoute}
      >
        <Menu.Item key="/" icon={<DotChartOutlined />}>
          Cases
        </Menu.Item>
        <Menu.Item key="/judges" icon={<PieChartOutlined />}>
          Judges
        </Menu.Item>
        <Menu.Item key="/my-cases" icon={<FolderOpenOutlined />}>
          My Cases
        </Menu.Item>
        <SubMenu key="saved" icon={<HistoryOutlined />} title="Saved">
          <Menu.Item key="/saved-cases">Saved Cases</Menu.Item>
          <Menu.Item key="/saved-judges">Saved Judges</Menu.Item>
        </SubMenu>
      </Menu>
      {role === 'moderator' || role === 'admin' ? (
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub2']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={handleRoute}
        >
          <SubMenu key="sub2" icon={<ToolOutlined />} title="Admin Tools">
            <Menu.Item key="/add-users">Add Users</Menu.Item>
            <Menu.Item key="/manage-users">Manage Users</Menu.Item>
            <Menu.Item key="/add-faq">Add FAQ</Menu.Item>
            <Menu.Item key="/manage-faq">Manage FAQ</Menu.Item>
            <Menu.Item key="/manage-requested">
              Review Requested Users
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/manage-cases" icon={<FileDoneOutlined />}>
            Review Cases
          </Menu.Item>
        </Menu>
      ) : null}
    </div>
  );
}

export default SideDrawer;
