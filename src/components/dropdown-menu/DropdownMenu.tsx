import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { DropdownMenuContext } from './context'

type DropdownMenuProps = {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenu({
  children,
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange],
  )

  const contextValue = useMemo(
    () => ({
      open: isOpen,
      rootRef,
      setOpen,
    }),
    [isOpen, setOpen, rootRef],
  )

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div ref={rootRef} className={className} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}
