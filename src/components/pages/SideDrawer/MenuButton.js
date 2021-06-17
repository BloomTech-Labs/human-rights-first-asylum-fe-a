import React from 'react';
import { Button } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

const MenuButton = ({ toggle, collapsed }) => {
  return (
    <Button type="primary" className="toggle-btn" onClick={toggle}>
      {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
    </Button>
  );
};

export default MenuButton;
