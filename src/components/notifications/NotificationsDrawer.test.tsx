import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NotificationsDrawer } from './NotificationsDrawer'

describe('NotificationsDrawer', () => {
  it('renders drawer title when open', () => {
    render(<NotificationsDrawer isOpen={true} onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument()
  })

  it('calls onClose from the close control', () => {
    const onClose = vi.fn()
    render(<NotificationsDrawer isOpen={true} onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: 'Close filters' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

