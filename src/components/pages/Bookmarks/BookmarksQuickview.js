import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function BookmarkPanel() {
  const columns = [
    { field: 'yo', headerName: 'yo', width: 100 },
    { field: 'favs', headerName: 'favs', width: 100 },
  ];

  const rows = [
    { id: 1, yo: 'hello', favs: 'foSho' },
    { id: 2, yo: 'sup', favs: 'wack' },
    { id: 3, yo: 'my killa', favs: 'lit' },
  ];

  return (
    <div style={{ height: 150 }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
