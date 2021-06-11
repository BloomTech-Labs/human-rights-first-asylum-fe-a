import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportGenerator from './ExportGenerator.jsx';
import { LoadingOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';

const PDFExportButton = ({ fileName, caseData, viz }) => (
  <div>
    <PDFDownloadLink
      document={<ExportGenerator caseData={caseData} viz={viz} />}
      fileName={fileName}
      style={{ color: '#215589' }}
    >
      {({ blob, url, loading, error }) =>
        loading ? <LoadingOutlined /> : <DownloadOutlined />
      }
    </PDFDownloadLink>
  </div>
);

export default PDFExportButton;
