import React from 'react';
import { Badge, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';

export const NotificationsList = props => {
  const { notifications } = props;
  return (
    <Menu>
      {notifications.map((notification, idx) => {
        return <Menu.Item key={idx}>{notification.text}</Menu.Item>;
      })}
    </Menu>
  );
};

export default function Notifications(props) {
  const { notifications } = props;

  return (
    <Dropdown overlay={<NotificationsList notifications={notifications} />}>
      <Badge count={notifications.length}>
        <BellOutlined
          style={{
            fontSize: '2rem',
          }}
        />
      </Badge>
    </Dropdown>
  );
}
