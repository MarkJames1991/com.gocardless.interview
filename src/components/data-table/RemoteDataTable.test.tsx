import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { RemoteDataTable, type RemoteDataTableResult } from './RemoteDataTable'
import type { DataTableColumn } from './DataTable'

type PaymentRow = {
  amount: string
  customer: string
}

const columns: DataTableColumn<PaymentRow>[] = [
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'amount', header: 'Amount' },
]

describe('RemoteDataTable', () => {
  it('renders loading state then table rows from fetchData', async () => {
    const fetchData = vi.fn<() => Promise<RemoteDataTableResult<PaymentRow>>>().mockResolvedValue([
      { customer: 'Acme Ltd', amount: '10.00 GBP' },
      { customer: 'Beta Co', amount: '20.00 GBP' },
    ])

    render(<RemoteDataTable columns={columns} fetchData={fetchData} />)

    expect(screen.getByText('Loading table data...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Acme Ltd')).toBeInTheDocument()
    })
    expect(fetchData).toHaveBeenCalled()
  })

  it('uses remote total count when wrapped result provides total', async () => {
    const fetchData = vi
      .fn<() => Promise<RemoteDataTableResult<PaymentRow>>>()
      .mockResolvedValue({
        data: [{ customer: 'Acme Ltd', amount: '10.00 GBP' }],
        total: 42,
      })

    render(<RemoteDataTable columns={columns} fetchData={fetchData} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^Filter/ })).toHaveTextContent('(42 results)')
    })
  })

  it('supports retry from default error state', async () => {
    const user = userEvent.setup()
    const fetchData = vi
      .fn<() => Promise<RemoteDataTableResult<PaymentRow>>>()
      .mockRejectedValueOnce(new Error('network failed'))
      .mockResolvedValueOnce([{ customer: 'Gamma Co', amount: '30.00 GBP' }])

    render(<RemoteDataTable columns={columns} fetchData={fetchData} />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load table data.')).toBeInTheDocument()
    })

    const initialCallCount = fetchData.mock.calls.length
    await user.click(screen.getByRole('button', { name: 'Retry' }))

    await waitFor(() => {
      expect(screen.getByText('Gamma Co')).toBeInTheDocument()
    })

    expect(fetchData.mock.calls.length).toBeGreaterThan(initialCallCount)
  })

  it('supports custom loading fallback', async () => {
    const fetchData = vi
      .fn<() => Promise<RemoteDataTableResult<PaymentRow>>>()
      .mockResolvedValue([{ customer: 'Acme Ltd', amount: '10.00 GBP' }])

    render(
      <RemoteDataTable columns={columns} fetchData={fetchData} loadingFallback={<p>Fetching...</p>} />,
    )

    expect(screen.getByText('Fetching...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Acme Ltd')).toBeInTheDocument()
    })
  })

  it('supports custom error fallback renderer', async () => {
    const user = userEvent.setup()
    const fetchData = vi
      .fn<() => Promise<RemoteDataTableResult<PaymentRow>>>()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce([{ customer: 'Retry Customer', amount: '5.00 GBP' }])

    render(
      <RemoteDataTable
        columns={columns}
        fetchData={fetchData}
        errorFallback={(error, retry) => (
          <div>
            <p>{error.message}</p>
            <button type="button" onClick={retry}>
              Try again
            </button>
          </div>
        )}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText('boom')).toBeInTheDocument()
    })
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    await waitFor(() => {
      expect(screen.getByText('Retry Customer')).toBeInTheDocument()
    })
  })

  it('clears previous rows while refetching when keepPreviousData is false', async () => {
    const user = userEvent.setup()
    const resolvers: Array<(value: RemoteDataTableResult<PaymentRow>) => void> = []
    const fetchData = vi.fn<() => Promise<RemoteDataTableResult<PaymentRow>>>().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve)
        }),
    )

    function Harness() {
      const [version, setVersion] = useState(1)

      return (
        <div>
          <button type="button" onClick={() => setVersion(2)}>
            refresh
          </button>
          <RemoteDataTable
            columns={columns}
            dependencies={[version]}
            fetchData={fetchData}
            keepPreviousData={false}
          />
        </div>
      )
    }

    render(<Harness />)

    expect(screen.getByText('Loading table data...')).toBeInTheDocument()
    resolvers.shift()?.([{ customer: 'Initial Customer', amount: '1.00 GBP' }])
    await waitFor(() => {
      expect(screen.getByText('Initial Customer')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'refresh' }))
    expect(screen.getByText('Loading table data...')).toBeInTheDocument()
    expect(screen.queryByText('Initial Customer')).not.toBeInTheDocument()

    resolvers.shift()?.([{ customer: 'Updated Customer', amount: '2.00 GBP' }])
    await waitFor(() => {
      expect(screen.getByText('Updated Customer')).toBeInTheDocument()
    })
  })
})
