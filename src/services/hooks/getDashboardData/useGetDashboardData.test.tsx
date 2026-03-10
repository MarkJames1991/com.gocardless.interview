import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData } from './fetchDashboardData.tsx'
import { useGetDashboardData } from './useGetDashboardData.tsx'
import type { FetchDashboardDataOptions } from './types.ts'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('./fetchDashboardData.tsx', () => ({
  fetchDashboardData: vi.fn(),
}))

const mockedUseQuery = vi.mocked(useQuery)
const mockedFetchDashboardData = vi.mocked(fetchDashboardData)

describe('useGetDashboardData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('configures useQuery with expected key and stale time', () => {
    const queryResult = {
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    }
    mockedUseQuery.mockReturnValue(queryResult as never)
    const options: FetchDashboardDataOptions = {
      mode: 'rows',
      properties: [],
      paginate: true,
      page: 1,
      limit: 25,
    }

    const result = useGetDashboardData('payments', options)

    expect(result).toBe(queryResult)
    expect(mockedUseQuery).toHaveBeenCalledTimes(1)

    const queryConfig = mockedUseQuery.mock.calls[0]?.[0]
    expect(queryConfig?.queryKey).toEqual(['dashboard-data', 'payments', options])
    expect(queryConfig?.enabled).toBe(true)
    expect(queryConfig?.staleTime).toBe(30_000)
  })

  it('delegates queryFn to fetchDashboardData with url and options', async () => {
    mockedUseQuery.mockReturnValue({} as never)
    mockedFetchDashboardData.mockResolvedValue([{ id: '1' }])
    const options: FetchDashboardDataOptions = {
      mode: 'nested',
      properties: [],
      paginate: true,
      page: 3,
      limit: 5,
    }

    useGetDashboardData('customers', options)
    const queryConfig = mockedUseQuery.mock.calls[0]?.[0]
    const queryFn = queryConfig?.queryFn

    expect(typeof queryFn).toBe('function')
    if (typeof queryFn !== 'function') {
      throw new Error('queryFn was not configured')
    }

    await queryFn({} as never)

    expect(mockedFetchDashboardData).toHaveBeenCalledWith('customers', options)
  })

  it('disables query and guards queryFn when url is null', async () => {
    mockedUseQuery.mockReturnValue({} as never)

    useGetDashboardData(null)
    const queryConfig = mockedUseQuery.mock.calls[0]?.[0]
    const queryFn = queryConfig?.queryFn

    expect(queryConfig?.queryKey).toEqual(['dashboard-data', null, undefined])
    expect(queryConfig?.enabled).toBe(false)
    expect(typeof queryFn).toBe('function')
    if (typeof queryFn !== 'function') {
      throw new Error('queryFn was not configured')
    }

    expect(() => queryFn({} as never)).toThrow('Collection name is required')
    expect(mockedFetchDashboardData).not.toHaveBeenCalled()
  })

  it('returns the exact object returned by useQuery', () => {
    const queryResult = {
      data: [{ id: 'payment_1' }],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    }
    mockedUseQuery.mockReturnValue(queryResult as never)

    const result = useGetDashboardData('payments', { mode: 'rows', properties: [] })

    expect(result).toBe(queryResult)
  })
})
