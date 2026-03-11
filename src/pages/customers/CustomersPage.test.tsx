import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CustomersPage } from './CustomersPage'

describe('CustomersPage', () => {
  it('renders remote table stub data', async () => {
    render(
      <MemoryRouter initialEntries={['/customers']}>
        <CustomersPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading table data...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Ava Carter')).toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'Customers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Filter/ })).toHaveTextContent('(18 results)')
    expect(screen.getByRole('columnheader', { name: 'Customer' })).toBeInTheDocument()
  })
})

