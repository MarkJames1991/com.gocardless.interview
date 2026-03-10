import {
  SlidingDrawer,
  SlidingDrawerContent,
  SlidingDrawerFooter,
  SlidingDrawerHeader,
} from '../../components/drawer/SlidingDrawer'

type NotificationsDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  return (
    <SlidingDrawer isOpen={isOpen} onClose={onClose}>
      <SlidingDrawerHeader title="Notifications" />
      <SlidingDrawerContent>
        <div className="min-h-[260px]" />
      </SlidingDrawerContent>
      <SlidingDrawerFooter>
        <div className="h-10" />
      </SlidingDrawerFooter>
    </SlidingDrawer>
  )
}
