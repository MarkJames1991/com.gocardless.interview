export function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" strokeLinecap="round" />
    </svg>
  )
}

export function BellIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M8 17h8l-1.3-1.6a3 3 0 0 1-.7-1.9V10a4 4 0 1 0-8 0v3.5a3 3 0 0 1-.7 1.9L4 17h4Z" strokeLinejoin="round" />
      <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  )
}

export function SettingsIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      <path
        d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7.7 7.7 0 0 0-1.7-1L14.5 3h-5l-.3 2.9a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.5L5 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.7 7.7 0 0 0 1.7 1l.3 2.9h5l.3-2.9a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.6.1-1Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FilterIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 6.75A1.75 1.75 0 0 1 5.75 5h12.5A1.75 1.75 0 0 1 20 6.75c0 .46-.18.9-.5 1.22L14 13.47V18a1 1 0 0 1-.55.9l-2 1A1 1 0 0 1 10 19v-5.53L4.5 7.97A1.72 1.72 0 0 1 4 6.75Z" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 10 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </svg>
  )
}

export function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 19 5" strokeLinecap="round" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function EmptyStateIllustration() {
  return (
    <svg aria-hidden="true" className="h-48 w-48" viewBox="0 0 220 220">
      <g transform="translate(110 108)">
        <ellipse cx="28" cy="48" rx="28" ry="24" fill="#F0B35A" stroke="#8D6131" strokeWidth="1.5" />
        <ellipse cx="28" cy="41" rx="28" ry="24" fill="#F6CC70" stroke="#8D6131" strokeWidth="1.5" />
        <ellipse cx="28" cy="37" rx="22" ry="18" fill="#F9E39A" stroke="#8D6131" strokeWidth="1.2" />
        <g transform="rotate(-30)">
          <ellipse cx="8" cy="-10" rx="45" ry="33" fill="#EBC56B" stroke="#77511E" strokeWidth="1.6" />
          <ellipse cx="8" cy="-16" rx="45" ry="33" fill="#F4D97F" stroke="#77511E" strokeWidth="1.6" />
          <ellipse cx="8" cy="-16" rx="35" ry="24" fill="#F6E39B" stroke="#77511E" strokeWidth="1.2" />
        </g>
        <g transform="translate(-58 -28) rotate(12)">
          <polygon points="0,-16 13,-8 10,8 -4,17 -16,4 -14,-9" fill="#4ED0B8" stroke="#236B71" strokeWidth="1.5" />
          <path d="M0-16 1 16M-14-9 13-8M-16 4 10 8" fill="none" stroke="#236B71" strokeWidth="1.2" />
        </g>
        <g transform="translate(-36 56) rotate(28)">
          <rect x="-12" y="-4" width="24" height="8" rx="2.5" fill="#D9BEEA" stroke="#7E5F90" strokeWidth="1.2" />
          <path d="M-6 -4v8" stroke="#7E5F90" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  )
}
