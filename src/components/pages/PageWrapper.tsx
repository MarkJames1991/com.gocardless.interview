import type { ReactNode } from 'react'

type PaymentsWrapperProps = {
    children: ReactNode
    header: ReactNode
}

const PaymentsWrapper = ({header , children}: PaymentsWrapperProps) => {
    return  <div className="min-w-0 pt-8 sm:pt-12 lg:pt-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {header}
        </div>
        <div className="flex gap-3 flex-grow-1">
            {children}
        </div>
    </div>
}

export default PaymentsWrapper;
export {
    PaymentsWrapper
}
