import { useMemo, useState, type ReactNode } from 'react'
import { DataTablePaginationContext, type DataTablePaginationContextValue } from './pagination-store'

type DataTablePaginationProviderProps = {
  children: ReactNode
  dataLength: number
  defaultPageSize: number
  pageSizeOptions: number[]
}

export function DataTablePaginationProvider({
  children,
  dataLength,
  defaultPageSize,
  pageSizeOptions,
}: DataTablePaginationProviderProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPageState] = useState(defaultPageSize)

  const resolvedPageSizeOptions = useMemo(
    () => Array.from(new Set([...pageSizeOptions, rowsPerPage])).sort((a, b) => a - b),
    [pageSizeOptions, rowsPerPage],
  )

  const totalPages = Math.max(1, Math.ceil(dataLength / rowsPerPage))
  const page = Math.min(currentPage, totalPages)

  const canGoPrevious = page > 1
  const canGoNext = page < totalPages

  const value = useMemo<DataTablePaginationContextValue>(
    () => ({
      canGoNext,
      canGoPrevious,
      currentPage,
      goNext: () => setCurrentPage(Math.min(totalPages, page + 1)),
      goPrevious: () => setCurrentPage(Math.max(1, page - 1)),
      page,
      pageSizeOptions: resolvedPageSizeOptions,
      rowsPerPage,
      setRowsPerPage: (value: number) => {
        setRowsPerPageState(value)
        setCurrentPage(1)
      },
      totalPages,
    }),
    [canGoNext, canGoPrevious, currentPage, page, resolvedPageSizeOptions, rowsPerPage, totalPages],
  )

  return (
    <DataTablePaginationContext.Provider value={value}>
      {children}
    </DataTablePaginationContext.Provider>
  )
}
