import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  SlidingDrawer,
  SlidingDrawerContent,
  SlidingDrawerFooter,
  SlidingDrawerHeader,
} from './SlidingDrawer'

describe('SlidingDrawer', () => {
  it('does not render when closed', () => {
    render(
      <SlidingDrawer isOpen={false} onClose={() => {}}>
        <SlidingDrawerHeader title="Filters" />
      </SlidingDrawer>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders header content and footer when open', () => {
    render(
      <SlidingDrawer isOpen={true} onClose={() => {}}>
        <SlidingDrawerHeader title="Filters" />
        <SlidingDrawerContent>
          <p>Date options</p>
        </SlidingDrawerContent>
        <SlidingDrawerFooter>
          <button type="button">Show 0 results</button>
        </SlidingDrawerFooter>
      </SlidingDrawer>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument()
    expect(screen.getByText('Date options')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show 0 results' })).toBeInTheDocument()
  })

  it('calls onClose from the backdrop close control', () => {
    const onClose = vi.fn()

    render(
      <SlidingDrawer isOpen={true} onClose={onClose}>
        <SlidingDrawerHeader title="Filters" />
      </SlidingDrawer>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Close filters' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()

    render(
      <SlidingDrawer isOpen={true} onClose={onClose}>
        <SlidingDrawerHeader title="Filters" />
      </SlidingDrawer>,
    )

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks and unlocks body scroll while open', () => {
    const { rerender } = render(
      <SlidingDrawer isOpen={true} onClose={() => {}}>
        <SlidingDrawerHeader title="Filters" />
      </SlidingDrawer>,
    )

    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <SlidingDrawer isOpen={false} onClose={() => {}}>
        <SlidingDrawerHeader title="Filters" />
      </SlidingDrawer>,
    )

    expect(document.body.style.overflow).toBe('')
  })
})
