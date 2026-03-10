import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ServiceCall from './ServiceCall'
import getStoredAuthToken from '../lib/getStoredAuthToken'

vi.mock('axios')
vi.mock('../lib/getStoredAuthToken', () => ({
  default: vi.fn(),
}))

const mockedAxios = vi.mocked(axios)
const mockedGetStoredAuthToken = vi.mocked(getStoredAuthToken)

describe('ServiceCall', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedGetStoredAuthToken.mockReturnValue(null)
    mockedAxios.mockResolvedValue({ data: { ok: true } } as never)
  })

  it('calls axios with normalized URL and GET params when method is GET', async () => {
    const serviceCall = new ServiceCall()
    const payload = { page: 1 }

    await serviceCall.call('/payments', 'get', payload)

    expect(mockedAxios).toHaveBeenCalledTimes(1)
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      url: expect.stringContaining('/payments'),
      headers: {
        'Content-Type': 'application/json',
      },
      params: payload,
    })
  })

  it('uses data for non-GET methods and merges custom headers', async () => {
    const serviceCall = new ServiceCall()
    const payload = { amount: 1000 }

    await serviceCall.call('payments', 'post', payload, { 'X-Trace-Id': 'abc-123' })

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'POST',
      url: expect.stringContaining('/payments'),
      headers: {
        'Content-Type': 'application/json',
        'X-Trace-Id': 'abc-123',
      },
      data: payload,
    })
  })

  it('includes token-based headers when auth token exists', async () => {
    mockedGetStoredAuthToken.mockReturnValue('Bearer token-123')
    const serviceCall = new ServiceCall()

    await serviceCall.call('customers', 'get')

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      url: expect.stringContaining('/customers'),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-123',
        user_uuid: null,
        account_uuid: null,
      },
      params: undefined,
    })
  })

  it('returns response data for successful calls', async () => {
    const expected = { id: 'payment_1', status: 'created' }
    mockedAxios.mockResolvedValue({ data: expected } as never)
    const serviceCall = new ServiceCall()

    const result = await serviceCall.call('payments', 'get')

    expect(result).toEqual(expected)
  })

  it('throws when API response includes error field', async () => {
    mockedAxios.mockResolvedValue({ data: { error: 'Nope' } } as never)
    const serviceCall = new ServiceCall()

    await expect(serviceCall.call('payments', 'get')).rejects.toThrow('Nope')
  })
})
