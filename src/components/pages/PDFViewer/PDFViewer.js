import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import {
  PageControls,
  PageButton,
  PageWrapper,
  ClosePDF,
} from './PDFViewerStyled';

import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = props => {
  const history = useHistory();
  const pageHeight = props.pageHeight | '800'; // DEFINE HEIGHT OF PDF IN PIXELS (NUMBER ONLY)
  const pageWidth = props.pageWidth | null; // DEFINE WIDTH OF PDF IN PIXELS (NUMBER ONLY)
  const { componentWidth, componentHeight, location, setSmallPDF } = props; // DEFINE HEIGHT/WIDTH OF TOTAL COMPONENT IN ANY UNIT, ALSO GRABBING URL

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [disableButton, setDisableButton] = useState({
    left: true,
    right: false,
  });

  function adjustPage(direction) {
    if (direction === 'forward') {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    } else if (direction === 'back') {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    }
  }

  function togglePDFView() {
    if (/pdfviewer/.test(location.pathname)) {
      history.push('/');
    } else {
      history.push(`/pdfviewer/${1}`);
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (numPages === 1) {
      setDisableButton({
        left: true,
        right: true,
      });
    } else if (pageNumber === 1) {
      setDisableButton({
        left: true,
        right: false,
      });
    } else if (pageNumber === numPages) {
      setDisableButton({
        left: false,
        right: true,
      });
    } else {
      setDisableButton({
        left: false,
        right: false,
      });
    }
  }, [pageNumber]);

  return (
    <PageWrapper
      notFullScreen={props.notFullScreen}
      componentWidth={componentWidth}
      componentHeight={componentHeight}
    >
      <Document
        file={props.file} // ADD .CASE_URL TO ACCESS CASE URL ON FILE OBJECT
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          scale="1"
          width={pageWidth}
          height={pageHeight}
          pageNumber={pageNumber}
        />
        {props.notFullScreen ? (
          <ClosePDF
            onClick={event => {
              event.preventDefault();
              setSmallPDF(false);
            }}
          >
            <CloseIcon />
          </ClosePDF>
        ) : null}
        <PageControls
          notFullScreen={props.notFullScreen}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
        >
          <PageButton
            onClick={e => {
              e.preventDefault();
              adjustPage('back');
            }}
            disabled={disableButton.left}
          >
            <ArrowBackIosRoundedIcon />
          </PageButton>

          <PageButton
            onClick={event => {
              event.preventDefault();
              togglePDFView();
            }}
          >
            {/pdfviewer/.test(location.pathname) ? (
              <CloseIcon />
            ) : (
              <OpenInNewIcon />
            )}
          </PageButton>

          <PageButton
            onClick={e => {
              e.preventDefault();
              adjustPage('forward');
            }}
            disabled={disableButton.right}
          >
            <ArrowForwardIosRoundedIcon />
          </PageButton>
        </PageControls>
      </Document>
    </PageWrapper>
  );
};

export default PDFViewer;
