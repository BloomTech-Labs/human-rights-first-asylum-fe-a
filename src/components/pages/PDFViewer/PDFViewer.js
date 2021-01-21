// This PDF modal is constructed using react-pdf-js (Different than react-pdf) and Ant Design (modal styling)
// The rest of the PDF functionality can be found on JudgeTable.js and CaseTable.js

import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import PDF from 'react-pdf-js';
import { Footer, PDFWrapper } from './PDFViewerStyled';

const PDFViewer = ({ pdf, onCancel, visible }) => {
  const [page, setPage] = useState(1); // This state enables us to control which page to view
  const [pages, setPages] = useState(null); // Enables us to keep track of total pages / current page
  const [scale, setScale] = useState(1); // State meant to zoom in and out of PDF

  // Handles any errors in case the PDF is unable to load
  const onDocumentError = err => {
    console.error('pdf viewer error:', err);
  };

  // Executed when PDF file is done being processed by PDF component
  const onDocumentComplete = numPages => {
    setPages(numPages);
  };

  // Provides functionality to next / previous buttons in footer
  const onPage = type => {
    var newPage = type ? page + 1 : page - 1;
    if (newPage > pages) {
      newPage = 1;
    } else if (newPage < 1) {
      newPage = pages;
    }
    setPage(newPage);
  };

  const zoomStyle = {
    marginLeft: 10,
    cursor: 'pointer',
  };

  const onSetScale = type => {
    var newScale = type ? scale + 0.1 : scale - 0.1;
    if (newScale > 2) {
      newScale = 2;
    } else if (newScale < 0.1) {
      newScale = 0.1;
    }
    setScale(newScale);
  };

  // Enabled functionality to navigate to the next or previous page, zoom in and out is not quite working
  const footer = (
    <Footer>
      <Button onClick={() => onPage(0)}>Previous</Button>
      <div>
        <span style={{ textAlign: 'center' }}>
          Page {page} of {pages}
        </span>
        <ZoomOutOutlined style={zoomStyle} onClick={() => onSetScale(0)} />
        <ZoomInOutlined style={zoomStyle} onClick={() => onSetScale(1)} />
        <span>{Math.round(scale * 100)}%</span>
      </div>
      <Button onClick={() => onPage(1)}>Next</Button>
    </Footer>
  );

  return (
    <Modal
      visible={visible} // Prop accepted by PDFViewer by code on JudgeTable.js / CaseTable.js
      onCancel={onCancel} // See above comment
      maskClosable={false}
      style={{ top: 20 }}
      width={'50%'}
      footer={footer}
      bodyStyle={{ height: 650, overflowY: 'auto' }}
    >
      <PDFWrapper>
        <PDF
          file={pdf}
          page={page} // This prop is passed from JudgeTable component
          onDocumentError={onDocumentError}
          onDocumentComplete={onDocumentComplete}
        />
      </PDFWrapper>
      <p style={{ textAlign: 'center' }}>
        Page {page} of {pages}
      </p>
    </Modal>
  );
};

export default PDFViewer;
