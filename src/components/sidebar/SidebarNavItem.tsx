import { useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarChevronIcon } from './SidebarChevronIcon'
import type { SidebarMenuItem } from './types'

type SidebarNavItemProps = {
  item: SidebarMenuItem
  nested?: boolean
  onNavigate?: () => void
}

export function SidebarNavItem({ item, nested = false, onNavigate }: SidebarNavItemProps) {
  const location = useLocation()
  const regionId = useId()
  const hasChildren = Boolean(item.children?.length)
  const hasActiveChild = item.children?.some((child) => child.href === location.pathname) ?? false
  const [isExpanded, setIsExpanded] = useState(item.expanded ?? false)
  const sectionExpanded = hasActiveChild || isExpanded
  const isActiveLeaf = Boolean(item.href && location.pathname === item.href)
  const isActiveNestedItem = nested && isActiveLeaf
  const itemClasses = [
    'flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-[1.02rem] font-medium',
    nested ? 'text-white/88' : 'text-white/90',
    sectionExpanded || isActiveLeaf ? 'text-white' : '',
    isActiveNestedItem ? 'bg-white/6 text-white' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      {hasChildren ? (
        <button
          aria-controls={regionId}
          aria-expanded={sectionExpanded}
          className={itemClasses}
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          <span>{item.label}</span>
          <SidebarChevronIcon open={sectionExpanded} />
        </button>
      ) : (
        <div className={isActiveNestedItem ? '-ml-8 flex items-stretch lg:-ml-9' : undefined}>
          {isActiveNestedItem ? (
            <span aria-hidden="true" className="w-1 shrink-0 rounded-r-full bg-[#e6ea47]" />
          ) : null}
          <div className={isActiveNestedItem ? 'flex-1 pl-7 lg:pl-8' : undefined}>
            {item.href ? (
              <NavLink className={itemClasses} to={item.href} onClick={onNavigate}>
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-sm font-bold text-[#1f1d1a]">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ) : (
              <div className={itemClasses}>
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-sm font-bold text-[#1f1d1a]">
                    {item.badge}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {hasChildren ? (
        <div
          aria-hidden={!sectionExpanded}
          className={`grid overflow-x-visible overflow-y-hidden transition-all duration-300 ease-out ${
            sectionExpanded ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
          id={regionId}
        >
          <div className="min-h-0 border-l border-white/10 pl-4">
            {item.children?.map((child) => (
              <SidebarNavItem key={child.label} item={child} nested onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
