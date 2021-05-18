import React from 'react';
import HRFLogo from './HRFlogo.png';
import './_MainHeader.less';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';

import Icon from '@ant-design/icons';
import Profile from '../../../styles/icons/profile.svg';

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
      <Menu.Item className="account" key="/account">
        Account
      </Menu.Item>
      <Menu.Item className="support" key="/support">
        Support
      </Menu.Item>
      <Menu.Item className="log-out" key="/logout">
        Log Out
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="site-page-header">
      <img src={HRFLogo} alt="HRF Logo" width="350px" />
      <Dropdown className="drop-down" overlay={menu}>
        <ul className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <div className="user-button">
            <Icon component={() => <img src={Profile} alt="profile icon" />} />
          </div>
        </ul>
      </Dropdown>
    </div>
  );
}
