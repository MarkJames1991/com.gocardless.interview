import { EmptyStateIllustration } from '../../components/icons/AppIcons'

export function PaymentsEmptyState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-2 pb-10 pt-10 text-center sm:min-h-[58vh] sm:px-4 sm:pb-12 sm:pt-12">
      <div className="scale-90 sm:scale-100">
        <EmptyStateIllustration />
      </div>
      <h2 className="mt-1 max-w-4xl break-words text-3xl font-semibold tracking-[-0.035em] text-[#1f1d1a] sm:mt-3 sm:text-[3.15rem]">
        This is where you'll find each payment
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#393630] sm:mt-8 sm:text-xl">
        You haven't taken any payments yet. To do so, choose a customer to take a payment from by
        selecting 'Customers' in the main menu.
      </p>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#393630] sm:mt-8 sm:text-xl">
        Alternatively, create a Subscription template and let customers sign up to it by completing
        a Hosted Payment Page.
      </p>
    </div>
  )
}
