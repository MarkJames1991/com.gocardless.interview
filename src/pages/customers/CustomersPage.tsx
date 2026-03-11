import { useCallback } from 'react'
import { RemoteDataTable, type DataTableColumn, type RemoteDataTableResult } from '../../components/data-table'
import PaymentsWrapper from '../../components/pages/PageWrapper.tsx'
import { PageTitle } from '../../components/pages/PageTitle.tsx'

type CustomerRow = {
  createdAt: string
  email: string
  name: string
  status: 'Active' | 'Paused'
}

const columns: DataTableColumn<CustomerRow>[] = [
  { accessorKey: 'name', header: 'Customer', sortable: true },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'status', header: 'Status', sortable: true },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    sortable: true,
    sortAccessor: (row) => new Date(`${row.createdAt}T00:00:00`),
  },
]

const customerRows: CustomerRow[] = [
  { name: 'Ava Carter', email: 'ava@example.com', status: 'Active', createdAt: '2026-03-01' },
  { name: 'Noah Patel', email: 'noah@example.com', status: 'Active', createdAt: '2026-03-02' },
  { name: 'Mia Thompson', email: 'mia@example.com', status: 'Paused', createdAt: '2026-03-02' },
  { name: 'Liam Brooks', email: 'liam@example.com', status: 'Active', createdAt: '2026-03-03' },
  { name: 'Olivia Grant', email: 'olivia@example.com', status: 'Active', createdAt: '2026-03-03' },
  { name: 'Ethan Cooper', email: 'ethan@example.com', status: 'Paused', createdAt: '2026-03-04' },
]

const CustomersHeader = () => {
  return <PageTitle title="Customers" />
}

const CustomersPage = () => {
  const fetchCustomers = useCallback(async (): Promise<RemoteDataTableResult<CustomerRow>> => {
    await new Promise((resolve) => setTimeout(resolve, 120))

    return {
      data: customerRows,
      total: 18,
    }
  }, [])

  return (
    <PaymentsWrapper header={<CustomersHeader />}>
      <RemoteDataTable columns={columns} fetchData={fetchCustomers} />
    </PaymentsWrapper>
  )
}

export default CustomersPage
export { CustomersPage }

