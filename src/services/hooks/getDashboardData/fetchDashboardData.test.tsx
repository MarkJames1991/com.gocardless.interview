import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchDashboardData } from './fetchDashboardData.tsx'
import type { FetchDashboardDataOptions } from './types.ts'

const mockCall = vi.fn()

vi.mock('../../ServiceCall.tsx', () => {
  class MockServiceCall {
    call = mockCall
  }

  return {
    default: MockServiceCall,
  }
})

describe('fetchDashboardData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('throws when url is missing', async () => {
    await expect(fetchDashboardData('')).rejects.toThrow('Collection name is required')
  })

  it('throws when url is blank after trimming', async () => {
    await expect(fetchDashboardData('   ')).rejects.toThrow('Collection name is required')
  })

  it('calls ServiceCall with encoded endpoint and POST method', async () => {
    const options: FetchDashboardDataOptions = {
      mode: 'rows' as const,
      properties: [],
      paginate: true,
      page: 2,
      limit: 10,
    }
    mockCall.mockResolvedValue({ data: [{ id: '1' }] })

    await fetchDashboardData('payments due', options)

    expect(mockCall).toHaveBeenCalledWith('/view/payments%20due', 'POST', options)
  })

  it('encodes reserved URL characters in the endpoint', async () => {
    mockCall.mockResolvedValue({ data: [] })

    await fetchDashboardData('payments/2026?status=paid', {
      mode: 'rows',
      properties: [],
    })

    expect(mockCall).toHaveBeenCalledWith(
      '/view/payments%2F2026%3Fstatus%3Dpaid',
      'POST',
      expect.any(Object),
    )
  })

  it('returns response.data when present', async () => {
    const expected = [{ id: 'payment_1' }]
    mockCall.mockResolvedValue({ data: expected })

    const result = await fetchDashboardData('payments', {
      mode: 'rows',
      properties: [],
    })

    expect(result).toEqual(expected)
  })

  it('does not unwrap paginated responses that include metadata', async () => {
    const paginated = {
      data: [{ id: 'payment_1' }],
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
    }
    mockCall.mockResolvedValue(paginated)

    const result = await fetchDashboardData('payments', {
      mode: 'rows',
      properties: [],
    })

    expect(result).toEqual(paginated)
  })

  it('returns raw response when data is not present', async () => {
    const expected = [{ id: 'payment_2' }]
    mockCall.mockResolvedValue(expected)

    const result = await fetchDashboardData('payments', {
      mode: 'nested',
      properties: [],
    })

    expect(result).toEqual(expected)
  })

  it('passes undefined options to ServiceCall when options are not provided', async () => {
    mockCall.mockResolvedValue({ data: [] })

    await fetchDashboardData('payments')

    expect(mockCall).toHaveBeenCalledWith('/view/payments', 'POST', undefined)
  })

  it('logs and rethrows request errors', async () => {
    const error = new Error('network failed')
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockCall.mockRejectedValue(error)

    await expect(
      fetchDashboardData('payments', {
        mode: 'rows',
        properties: [],
      }),
    ).rejects.toThrow('network failed')

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch collection records:', error)
    consoleErrorSpy.mockRestore()
  })
})
