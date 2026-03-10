type SidebarChevronIconProps = {
  open?: boolean
}

export function SidebarChevronIcon({ open = false }: SidebarChevronIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
