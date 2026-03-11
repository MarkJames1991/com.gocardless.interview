import { useState } from 'react'
import { Button } from '../button/Button'
import { SidebarMenu } from './SidebarMenu'
import { primaryMenuItems, productMenuItems } from './sidebarData'

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const handleMenuItemNavigate = () => setIsMobileMenuOpen(false)

  return (
    <aside className="flex w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(8,54,40,0.4),_transparent_35%),linear-gradient(180deg,#0f1f1b_0%,#0c1714_100%)] px-4 py-5 text-[#f4f2ed] lg:min-h-screen lg:w-[240px] lg:px-5 lg:py-7">
      <div className="flex items-center justify-between lg:block">
        <div className="font-serif text-[1.9rem] font-semibold tracking-[-0.03em] text-white lg:text-[2.1rem]">GoCardless</div>
        <Button
          aria-expanded={isMobileMenuOpen}
          className="border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 lg:hidden"
          size="sm"
          variant="ghost"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </Button>
      </div>

      <div
        className={`${isMobileMenuOpen ? 'mt-6 flex' : 'hidden'} w-full flex-col lg:mt-0 lg:flex lg:flex-1`}
        data-testid="sidebar-panel"
      >
        <SidebarMenu
          primaryItems={primaryMenuItems}
          secondaryItems={productMenuItems}
          onNavigate={handleMenuItemNavigate}
        />

        <Button
          className="mt-8 w-full bg-[#e6ea47] text-base font-semibold text-black hover:bg-[#f1f56e]"
          variant="secondary"
        >
          Create payment
        </Button>

        <Button
          className="mt-auto h-auto w-fit bg-transparent px-0 py-0 pt-8 text-left text-[1.02rem] font-semibold text-white/90 hover:bg-transparent hover:text-white"
          variant="ghost"
        >
          Leave feedback
        </Button>
      </div>
    </aside>
  )
}
