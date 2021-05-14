import React from 'react';
import HRFLogo from './HRFlogo.png';
import './_MainHeader.less';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function MainHeader(props) {
  const { logout } = props;
  const history = useHistory();

  const onClick = ({ key }) => {
    if (key === '/logout') {
      logout();
    } else {
      history.push(`${key}`);
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="/account">Account</Menu.Item>
      <Menu.Item key="/support">Support</Menu.Item>
      <Menu.Item key="/logout">Log Out</Menu.Item>
    </Menu>
  );
  return (
    <div className="site-page-header">
      <img src={HRFLogo} alt="HRF Logo" />
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <div className="user-button">
            <UserOutlined />
          </div>
        </a>
      </Dropdown>
    </div>
  );
}
