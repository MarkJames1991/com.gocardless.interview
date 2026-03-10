import type { ButtonHTMLAttributes } from 'react'
import { useDropdownMenuContext } from './context'

type DropdownMenuItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> & {
  closeOnSelect?: boolean
  onSelect?: () => void
}

export function DropdownMenuItem({
  children,
  className,
  closeOnSelect = true,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext()

  return (
    <button
      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-[#262320] hover:bg-[#f2eee8] ${className ?? ''}`}
      role="menuitem"
      type="button"
      onClick={() => {
        onSelect?.()
        if (closeOnSelect) {
          setOpen(false)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}
