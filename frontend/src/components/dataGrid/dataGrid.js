/* eslint-disable react/prop-types */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridComponent({
  tableData,
  headers,
  getRowId,
  count,
  selectedRowIds,
  enableCheckbox,
  rowClicked,
  gridHeight,
  gridloader,
  hideFooter,
  disableSelection
}) {
  const headerColumns = headers.map((column) => ({
    ...column,
    renderHeader: !column.renderHeader ? () => <strong>{column.headerName}</strong> : column.renderHeader
  }));
  return (
    <div style={{ height: !gridHeight ? 450 : gridHeight, width: '100%' }}>
      <DataGrid
        columns={headerColumns}
        rows={tableData}
        getRowId={getRowId}
        rowCount={count || tableData.length}
        checkboxSelection={enableCheckbox}
        onRowClick={rowClicked}
        disableSelectionOnClick={disableSelection}
        hideFooter={hideFooter}
        onSelectionModelChange={selectedRowIds}
        loading={gridloader}
      />
    </div>
  );
}
