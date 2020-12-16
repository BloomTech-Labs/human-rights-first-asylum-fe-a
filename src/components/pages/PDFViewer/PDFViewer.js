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
  const { componentWidth, componentHeight } = props; // DEFINE HEIGHT/WIDTH OF TOTAL COMPONENT IN ANY UNIT

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

  function openFullPDF() {
    history.push(`/pdfviewer/${props.file.id}`);
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
      componentWidth={componentWidth}
      componentHeight={componentHeight}
    >
      <Document
        file={props.file.case_url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width={pageWidth} height={pageHeight} pageNumber={pageNumber} />
        <ClosePDF pageHeight={pageHeight} pageWidth={pageWidth}>
          <CloseIcon />
        </ClosePDF>
        <PageControls pageHeight={pageHeight} pageWidth={pageWidth}>
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
              openFullPDF();
            }}
          >
            <OpenInNewIcon />
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
