import type { ReactNode } from 'react'

export type DataTableRow = Record<string, unknown>

export type FilterDrawerRenderProps = {
  close: () => void
}

export type DataTableColumn<TData extends DataTableRow> = {
  accessorKey: keyof TData | string
  cell?: (row: TData) => ReactNode
  className?: string
  header: ReactNode
  headerClassName?: string
  render?: (row: TData) => ReactNode
  sortAccessor?: (row: TData) => string | number | Date | null | undefined
  sortable?: boolean
}

export type DataTableProps<TData extends DataTableRow> = {
  columns: DataTableColumn<TData>[]
  data: TData[]
  emptyMessage?: ReactNode
  onExport?: () => void
  onFilter?: () => void
  onImport?: () => void
  pageSize?: number
  pageSizeOptions?: number[]
  filterDrawerName?: string
  filterDrawerTitle?: string
  renderFilterDrawer?: (props: FilterDrawerRenderProps) => ReactNode
  resultLabel?: string
  tableLabel?: string
}

export type DataTableContentProps<TData extends DataTableRow> = {
  columns: DataTableColumn<TData>[]
  data: TData[]
  emptyMessage: ReactNode
  filterDrawerName: string
  filterDrawerTitle: string
  onExport?: () => void
  onFilter?: () => void
  onImport?: () => void
  renderFilterDrawer?: (props: FilterDrawerRenderProps) => ReactNode
  resultLabel?: string
  tableLabel: string
}

export type SortDirection = 'asc' | 'desc'

export type SortState = {
  direction: SortDirection
  key: string
} | null

