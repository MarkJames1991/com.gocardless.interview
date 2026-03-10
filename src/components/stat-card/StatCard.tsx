type StatCardProps = {
  title: string
  amount: string
  actionLabel: string
  actionHref?: string
}

function InfoBadge() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#8f8b84] text-[0.6rem] font-semibold text-[#746f68]"
    >
      i
    </span>
  )
}

export function StatCard({ title, amount, actionLabel, actionHref = '#' }: StatCardProps) {
  return (
    <article className="bg-white min-h-[152px] rounded-2xl border border-stroke px-6 py-5">
      <div className="inline-flex items-center gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.02em] ">{title}</h3>
        <InfoBadge />
      </div>
      <p className="mt-3 text-2xl font-semibold leading-none tracking-[-0.02em] ">
        {amount}
      </p>
      <a className="mt-5 inline-block  font-semibold leading-none underline cursor-auto" href={actionHref}>
        {actionLabel}
      </a>
    </article>
  )
}
