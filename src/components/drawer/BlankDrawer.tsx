import { type ReactNode } from 'react'
import {
  SlidingDrawer,
  SlidingDrawerContent,
  SlidingDrawerFooter,
  SlidingDrawerHeader,
} from './SlidingDrawer'

type BlankDrawerProps = {
  open: boolean
  onCancel: () => void
  width?: number | string
  children?: ReactNode
  footer?: ReactNode
  title?: string
}

export default function BlankDrawer({
  open,
  onCancel,
  children,
  footer,
  title = 'Drawer',
}: BlankDrawerProps) {
  return (
    <SlidingDrawer isOpen={open} onClose={onCancel}>
      <SlidingDrawerHeader title={title} />
      <SlidingDrawerContent>{children}</SlidingDrawerContent>
      {footer ? <SlidingDrawerFooter>{footer}</SlidingDrawerFooter> : null}
    </SlidingDrawer>
  )
}
