import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PaymentsWrapper } from './PageWrapper'

describe('PageWrapper', () => {
  it('renders provided header and children content', () => {
    render(
      <PaymentsWrapper header={<h1>Header Content</h1>}>
        <p>Body Content</p>
      </PaymentsWrapper>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Header Content' })).toBeInTheDocument()
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })
})

