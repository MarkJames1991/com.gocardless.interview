import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SidebarMenu } from './SidebarMenu'
import { primaryMenuItems, productMenuItems } from './sidebarData'

function renderSidebar(
  initialEntries: string[] = ['/payments'],
  primaryItems = primaryMenuItems,
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SidebarMenu primaryItems={primaryItems} secondaryItems={productMenuItems} />
    </MemoryRouter>,
  )
}

describe('SidebarMenu', () => {
  it('renders top-level items and links', () => {
    renderSidebar()

    const navigation = screen.getByRole('navigation', { name: 'Primary' })

    expect(navigation).toBeInTheDocument()
    expect(within(navigation).getByText('Home')).toBeInTheDocument()
    expect(within(navigation).getByText('3/4')).toBeInTheDocument()
    expect(within(navigation).getByRole('link', { name: /Home/ })).toHaveAttribute('href', '/')
    expect(within(navigation).getByRole('link', { name: 'Customers' })).toHaveAttribute('href', '/customers')
    expect(within(navigation).getByRole('link', { name: 'Success+' })).toHaveAttribute('href', '/success-plus')
  })

  it('opens the nested section when one of its child routes is active', () => {
    renderSidebar(['/payments'])

    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    const paymentsToggle = within(navigation).getByRole('button', { name: 'Payments' })

    expect(paymentsToggle).toHaveAttribute('aria-expanded', 'true')
    expect(within(navigation).getByRole('link', { name: 'Payments' })).toHaveAttribute('href', '/payments')
    expect(within(navigation).getByText('Subscription templates')).toBeInTheDocument()
    expect(within(navigation).getByText('Payouts')).toBeInTheDocument()
  })

  it('collapses and expands nested sections when clicked', async () => {
    const user = userEvent.setup()
    const collapsedItems = primaryMenuItems.map((item) =>
      item.label === 'Payments' ? { ...item, expanded: false } : item,
    )

    renderSidebar(['/customers'], collapsedItems)

    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    const paymentsToggle = within(navigation).getByRole('button', { name: 'Payments' })
    const nestedRegion = document.getElementById(paymentsToggle.getAttribute('aria-controls') ?? '')

    expect(paymentsToggle).toHaveAttribute('aria-expanded', 'false')
    expect(nestedRegion).toHaveAttribute('aria-hidden', 'true')
    expect(nestedRegion).toHaveClass('grid-rows-[0fr]')

    await user.click(paymentsToggle)

    expect(paymentsToggle).toHaveAttribute('aria-expanded', 'true')
    expect(nestedRegion).toHaveAttribute('aria-hidden', 'false')
    expect(nestedRegion).toHaveClass('grid-rows-[1fr]')
    expect(within(navigation).getByText('Subscription templates')).toBeInTheDocument()

    await user.click(paymentsToggle)

    expect(paymentsToggle).toHaveAttribute('aria-expanded', 'false')
    expect(nestedRegion).toHaveAttribute('aria-hidden', 'true')
  })
})
