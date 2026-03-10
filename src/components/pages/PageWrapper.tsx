

const PaymentsWrapper = ({header , children}) => {
    return  <div className="min-w-0 pt-8 sm:pt-12 lg:pt-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {header}
        </div>
        <div className="flex min-h-[50vh] items-center justify-center px-2 py-10 sm:min-h-[58vh] sm:px-4 sm:py-12">
            {children}
        </div>
    </div>
}

export default PaymentsWrapper;
export {
    PaymentsWrapper
}
