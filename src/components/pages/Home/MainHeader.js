import React from 'react';
import './_MainHeader.less';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import UploadCase from '../Upload/UploadCase';
import Icon from '@ant-design/icons';
import Profile from '../../../styles/icons/profile.svg';
import HRFLogo from '../../../styles/HRFlogo.png';
import Notifications from './Notifications';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Uploaded Case',
    text: 'Successfully uploaded case #12345.',
  },
  {
    id: '2',
    title: 'User registration',
    text: 'A new user has requested to join the application.',
  },
  {
    id: '3',
    title: 'Judge Report',
    text: 'A judge you follow has handed down a decision',
  },
];

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

  const onClickViewNotification = id => {
    alert(`View notification id: '${id}'`);
  };

  const onClickDismissNotification = id => {
    alert(`Dismiss notification id: '${id}'`);
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
        <Notifications
          notifications={MOCK_NOTIFICATIONS}
          onClickView={onClickViewNotification}
          onClickDismiss={onClickDismissNotification}
        />
        <Dropdown className="account-drop-down" overlay={menu}>
          <ul className="accounts" onClick={e => e.preventDefault()}>
            <div className="user-button">
              <Icon
                component={() => (
                  <img id="avatar-icon" src={Profile} alt="profile icon" />
                )}
              />
            </div>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
