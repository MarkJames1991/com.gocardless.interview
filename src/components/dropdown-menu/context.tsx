import type { RefObject } from 'react'
import { createContext, useContext } from 'react'

type DropdownMenuContextValue = {
  open: boolean
  rootRef: RefObject<HTMLDivElement | null>
  setOpen: (value: boolean) => void
}

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

export function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('Dropdown menu components must be used within <DropdownMenu>.')
  }
  return context
}
