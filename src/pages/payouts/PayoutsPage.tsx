import { useMemo, useState } from 'react'
import { DataTable, type DataTableColumn } from '../../components/data-table'
import { matchesTimeRange } from '../../lib/dateRangeFilter'
import PaymentsWrapper from '../../components/pages/PageWrapper.tsx'
import PayoutsHeader from './components/payouts-header/PayoutsHeader.tsx'
import {
  PayoutsFilterForm,
  type PayoutsFilterValues,
} from './components/payout-filters/PayoutsFilterForm.tsx'

type PayoutRow = {
  amount: string
  createdDate: string
  payoutDate: string
  recipient: string
  status: string
}

const columns: DataTableColumn<PayoutRow>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'payoutDate', header: 'Payout date' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'status', header: 'Status' },
]

const payoutRows: PayoutRow[] = [
  {
    recipient: 'Barclays settlement account',
    createdDate: '2026-03-01',
    payoutDate: '2026-03-01',
    amount: '1,250.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'HSBC treasury account',
    createdDate: '2026-03-01',
    payoutDate: '2026-03-01',
    amount: '980.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Lloyds operations account',
    createdDate: '2026-03-02',
    payoutDate: '2026-03-02',
    amount: '2,100.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Monzo business account',
    createdDate: '2026-03-02',
    payoutDate: '2026-03-02',
    amount: '430.00 GBP',
    status: 'Pending',
  },
  {
    recipient: 'NatWest reserve account',
    createdDate: '2026-03-03',
    payoutDate: '2026-03-03',
    amount: '1,730.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Revolut treasury account',
    createdDate: '2026-03-03',
    payoutDate: '2026-03-03',
    amount: '615.00 GBP',
    status: 'Pending',
  },
  {
    recipient: 'Starling settlement account',
    createdDate: '2026-03-04',
    payoutDate: '2026-03-04',
    amount: '1,980.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Santander payout account',
    createdDate: '2026-03-04',
    payoutDate: '2026-03-04',
    amount: '520.00 GBP',
    status: 'Failed',
  },
  {
    recipient: 'Metro Bank collections',
    createdDate: '2026-03-05',
    payoutDate: '2026-03-05',
    amount: '1,410.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Wise settlement account',
    createdDate: '2026-03-05',
    payoutDate: '2026-03-05',
    amount: '790.00 GBP',
    status: 'Pending',
  },
  {
    recipient: 'Bank of Scotland reserve',
    createdDate: '2026-03-06',
    payoutDate: '2026-03-06',
    amount: '2,340.00 GBP',
    status: 'Paid',
  },
  {
    recipient: 'Citi treasury operations',
    createdDate: '2026-03-06',
    payoutDate: '2026-03-06',
    amount: '860.00 GBP',
    status: 'Paid',
  },
]

const defaultFilters: PayoutsFilterValues = {
  dateType: 'created',
  timeRange: 'anytime',
}

const PayoutsPage = () => {
  const [filters, setFilters] = useState<PayoutsFilterValues>(defaultFilters)

  const filteredRows = useMemo(() => {
    const dateKey = filters.dateType === 'created' ? 'createdDate' : 'payoutDate'
    return payoutRows.filter((row) => matchesTimeRange(row[dateKey], filters.timeRange))
  }, [filters])

  return (
    <PaymentsWrapper header={<PayoutsHeader />}>
      <DataTable
        columns={columns}
        data={filteredRows}
        filterDrawerName="payouts-filters"
        filterDrawerTitle="Filters"
        renderFilterDrawer={({ close }) => (
          <PayoutsFilterForm
            onChange={setFilters}
            onClear={() => setFilters(defaultFilters)}
            onClose={close}
            onSubmit={(values) => setFilters(values)}
          />
        )}
      />
    </PaymentsWrapper>
  )
}

export default PayoutsPage
export { PayoutsPage }
