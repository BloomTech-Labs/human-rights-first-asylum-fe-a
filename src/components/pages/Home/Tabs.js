import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const TabDiv = styled.div`
  display: flex;
  margin: 0 10% 0 0;
  border: 1px solid black;
`;

const TabItem = styled.button`
  padding: 0.6em 1em;
  background: ${props => (props.showCaseTable ? 'blue' : '#3f51ff')};
  color: black;
  border: 1px solid black;
`;

function Tabs({ setShowCaseTable, showCaseTable }) {
  return (
    <TabDiv>
      <TabItem
        showCaseTable={showCaseTable}
        onClick={() => setShowCaseTable(true)}
      >
        View Cases
      </TabItem>
      <TabItem
        showCaseTable={!showCaseTable}
        onClick={() => setShowCaseTable(false)}
      >
        View Judges
      </TabItem>
    </TabDiv>
  );
}

export default Tabs;
