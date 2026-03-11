import { useMemo, useState } from 'react'
import { DataTable, type DataTableColumn } from '../../components/data-table'
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

const toDateOnlyString = (value: Date): string => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isInCurrentWeek = (targetDate: Date, currentDate: Date): boolean => {
  const dayOfWeek = currentDate.getDay()
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const weekStart = new Date(currentDate)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(currentDate.getDate() - mondayOffset)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)

  return targetDate >= weekStart && targetDate <= weekEnd
}

const applyTimeRange = (target: string, timeRange: PayoutsFilterValues['timeRange']): boolean => {
  if (timeRange === 'anytime') {
    return true
  }

  const targetDate = new Date(`${target}T00:00:00`)
  const now = new Date()
  const today = toDateOnlyString(now)

  if (timeRange === 'today') {
    return target === today
  }

  if (timeRange === 'yesterday') {
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    return target === toDateOnlyString(yesterday)
  }

  if (timeRange === 'this-week') {
    return isInCurrentWeek(targetDate, now)
  }

  return targetDate.getFullYear() === now.getFullYear() && targetDate.getMonth() === now.getMonth()
}

const PayoutsPage = () => {
  const [filters, setFilters] = useState<PayoutsFilterValues>(defaultFilters)

  const filteredRows = useMemo(() => {
    const dateKey = filters.dateType === 'created' ? 'createdDate' : 'payoutDate'
    return payoutRows.filter((row) => applyTimeRange(row[dateKey], filters.timeRange))
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

