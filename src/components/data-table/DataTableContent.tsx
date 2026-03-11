import { useMemo, useState } from 'react'
import { DataTablePagination } from './DataTablePagination'
import { sortData } from './sorting'
import { DataTableTable } from './DataTableTable'
import { DataTableToolbar } from './DataTableToolbar'
import { useDataTablePagination } from './pagination-store'
import type { DataTableContentProps, DataTableRow, SortState } from './types'

export function DataTableContent<TData extends DataTableRow>({
  columns,
  data,
  emptyMessage,
  filterDrawerName,
  filterDrawerTitle,
  onExport,
  onFilter,
  onImport,
  renderFilterDrawer,
  resultLabel,
  tableLabel,
}: DataTableContentProps<TData>) {
  const [sortState, setSortState] = useState<SortState>(null)
  const { page, rowsPerPage } = useDataTablePagination()
  const resolvedResultLabel = resultLabel ?? `(${data.length} results)`

  const sortedData = useMemo(() => sortData(data, columns, sortState), [columns, data, sortState])
  const currentPageData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <section className="w-full">
      <DataTableToolbar
        filterDrawerName={filterDrawerName}
        filterDrawerTitle={filterDrawerTitle}
        onExport={onExport}
        onFilter={onFilter}
        onImport={onImport}
        renderFilterDrawer={renderFilterDrawer}
        resultLabel={resolvedResultLabel}
      />

      <DataTableTable
        columns={columns}
        data={currentPageData}
        emptyMessage={emptyMessage}
        sortState={sortState}
        tableLabel={tableLabel}
        onSortChange={setSortState}
      />

      <DataTablePagination dataLength={data.length} />
    </section>
  )
}

