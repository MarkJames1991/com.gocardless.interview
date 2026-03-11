import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { DataTablePagination } from './DataTablePagination'
import { DataTablePaginationProvider } from './pagination-context'
import { useDataTablePagination } from './pagination-store'

function PaginationStateProbe() {
  const { canGoNext, canGoPrevious, page, rowsPerPage } = useDataTablePagination()

  return (
    <div>
      <p data-testid="page">{page}</p>
      <p data-testid="rows">{rowsPerPage}</p>
      <p data-testid="can-prev">{canGoPrevious ? 'yes' : 'no'}</p>
      <p data-testid="can-next">{canGoNext ? 'yes' : 'no'}</p>
    </div>
  )
}

function PaginationHarness({
  dataLength = 6,
  defaultPageSize = 2,
}: {
  dataLength?: number
  defaultPageSize?: number
}) {
  const [length, setLength] = useState(dataLength)

  return (
    <div>
      <button type="button" onClick={() => setLength(0)}>
        clear
      </button>
      <DataTablePaginationProvider
        dataLength={length}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={[2, 4]}
      >
        <PaginationStateProbe />
        <DataTablePagination dataLength={length} />
      </DataTablePaginationProvider>
    </div>
  )
}

describe('DataTablePagination + provider', () => {
  it('throws when useDataTablePagination is used outside provider', () => {
    expect(() => render(<DataTablePagination dataLength={1} />)).toThrow(
      'useDataTablePagination must be used within DataTablePaginationProvider',
    )
  })

  it('updates pagination state via next/previous and page-size controls', async () => {
    const user = userEvent.setup()
    render(<PaginationHarness />)

    expect(screen.getByTestId('page')).toHaveTextContent('1')
    expect(screen.getByTestId('rows')).toHaveTextContent('2')
    expect(screen.getByTestId('can-prev')).toHaveTextContent('no')
    expect(screen.getByTestId('can-next')).toHaveTextContent('yes')

    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByTestId('page')).toHaveTextContent('2')
    expect(screen.getByTestId('can-prev')).toHaveTextContent('yes')

    await user.selectOptions(screen.getByLabelText('Items per page'), '4')
    expect(screen.getByTestId('rows')).toHaveTextContent('4')
    expect(screen.getByTestId('page')).toHaveTextContent('1')
    expect(screen.getByTestId('can-next')).toHaveTextContent('yes')
  })

  it('hides pagination footer when dataLength becomes zero', async () => {
    const user = userEvent.setup()
    render(<PaginationHarness />)

    expect(screen.getByLabelText('Items per page')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'clear' }))
    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument()
  })
})

