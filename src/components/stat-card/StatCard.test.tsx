import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders title, amount and action link', () => {
    render(
      <StatCard
        actionHref="/payments"
        actionLabel="View all payments"
        amount="0.00 GBP"
        title="Pending payments"
      />,
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Pending payments' })).toBeInTheDocument()
    expect(screen.getByText('0.00 GBP')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View all payments' })).toHaveAttribute('href', '/payments')
  })

  it('uses default link when no href is provided', () => {
    render(<StatCard actionLabel="View payouts" amount="0.00 GBP" title="Pending payouts" />)
    expect(screen.getByRole('link', { name: 'View payouts' })).toHaveAttribute('href', '#')
  })
})
