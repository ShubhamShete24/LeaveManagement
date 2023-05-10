import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function CustomDataGrid({ columns, rows, pagination, filtering, sorting }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pagination={pagination} filterModel={filtering} sortModel={sorting} />
    </div>
  );
}

export default CustomDataGrid;
