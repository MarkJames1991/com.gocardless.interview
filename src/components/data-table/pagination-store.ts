import { createContext, useContext } from 'react'

export type DataTablePaginationContextValue = {
  canGoNext: boolean
  canGoPrevious: boolean
  currentPage: number
  goNext: () => void
  goPrevious: () => void
  page: number
  pageSizeOptions: number[]
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  totalPages: number
}

export const DataTablePaginationContext = createContext<DataTablePaginationContextValue | null>(null)

export function useDataTablePagination() {
  const context = useContext(DataTablePaginationContext)

  if (!context) {
    throw new Error('useDataTablePagination must be used within DataTablePaginationProvider')
  }

  return context
}

