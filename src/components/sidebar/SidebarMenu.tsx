import { SidebarNavItem } from './SidebarNavItem'
import type { SidebarMenuItem } from './types'

type SidebarMenuProps = {
  primaryItems: SidebarMenuItem[]
  secondaryItems: SidebarMenuItem[]
  onNavigate?: () => void
}

export function SidebarMenu({ primaryItems, secondaryItems, onNavigate }: SidebarMenuProps) {
  return (
    <nav className="mt-10 flex flex-1 flex-col gap-2" aria-label="Primary">
      {primaryItems.map((item) => (
        <SidebarNavItem key={item.label} item={item} onNavigate={onNavigate} />
      ))}

      {secondaryItems.map((item) => (
        <SidebarNavItem key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  )
}
