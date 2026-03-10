import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'

function renderApp(initialEntries: string[] = ['/payments']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing and layout', () => {
  it('renders the home dashboard route', () => {
    renderApp(['/'])

    expect(screen.getByRole('heading', { level: 1, name: 'Today' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Account health' })).toBeInTheDocument()
    expect(screen.getByText('Pending payments')).toBeInTheDocument()
    expect(screen.getByText('Confirmed funds')).toBeInTheDocument()
    expect(screen.getByText('Pending payouts')).toBeInTheDocument()
  })

  it('renders the payments table route', () => {
    renderApp(['/payments'])

    expect(screen.getByRole('heading', { level: 1, name: 'Payments' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Filter/ })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Customer' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Charge date' })).toBeInTheDocument()
  })

  it('renders page content for non-empty routes', () => {
    renderApp(['/developers'])

    expect(screen.getByRole('heading', { level: 1, name: 'Developers' })).toBeInTheDocument()
    expect(
      screen.getByText('API keys, webhooks, and integration settings live here.'),
    ).toBeInTheDocument()
  })

  it('renders the payouts table route', () => {
    renderApp(['/payouts'])

    expect(screen.getByRole('heading', { level: 1, name: 'Payouts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Filter/ })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Recipient' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Payout date' })).toBeInTheDocument()
  })

  it('navigates when a sidebar link is clicked', async () => {
    const user = userEvent.setup()
    renderApp(['/customers'])

    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    await user.click(within(navigation).getByRole('link', { name: 'Developers' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Developers' })).toBeInTheDocument()
    expect(within(navigation).getByRole('link', { name: 'Developers' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('opens and closes notifications drawer from header action', async () => {
    const user = userEvent.setup()
    renderApp(['/'])

    await user.click(screen.getByRole('button', { name: 'Notifications' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close filters' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  });
});
