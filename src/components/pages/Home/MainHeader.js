import React from 'react';
import './_MainHeader.less';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import UploadCase from '../Upload/UploadCase';
import Icon from '@ant-design/icons';
import Profile from '../../../styles/icons/profile.svg';
import HRFLogo from '../../../styles/HRFlogo.png';

export default function MainHeader(props) {
  const { logout, getPendingCases } = props;
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
      <img src={HRFLogo} alt="HRF Logo" />
      <div id="nav-flex-container">
        <UploadCase getPendingCases={getPendingCases} />
        <Dropdown className="account-drop-down" overlay={menu}>
          <ul className="accounts" onClick={e => e.preventDefault()}>
            <div className="user-button">
              <Icon component={() => <img id="avatar-icon" src={Profile} alt="profile icon" />} />
            </div>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
