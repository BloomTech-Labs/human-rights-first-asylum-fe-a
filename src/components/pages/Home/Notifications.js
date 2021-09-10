import React from 'react';
import { Badge, Dropdown, List, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationListItem = props => {
  const { notification, onClickView, onClickDismiss } = props;

  const handleClick = key => {
    return evt => {
      evt.preventDefault();

      if (key === 'view') {
        return onClickView(notification.id);
      } else if (key === 'dismiss') {
        return onClickDismiss(notification.id);
      }
    };
  };

  return (
    <List.Item
      style={{
        padding: '0.5rem',
        marginBottom: '1rem',
      }}
      actions={[
        <a
          href="#"
          style={{ marginRight: '0.5rem' }}
          onClick={handleClick('view')}
        >
          View
        </a>,
        <a href="#" onClick={handleClick('dismiss')}>
          Dismiss
        </a>,
      ]}
    >
      <List.Item.Meta
        title={notification.title}
        description={notification.text}
      />
    </List.Item>
  );
};

export const NotificationsList = props => {
  const { notifications, onClickView, onClickDismiss } = props;
  return (
    <Menu
      style={{
        minWidth: '500px',
      }}
    >
      <List
        style={{
          padding: '1rem',
        }}
        dataSource={notifications}
        renderItem={notification => {
          return (
            <NotificationListItem
              notification={notification}
              onClickView={onClickView}
              onClickDismiss={onClickDismiss}
            />
          );
        }}
      />
    </Menu>
  );
};

export default function Notifications(props) {
  const { notifications, onClickDismiss, onClickView } = props;

  return (
    <Dropdown
      overlay={
        <NotificationsList
          notifications={notifications}
          onClickDismiss={onClickDismiss}
          onClickView={onClickView}
        />
      }
    >
      <Badge count={notifications.length}>
        <BellOutlined
          style={{
            fontSize: '2rem',
            paddingTop: '0.5rem',
            color: 'white',
          }}
        />
      </Badge>
    </Dropdown>
  );
}
