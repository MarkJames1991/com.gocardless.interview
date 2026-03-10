import { type HTMLAttributes, useEffect, useRef } from 'react'
import { useDropdownMenuContext } from './context'

type DropdownMenuContentProps = HTMLAttributes<HTMLDivElement>

export function DropdownMenuContent({ children, className, ...props }: DropdownMenuContentProps) {
  const { open, rootRef, setOpen } = useDropdownMenuContext()
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!contentRef.current) {
        return
      }
      const target = event.target as Node
      const isInsideMenuRoot = rootRef.current?.contains(target) ?? false

      if (!isInsideMenuRoot && !contentRef.current.contains(target)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open, rootRef, setOpen])

  if (!open) {
    return null
  }

  return (
    <div
      ref={contentRef}
      className={`absolute z-40 mt-2 min-w-[180px] rounded-xl border border-[#d8d2c8] bg-white p-1 shadow-lg ${className ?? ''}`}
      role="menu"
      {...props}
    >
      {children}
    </div>
  )
}
