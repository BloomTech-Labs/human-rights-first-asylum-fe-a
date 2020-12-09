import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
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

export default function CaseTable(props) {
  const { caseData } = props;

  const rows = caseData;

  return (
    <div style={{ height: 400, width: '70%', margin: 'auto' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
