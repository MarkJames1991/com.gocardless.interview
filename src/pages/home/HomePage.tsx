import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/dropdown-menu'
import { StatCard } from '../../components/stat-card/StatCard'

export function HomePage() {
  return (
    <div className="min-w-0 pt-5">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-[#262320]">Today</h1>
          <DropdownMenu className="relative">
            <DropdownMenuTrigger className="h-auto bg-transparent px-0 py-0 text-[1.5rem] font-semibold text-[#262320] hover:bg-transparent">
              <span aria-hidden="true">GB</span>
              <span>GBP</span>
              <span aria-hidden="true">v</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>GBP</DropdownMenuItem>
              <DropdownMenuItem>EUR</DropdownMenuItem>
              <DropdownMenuItem>USD</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <StatCard actionLabel="View all payments" amount="0.00 GBP" title="Pending payments" />
          <StatCard actionLabel="View confirmed payments" amount="0.00 GBP" title="Confirmed funds" />
          <StatCard actionLabel="View payouts" amount="0.00 GBP" title="Pending payouts" />
        </div>
      </section>

      <section className="pt-8">
        <h2 className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#262320]">Overview</h2>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <DropdownMenu className="relative">
            <DropdownMenuTrigger className="h-auto bg-transparent px-0 py-0 text-[1rem] font-semibold text-[#262320] hover:bg-transparent">
              <span>Last 30 days</span>
              <span aria-hidden="true">v</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu className="relative">
            <DropdownMenuTrigger className="h-auto bg-transparent px-0 py-0 text-[1rem] font-semibold text-[#262320] hover:bg-transparent">
              <span>Dates</span>
              <span aria-hidden="true">v</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Anytime</DropdownMenuItem>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This week</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="min-h-[260px] rounded-2xl border border-[#d8d2c8] px-6 py-5">
            <h3 className="text-[16px] font-semibold text-[#262320]">Collected payments</h3>
            <p className="mt-3 text-[28px] font-semibold leading-none text-[#262320]">0.00 GBP</p>
          </article>
          <aside>
            <h3 className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#262320]">
              Account health
            </h3>
            <div className="mt-5 space-y-4">
              <article className="rounded-2xl border border-[#d8d2c8] px-6 py-5">
                <h4 className="text-[16px] font-semibold text-[#262320]">Active customers</h4>
                <p className="mt-3 text-[28px] font-semibold leading-none text-[#262320]">0</p>
              </article>
              <article className="rounded-2xl border border-[#d8d2c8] px-6 py-5">
                <h4 className="text-[16px] font-semibold text-[#262320]">Recent failed payments</h4>
                <p className="mt-3 text-[28px] font-semibold leading-none text-[#262320]">0/0</p>
              </article>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
