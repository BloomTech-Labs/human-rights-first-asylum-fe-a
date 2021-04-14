import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

export const SideDrawerAnt = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Cases</p>
        <p>Judges</p>
        <p>Upload Case</p>
        <p>Saved Cases</p>
        <p>Saved Judges</p>
      </Drawer>
    </>
  );
};
