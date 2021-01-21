// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { pdfjs } from 'react-pdf';
// import { Document, Page } from 'react-pdf';
// import {
//   PageControls,
//   PageButton,
//   PageWrapper,
//   ClosePDF,
// } from './PDFViewerStyled';

// import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
// import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import CloseIcon from '@material-ui/icons/Close';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const PDFViewer = props => {
//   const history = useHistory();
//   const pageHeight = props.pageHeight | '800'; // DEFINE HEIGHT OF PDF IN PIXELS (NUMBER ONLY)
//   const pageWidth = props.pageWidth | null; // DEFINE WIDTH OF PDF IN PIXELS (NUMBER ONLY)
//   const { componentWidth, componentHeight, location, setSmallPDF } = props; // DEFINE HEIGHT/WIDTH OF TOTAL COMPONENT IN ANY UNIT, ALSO GRABBING URL

//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [disableButton, setDisableButton] = useState({
//     left: true,
//     right: false,
//   });

//   function adjustPage(direction) {
//     if (direction === 'forward') {
//       if (pageNumber < numPages) {
//         setPageNumber(pageNumber + 1);
//       }
//     } else if (direction === 'back') {
//       if (pageNumber > 1) {
//         setPageNumber(pageNumber - 1);
//       }
//     }
//   }

//   function togglePDFView() {
//     if (/pdfviewer/.test(location.pathname)) {
//       history.push('/');
//     } else {
//       history.push(`/pdfviewer/${1}`);
//     }
//   }

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   useEffect(() => {
//     if (numPages === 1) {
//       setDisableButton({
//         left: true,
//         right: true,
//       });
//     } else if (pageNumber === 1) {
//       setDisableButton({
//         left: true,
//         right: false,
//       });
//     } else if (pageNumber === numPages) {
//       setDisableButton({
//         left: false,
//         right: true,
//       });
//     } else {
//       setDisableButton({
//         left: false,
//         right: false,
//       });
//     }
//   }, [pageNumber, numPages]);

//   return (
//     <PageWrapper
//       notFullScreen={props.notFullScreen}
//       componentWidth={componentWidth}
//       componentHeight={componentHeight}
//     >
//       <Document
//         file={props.file} // ADD .CASE_URL TO ACCESS CASE URL ON FILE OBJECT
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page
//           scale={1}
//           width={pageWidth}
//           height={pageHeight}
//           pageNumber={pageNumber}
//         />
//         {props.notFullScreen ? (
//           <ClosePDF
//             onClick={event => {
//               event.preventDefault();
//               setSmallPDF(false);
//             }}
//           >
//             <CloseIcon />
//           </ClosePDF>
//         ) : null}
//         <PageControls
//           notFullScreen={props.notFullScreen}
//           pageHeight={pageHeight}
//           pageWidth={pageWidth}
//         >
//           <PageButton
//             onClick={e => {
//               e.preventDefault();
//               adjustPage('back');
//             }}
//             disabled={disableButton.left}
//           >
//             <ArrowBackIosRoundedIcon />
//           </PageButton>

//           <PageButton
//             onClick={event => {
//               event.preventDefault();
//               togglePDFView();
//             }}
//           >
//             {/pdfviewer/.test(location.pathname) ? (
//               <CloseIcon />
//             ) : (
//               <OpenInNewIcon />
//             )}
//           </PageButton>

//           <PageButton
//             onClick={e => {
//               e.preventDefault();
//               adjustPage('forward');
//             }}
//             disabled={disableButton.right}
//           >
//             <ArrowForwardIosRoundedIcon />
//           </PageButton>
//         </PageControls>
//       </Document>
//     </PageWrapper>
//   );
// };

// export default PDFViewer;

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
