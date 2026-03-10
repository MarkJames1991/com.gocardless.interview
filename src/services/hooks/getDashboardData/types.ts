export type DashboardDataMode = 'nested' | 'rows'

export type DashboardDataProperty = Record<string, unknown>

export interface FetchDashboardDataOptions {
  mode: DashboardDataMode
  properties: DashboardDataProperty[]
  paginate?: boolean
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export type DashboardDataResult<T> = PaginatedResult<T> | T[]

