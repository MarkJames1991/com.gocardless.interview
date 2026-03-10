import { useMemo, useState } from 'react'
import PaymentsWrapper from "../../components/pages/PageWrapper.tsx";

import PaymentsHeader from "./components/payments-header/PaymentsHeader.tsx";
import { DataTable, type DataTableColumn } from '../../components/data-table'
import { PaymentsFilterForm, type PaymentsFilterValues } from './components/payment-filters/PaymentsFilterForm.tsx'

type PaymentRow = {
    amount: string
    chargeDate: string
    createdDate: string
    customer: string
    status: string
}

const columns: DataTableColumn<PaymentRow>[] = [
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'chargeDate', header: 'Charge date' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
]

const paymentRows: PaymentRow[] = [
    { customer: 'Acme Studio Ltd', createdDate: '2026-03-01', chargeDate: '2026-03-01', amount: '125.00 GBP', status: 'Confirmed' },
    { customer: 'Northwind Systems', createdDate: '2026-03-01', chargeDate: '2026-03-01', amount: '99.00 GBP', status: 'Pending' },
    { customer: 'Blue Orchard', createdDate: '2026-03-02', chargeDate: '2026-03-02', amount: '310.00 GBP', status: 'Confirmed' },
    { customer: 'Sparrow Labs', createdDate: '2026-03-02', chargeDate: '2026-03-02', amount: '45.00 GBP', status: 'Paid out' },
    { customer: 'Harbor Retail', createdDate: '2026-03-03', chargeDate: '2026-03-03', amount: '280.00 GBP', status: 'Confirmed' },
    { customer: 'Greenline Media', createdDate: '2026-03-03', chargeDate: '2026-03-03', amount: '19.00 GBP', status: 'Pending' },
    { customer: 'Lumen Finance', createdDate: '2026-03-04', chargeDate: '2026-03-04', amount: '760.00 GBP', status: 'Confirmed' },
    { customer: 'Peak Fit Co', createdDate: '2026-03-04', chargeDate: '2026-03-04', amount: '39.00 GBP', status: 'Failed' },
    { customer: 'Horizon Foods', createdDate: '2026-03-05', chargeDate: '2026-03-05', amount: '210.00 GBP', status: 'Confirmed' },
    { customer: 'Anchor Homes', createdDate: '2026-03-05', chargeDate: '2026-03-05', amount: '155.00 GBP', status: 'Pending' },
    { customer: 'Nova Travel', createdDate: '2026-03-06', chargeDate: '2026-03-06', amount: '490.00 GBP', status: 'Confirmed' },
    { customer: 'Everleaf Dental', createdDate: '2026-03-06', chargeDate: '2026-03-06', amount: '85.00 GBP', status: 'Paid out' },
]

const defaultFilters: PaymentsFilterValues = {
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

const applyTimeRange = (target: string, timeRange: PaymentsFilterValues['timeRange']): boolean => {
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

    return (
        targetDate.getFullYear() === now.getFullYear() &&
        targetDate.getMonth() === now.getMonth()
    )
}

const PaymentsPage = () => {
    const [filters, setFilters] = useState<PaymentsFilterValues>(defaultFilters)

    const filteredRows = useMemo(() => {
        const dateKey = filters.dateType === 'created' ? 'createdDate' : 'chargeDate'

        return paymentRows.filter((row) => applyTimeRange(row[dateKey], filters.timeRange))
    }, [filters])

    return <PaymentsWrapper header={<PaymentsHeader/>} >
        <DataTable
            columns={columns}
            data={filteredRows}
            filterDrawerName="payments-filters"
            filterDrawerTitle="Filters"
            renderFilterDrawer={({ close }) => (
                <PaymentsFilterForm
                    onChange={setFilters}
                    onClear={() => setFilters(defaultFilters)}
                    onClose={close}
                    onSubmit={(values) => setFilters(values)}
                />
            )}
        />
    </PaymentsWrapper>
}

export default PaymentsPage
export {
    PaymentsPage
}
