import { useMemo, useState } from 'react'
import PaymentsWrapper from "../../components/pages/PageWrapper.tsx";

import PaymentsHeader from "./components/payments-header/PaymentsHeader.tsx";
import { DataTable, type DataTableColumn } from '../../components/data-table'
import { matchesTimeRange } from '../../lib/dateRangeFilter'
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

const PaymentsPage = () => {
    const [filters, setFilters] = useState<PaymentsFilterValues>(defaultFilters)

    const filteredRows = useMemo(() => {
        const dateKey = filters.dateType === 'created' ? 'createdDate' : 'chargeDate'

        return paymentRows.filter((row) => matchesTimeRange(row[dateKey], filters.timeRange))
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
