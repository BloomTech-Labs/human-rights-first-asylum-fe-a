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
        <TabPane tab="Case View" key="1"></TabPane>
        <TabPane tab="Judge View" key="2"></TabPane>
      </TabsY>
    </TabDiv>
  );
}

export default Tabs;

// Old Tabs replaced by ANT.DISIGN

// const TabItemLeft = styled.button`
//   padding: 0.6em 1em;
//   background: ${props => (props.showCaseTable ? '#215589' : '#7f9bb3')};
//   border: 1px solid black;
//   border-top-left-radius: 20px;
//   outline: none;
//   width: 50%;
//   color: white;
//   font-size: 1.1em;
//   padding: 5%;

//   &:hover {
//     transform: scaleY(1.1) translateY(-2px);
//   }
// `;
// const TabItemRight = styled.button`
//   padding: 0.6em 1em;
//   background: ${props => (props.showCaseTable ? '#215589' : '#7f9bb3')};
//   border: 1px solid black;
//   border-top-right-radius: 20px;
//   outline: none;
//   width: 50%;
//   color: white;
//   font-size: 1.1em;
//   padding: 5%;
//   &:hover {
//     transform: scaleY(1.1) translateY(-2px);
//   }
// `;
// function Tabs({ setShowCaseTable, showCaseTable }) {
//   return (
//     <TabDiv>
//       <TabItemLeft
//         showCaseTable={showCaseTable}
//         onClick={() => setShowCaseTable(true)}
//       >
//         Case View
//       </TabItemLeft>
//       <TabItemRight
//         showCaseTable={!showCaseTable}
//         onClick={() => setShowCaseTable(false)}
//       >
//         Judge View
//       </TabItemRight>
//     </TabDiv>
//   );
// }
