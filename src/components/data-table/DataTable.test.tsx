import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { DataTable, type DataTableColumn } from './DataTable'

type PaymentRow = {
  amount: string
  customer: string
  status: string
}

const columns: DataTableColumn<PaymentRow>[] = [
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'status', header: 'Status' },
]

describe('DataTable', () => {
  it('renders toolbar labels and table headers', () => {
    render(<DataTable columns={columns} data={[]} />)

    expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Import/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument()

    const table = screen.getByRole('table', { name: 'Data table' })
    expect(within(table).getByRole('columnheader', { name: 'Customer' })).toBeInTheDocument()
    expect(within(table).getByRole('columnheader', { name: 'Amount' })).toBeInTheDocument()
    expect(within(table).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument()
  })

  it('renders row values from data', () => {
    render(
      <DataTable
        columns={columns}
        data={[
          { customer: 'Acme Ltd', amount: '10.00 GBP', status: 'Confirmed' },
          { customer: 'Beta Co', amount: '20.00 GBP', status: 'Pending' },
        ]}
      />,
    )

    expect(screen.getByText('Acme Ltd')).toBeInTheDocument()
    expect(screen.getByText('10.00 GBP')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('renders custom empty message', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing to display." />)

    expect(screen.getByText('Nothing to display.')).toBeInTheDocument()
  })

  it('calls action handlers when toolbar buttons are clicked', async () => {
    const user = userEvent.setup()
    const onFilter = vi.fn()
    const onImport = vi.fn()
    const onExport = vi.fn()

    render(
      <DataTable
        columns={columns}
        data={[]}
        onExport={onExport}
        onFilter={onFilter}
        onImport={onImport}
      />,
    )

    await user.click(screen.getByRole('button', { name: /^Filter/ }))
    await user.click(screen.getByRole('button', { name: /Import/i }))
    await user.click(screen.getByRole('button', { name: /Export/i }))

    expect(onFilter).toHaveBeenCalledTimes(1)
    expect(onImport).toHaveBeenCalledTimes(1)
    expect(onExport).toHaveBeenCalledTimes(1)
  })

  it('paginates table rows when data exceeds page size', async () => {
    const user = userEvent.setup()
    render(
      <DataTable
        columns={columns}
        data={[
          { customer: 'Customer 1', amount: '1.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 2', amount: '2.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 3', amount: '3.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 4', amount: '4.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 5', amount: '5.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 6', amount: '6.00 GBP', status: 'Pending' },
        ]}
        pageSize={5}
        pageSizeOptions={[5, 10, 25]}
      />,
    )

    expect(screen.getByLabelText('Items per page')).toHaveValue('5')
    expect(screen.getByText('Customer 1')).toBeInTheDocument()
    expect(screen.queryByText('Customer 6')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next page' }))

    expect(screen.getByText('Customer 6')).toBeInTheDocument()
    expect(screen.queryByText('Customer 1')).not.toBeInTheDocument()
  })

  it('shows disabled pagination arrows when all data fits on one page', () => {
    render(
      <DataTable
        columns={columns}
        data={[{ customer: 'Customer 1', amount: '1.00 GBP', status: 'Confirmed' }]}
      />,
    )

    expect(screen.getByLabelText('Items per page')).toHaveValue('25')
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('updates visible rows when items-per-page value changes', async () => {
    const user = userEvent.setup()

    render(
      <DataTable
        columns={columns}
        data={[
          { customer: 'Customer 1', amount: '1.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 2', amount: '2.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 3', amount: '3.00 GBP', status: 'Confirmed' },
          { customer: 'Customer 4', amount: '4.00 GBP', status: 'Confirmed' },
        ]}
        pageSize={2}
        pageSizeOptions={[2, 4]}
      />,
    )

    expect(screen.getByText('Customer 1')).toBeInTheDocument()
    expect(screen.getByText('Customer 2')).toBeInTheDocument()
    expect(screen.queryByText('Customer 4')).not.toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Items per page'), '4')

    expect(screen.getByText('Customer 4')).toBeInTheDocument()
  })

  it('supports custom rendering via column render prop', () => {
    const renderColumns: DataTableColumn<PaymentRow>[] = [
      {
        accessorKey: 'status',
        header: 'Status',
        render: (row) => <strong>{row.status.toUpperCase()}</strong>,
      },
    ]

    render(
      <DataTable
        columns={renderColumns}
        data={[{ customer: 'Customer 1', amount: '1.00 GBP', status: 'confirmed' }]}
      />,
    )

    expect(screen.getByText('CONFIRMED')).toBeInTheDocument()
  })

  it('opens custom filter drawer content when filter button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/payments']}>
        <DataTable
          columns={columns}
          data={[]}
          filterDrawerName="payments-filters"
          renderFilterDrawer={({ close }) => (
            <div>
              <p>Custom filters</p>
              <button type="button" onClick={close}>
                Close
              </button>
            </div>
          )}
        />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /^Filter/ }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Custom filters')).toBeInTheDocument()
  })

  it('supports optional sortable columns with asc/desc/off toggle', async () => {
    const user = userEvent.setup()
    const sortableColumns: DataTableColumn<PaymentRow>[] = [
      { accessorKey: 'customer', header: 'Customer', sortable: true },
      { accessorKey: 'amount', header: 'Amount' },
      { accessorKey: 'status', header: 'Status' },
    ]

    render(
      <DataTable
        columns={sortableColumns}
        data={[
          { customer: 'Charlie', amount: '30.00 GBP', status: 'Confirmed' },
          { customer: 'Alpha', amount: '10.00 GBP', status: 'Pending' },
          { customer: 'Bravo', amount: '20.00 GBP', status: 'Confirmed' },
        ]}
        pageSize={25}
      />,
    )

    const customerSortButton = screen.getByRole('button', { name: /Customer/i })

    await user.click(customerSortButton)
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Alpha')

    await user.click(customerSortButton)
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Charlie')

    await user.click(customerSortButton)
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Charlie')
  })

  it('supports custom sortAccessor when sorting is enabled', async () => {
    const user = userEvent.setup()
    const sortableColumns: DataTableColumn<PaymentRow>[] = [
      {
        accessorKey: 'amount',
        header: 'Amount',
        sortable: true,
        sortAccessor: (row) => Number(row.amount.split(' ')[0]),
      },
    ]

    render(
      <DataTable
        columns={sortableColumns}
        data={[
          { customer: 'A', amount: '30.00 GBP', status: 'Confirmed' },
          { customer: 'B', amount: '10.00 GBP', status: 'Pending' },
          { customer: 'C', amount: '20.00 GBP', status: 'Confirmed' },
        ]}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Amount/i }))

    const cells = screen.getAllByRole('cell')
    expect(cells[0]).toHaveTextContent('10.00 GBP')
    expect(cells[1]).toHaveTextContent('20.00 GBP')
    expect(cells[2]).toHaveTextContent('30.00 GBP')
  })
})
