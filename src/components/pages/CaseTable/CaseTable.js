import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'caseDate', headerName: 'Case Date', width: 130 },
  { field: 'caseName', headerName: 'Case Name', width: 130 },
  { field: 'caseType', headerName: 'Case Type', width: 130 },
  { field: 'hearingType', headerName: 'Hearing Type', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  { field: 'judgeName', headerName: 'Judge Name', width: 130 },
  { field: 'caseStatus', headerName: 'Case Status', width: 130 },

  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue('firstName') || ''} ${
  //         params.getValue('lastName') || ''
  //       }`,
  //   },
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

export default function CaseTable() {
  return (
    <div style={{ height: 400, width: '70%', margin: 'auto' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
