import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const SaveCasesButton = styled.button`
  padding: 1%;
  background: #bc541e;
  border: 1px solid black;
  outline: none;
  width: 10%;
  color: white;
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
