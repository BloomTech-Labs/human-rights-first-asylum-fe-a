import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportGenerator from './ExportGenerator.jsx';
import { LoadingOutlined } from '@ant-design/icons';

const PDFExportButton = props => (
  <div>
    <PDFDownloadLink
      document={<ExportGenerator caseData={props.caseData} viz={props.viz} />}
      fileName="Case_Data_Overview.pdf"
      style={{ color: '#215589' }}
    >
      {({ blob, url, loading, error }) =>
        loading ? <LoadingOutlined /> : 'Download PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default PDFExportButton;
