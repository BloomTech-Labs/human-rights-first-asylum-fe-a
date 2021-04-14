import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportGenerator from './ExportGenerator.jsx';

const PDFExportButton = () => (
  <div>
    <PDFDownloadLink document={<ExportGenerator />} fileName="Testing.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading Document...' : 'PDF Ready For Export'
      }
    </PDFDownloadLink>
  </div>
);

export default PDFExportButton;
