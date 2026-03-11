import { type ReactNode, useEffect } from 'react'

type SlidingDrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

type SlidingDrawerHeaderProps = {
  title: string
}

type SlidingDrawerContentProps = {
  children: ReactNode
}

type SlidingDrawerFooterProps = {
  children: ReactNode
}

export function SlidingDrawer({ isOpen, onClose, children }: SlidingDrawerProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div
      aria-modal={isOpen ? 'true' : undefined}
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role={isOpen ? 'dialog' : undefined}
    >
      <button
        aria-label="Close filters"
        className={`relative h-full flex-1 text-white transition-opacity duration-300 ${
          isOpen ? 'bg-black/35 opacity-100' : 'bg-black/0 opacity-0'
        }`}
        disabled={!isOpen}
        type="button"
        onClick={onClose}
      >
        <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1e1e1c] text-2xl leading-none">
          x
        </span>
      </button>

      <div
        className={`h-full w-[min(92vw,548px)] border-l border-stroke bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function SlidingDrawerHeader({ title }: SlidingDrawerHeaderProps) {
  return (
    <header className="border-b border-stroke p-3 flex flex-col justify-center">
      <h2 className="text-2xl font-medium text-[#262320]">{title}</h2>
    </header>
  )
}

export function SlidingDrawerContent({ children }: SlidingDrawerContentProps) {
  return <div className="max-h-[calc(100vh-244px)] overflow-y-auto px-12 py-10">{children}</div>
}

export function SlidingDrawerFooter({ children }: SlidingDrawerFooterProps) {
  return <footer className="border-t border-stroke p-3">{children}</footer>
}
