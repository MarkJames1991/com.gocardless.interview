import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Sidebar } from './Sidebar'

function renderSidebar() {
  return render(
    <MemoryRouter initialEntries={['/customers']}>
      <Sidebar />
    </MemoryRouter>,
  )
}

describe('Sidebar mobile behavior', () => {
  it('toggles mobile panel visibility', async () => {
    const user = userEvent.setup()
    renderSidebar()

    const menuButton = screen.getByRole('button', { name: 'Menu' })
    const panel = screen.getByTestId('sidebar-panel')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(panel.className).toContain('hidden')

    await user.click(menuButton)

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true')
    expect(panel.className).toContain('flex')
  })

  it('closes the mobile panel after navigation click', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await user.click(screen.getByRole('link', { name: 'Customers' }))

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByTestId('sidebar-panel').className).toContain('hidden')
  })
})
