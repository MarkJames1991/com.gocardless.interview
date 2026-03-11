import { DataTableContent } from './DataTableContent'
import { DataTablePaginationProvider } from './pagination-context'
import type { DataTableProps, DataTableRow } from './types'

export function DataTable<TData extends DataTableRow>({
  columns,
  data,
  emptyMessage = 'No results found.',
  getRowKey,
  onExport,
  onFilter,
  onImport,
  pageSize = 25,
  pageSizeOptions = [25, 50, 100],
  filterDrawerName = 'table-filters',
  filterDrawerTitle = 'Filters',
  renderFilterDrawer,
  resultLabel,
  tableLabel = 'Data table',
}: DataTableProps<TData>) {
  return (
    <DataTablePaginationProvider
      dataLength={data.length}
      defaultPageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
    >
      <DataTableContent
        columns={columns}
        data={data}
        emptyMessage={emptyMessage}
        filterDrawerName={filterDrawerName}
        filterDrawerTitle={filterDrawerTitle}
        getRowKey={getRowKey}
        onExport={onExport}
        onFilter={onFilter}
        onImport={onImport}
        renderFilterDrawer={renderFilterDrawer}
        resultLabel={resultLabel}
        tableLabel={tableLabel}
      />
    </DataTablePaginationProvider>
  )
}

export type { DataTableColumn, DataTableProps } from './types'
