import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { useDrawerParam } from './useDrawerParam'

function HookHarness({ name }: { name: string }) {
  const drawer = useDrawerParam(name)
  const location = useLocation()

  return (
    <div>
      <p data-testid="search">{location.search}</p>
      <p data-testid="open-state">{drawer.isOpen ? 'open' : 'closed'}</p>
      <p data-testid="extra">{drawer.get('orderId') ?? ''}</p>
      <button type="button" onClick={() => drawer.open({ orderId: 123 })}>
        open
      </button>
      <button type="button" onClick={drawer.close}>
        close
      </button>
    </div>
  )
}

describe('useDrawerParam', () => {
  it('opens with modal and namespaced extras', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/payments']}>
        <HookHarness name="notifications" />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'open' }))

    expect(screen.getByTestId('open-state')).toHaveTextContent('open')
    expect(screen.getByTestId('search')).toHaveTextContent('?modal=notifications')
    expect(screen.getByTestId('search')).toHaveTextContent('notifications.orderId=123')
    expect(screen.getByTestId('extra')).toHaveTextContent('123')
  })

  it('closes to previous history entry when opened by hook', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/payments']}>
        <HookHarness name="notifications" />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'open' }))
    await user.click(screen.getByRole('button', { name: 'close' }))

    expect(screen.getByTestId('open-state')).toHaveTextContent('closed')
    expect(screen.getByTestId('search')).toHaveTextContent('')
  })

  it('sanitizes deep-linked modal query in place when not opened by hook', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter
        initialEntries={[
          '/payments?foo=1&modal=notifications&notifications.orderId=123&notifications.__opened=0',
        ]}
      >
        <HookHarness name="notifications" />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'close' }))

    expect(screen.getByTestId('open-state')).toHaveTextContent('closed')
    expect(screen.getByTestId('search')).toHaveTextContent('?foo=1')
  })
})
