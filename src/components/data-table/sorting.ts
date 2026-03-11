import type { DataTableColumn, DataTableRow, SortState } from './types'

const compareSortValues = (
  left: string | number | Date | null | undefined,
  right: string | number | Date | null | undefined,
) => {
  if (left == null && right == null) return 0
  if (left == null) return 1
  if (right == null) return -1

  const leftValue = left instanceof Date ? left.getTime() : left
  const rightValue = right instanceof Date ? right.getTime() : right

  if (typeof leftValue === 'number' && typeof rightValue === 'number') {
    return leftValue - rightValue
  }

  return String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true })
}

export function getNextSortState(current: SortState, key: string): SortState {
  if (!current || current.key !== key) {
    return { key, direction: 'asc' }
  }

  if (current.direction === 'asc') {
    return { key, direction: 'desc' }
  }

  return null
}

export function sortData<TData extends DataTableRow>(
  data: TData[],
  columns: DataTableColumn<TData>[],
  sortState: SortState,
): TData[] {
  if (!sortState) {
    return data
  }

  const sortingColumn = columns.find((column) => String(column.accessorKey) === sortState.key)
  if (!sortingColumn || !sortingColumn.sortable) {
    return data
  }

  const sorted = [...data]
    .map((row, index) => ({ index, row }))
    .sort((left, right) => {
      const leftValue = sortingColumn.sortAccessor
        ? sortingColumn.sortAccessor(left.row)
        : (left.row[sortingColumn.accessorKey as keyof TData] as
            | string
            | number
            | Date
            | null
            | undefined)
      const rightValue = sortingColumn.sortAccessor
        ? sortingColumn.sortAccessor(right.row)
        : (right.row[sortingColumn.accessorKey as keyof TData] as
            | string
            | number
            | Date
            | null
            | undefined)

      const comparison = compareSortValues(leftValue, rightValue)
      if (comparison !== 0) {
        return sortState.direction === 'asc' ? comparison : -comparison
      }

      return left.index - right.index
    })

  return sorted.map((entry) => entry.row)
}

