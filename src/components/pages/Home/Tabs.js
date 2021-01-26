import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const TabItemLeft = styled.button`
  padding: 0.6em 1em;
  background: ${props => (props.showCaseTable ? '#215589' : '#7f9bb3')};
  border: 1px solid black;
  border-top-left-radius: 20px;
  outline: none;
  width: 50%;
  color: white;

  &:hover {
    transform: scaleY(1.1) translateY(-2px);
  }
`;
const TabItemRight = styled.button`
  padding: 0.6em 1em;
  background: ${props => (props.showCaseTable ? '#215589' : '#7f9bb3')};
  border: 1px solid black;
  border-top-right-radius: 20px;
  outline: none;
  width: 50%;
  color: white;

  &:hover {
    transform: scaleY(1.1) translateY(-2px);
  }
`;
const TabDiv = styled.div`
  display: flex;
  margin: 0 5% 0 0;
  width: 20%;
  height: 50px;
`;

function Tabs({ setShowCaseTable, showCaseTable }) {
  return (
    <TabDiv>
      <TabItemLeft
        showCaseTable={showCaseTable}
        onClick={() => setShowCaseTable(true)}
      >
        Case View
      </TabItemLeft>
      <TabItemRight
        showCaseTable={!showCaseTable}
        onClick={() => setShowCaseTable(false)}
      >
        Judge View
      </TabItemRight>
    </TabDiv>
  );
}

export default Tabs;
