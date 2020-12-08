import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'hearing_date', headerName: 'Hearing Date', width: 130 },
  { field: 'case_url', headerName: 'Case URL', width: 130 },
  { field: 'court_type', headerName: 'Court Type', width: 130 },
  { field: 'hearing_type', headerName: 'Hearing Type', width: 130 },
  { field: 'refugee_origin', headerName: 'Refugee Origin', width: 130 },
  { field: 'hearing_location', headerName: 'Location', width: 130 },
  { field: 'judge_name', headerName: 'Judge Name', width: 130 },
  { field: 'judge_decision', headerName: 'Decision', width: 130 },
  { field: 'case_status', headerName: 'Case Status', width: 130 },
];

const rows = [
  {
    id: 1,
    caseDate: '10/11/2017',
    caseName: 'The United States vs. Johnson',
    caseType: 'Immigration',
    hearingType: 'Trial',
    location: 'Miami',
    judgeName: 'Gustavo Almadovar',
    caseStatus: 'Closed',
  },
];

export default function CaseTable(props) {
  const { caseData } = props;

  function generateRows(rowData, colData) {
    // loop through data, each element is an object
    // compare entries to column names, set each quantity in each row to the corresponding column name
    const rows = [];
    for (let i = 0; i < rowData.length; i++) {
      let properties = Object.keys(rowData[i]);
      return properties;
    }
  }

  return (
    <div style={{ height: 400, width: '70%', margin: 'auto' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      {generateRows(caseData)}
    </div>
  );
}
