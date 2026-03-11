import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { getNextSortState } from './sorting'
import type { DataTableColumn, DataTableRow, SortState } from './types'

type DataTableTableProps<TData extends DataTableRow> = {
  columns: DataTableColumn<TData>[]
  data: TData[]
  emptyMessage: ReactNode
  onSortChange: (nextSort: SortState) => void
  sortState: SortState
  tableLabel: string
}

export function DataTableTable<TData extends DataTableRow>({
  columns,
  data,
  emptyMessage,
  onSortChange,
  sortState,
  tableLabel,
}: DataTableTableProps<TData>) {
  return (
    <div className="overflow-x-auto border-t border-[#d9d3cc]">
      <table aria-label={tableLabel} className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#d9d3cc]">
            {columns.map((column) => (
              <th
                key={String(column.accessorKey)}
                aria-sort={
                  sortState?.key === String(column.accessorKey)
                    ? sortState.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
                className={cn(
                  'px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#4a463f]',
                  column.headerClassName,
                )}
                scope="col"
              >
                {column.sortable ? (
                  <button
                    className="inline-flex items-center gap-2"
                    type="button"
                    onClick={() => onSortChange(getNextSortState(sortState, String(column.accessorKey)))}
                  >
                    <span>{column.header}</span>
                    <span aria-hidden="true" className="inline-flex flex-col leading-none text-[10px]">
                      <span
                        className={cn(
                          'h-2',
                          sortState?.key === String(column.accessorKey) &&
                            sortState.direction === 'asc'
                            ? 'text-[#1f1d1a]'
                            : 'text-[#b8b2aa]',
                        )}
                      >
                        ▲
                      </span>
                      <span
                        className={cn(
                          'h-2',
                          sortState?.key === String(column.accessorKey) &&
                            sortState.direction === 'desc'
                            ? 'text-[#1f1d1a]'
                            : 'text-[#b8b2aa]',
                        )}
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-[#ebe6df] last:border-b-0">
                {columns.map((column) => (
                  <td
                    key={String(column.accessorKey)}
                    className={cn('px-4 py-4 text-sm text-[#2b2824]', column.className)}
                  >
                    {column.cell
                      ? column.cell(row)
                      : column.render
                        ? column.render(row)
                        : String(row[column.accessorKey as keyof TData] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-10 text-sm text-[#76716a]" colSpan={columns.length || 1}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
