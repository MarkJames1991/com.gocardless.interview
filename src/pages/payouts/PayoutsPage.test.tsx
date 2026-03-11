import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PayoutsPage } from './PayoutsPage'

describe('PayoutsPage filters', () => {
  it('updates table results when a filter value changes', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/payouts']}>
        <PayoutsPage />
      </MemoryRouter>,
    )

    const filterButton = screen.getByRole('button', { name: /^Filter/ })
    expect(filterButton).toHaveTextContent('(12 results)')

    await user.click(filterButton)
    await user.click(screen.getByRole('radio', { name: 'Today' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^Filter/ })).not.toHaveTextContent('(12 results)')
    })
  })
})

