import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageTitle } from './PageTitle'

describe('PageTitle', () => {
  it('renders an h1 title', () => {
    render(<PageTitle title="Payments" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Payments' })).toBeInTheDocument()
  })
})

