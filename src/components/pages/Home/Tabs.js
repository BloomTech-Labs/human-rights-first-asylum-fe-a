import React, { useState, useEffect, useMemo } from 'react';
import { Tabs as TabsY } from 'antd';
import styled from 'styled-components';

const { TabPane } = TabsY;

const TabDiv = styled.div`
  margin: 0 5% 0 0;
  width: 20%;
  height: 56px;
`;

function Tabs({ setShowCaseTable, showCaseTable }) {
  function cb(key) {
    // Checks if the tab selected is the case view (1), and sets the state accordingly, ensuring that you are swapped to the view when the tabs change
    if (key === '1') {
      setShowCaseTable(true);
    } else {
      setShowCaseTable(false);
    }
  }
  return (
    <TabDiv>
      <TabsY
        onChange={cb}
        type="line"
        activeKey={showCaseTable ? '1' : '2'}
        size={'large'}
        tabBarStyle={{ color: '#7f9bb3' }}
      >
        <TabPane tab="Case View" key="1" />
        <TabPane tab="Judge View" key="2" />
      </TabsY>
    </TabDiv>
  );
}

export default Tabs;
