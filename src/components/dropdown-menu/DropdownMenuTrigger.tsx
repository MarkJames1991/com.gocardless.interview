import type { ButtonHTMLAttributes } from 'react'
import { Button } from '../button/Button'
import { useDropdownMenuContext } from './context'

type DropdownMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export function DropdownMenuTrigger({ children, className, onClick, ...props }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext()

  return (
    <Button
      aria-expanded={open}
      className={className}
      variant="ghost"
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) {
          return
        }
        setOpen(!open)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
