import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const SaveCasesButton = styled.button`
  padding: 1%;
  border: none;
  background: ${props => (props.disabled ? '#7f9bb3' : '#215589')};
  border-radius: 8px;
  outline: none;
  width: 15%;
  color: white;
  font-size: larger;
  margin: 0 0 0 5%;
  font-weight: bold;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

function SaveCaseBtn({ selectedRows, bookmarkCases, text }) {
  return (
    <>
      <SaveCasesButton
        disabled={
          Object.keys(selectedRows).length === 0 ||
          selectedRows.rowIds.length === 0
            ? true
            : false
        }
        onClick={() => bookmarkCases(selectedRows.rowIds)}
      >
        {text}
      </SaveCasesButton>
    </>
  );
}

export default SaveCaseBtn;
