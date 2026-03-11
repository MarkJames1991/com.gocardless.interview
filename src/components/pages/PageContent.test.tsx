import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageContent } from './PageContent'

describe('PageContent', () => {
  it('renders heading, actions, and provided description', () => {
    render(<PageContent title="Developers" description="API keys and webhooks." />)

    expect(screen.getByRole('heading', { level: 1, name: 'Developers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create payment' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Import/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument()
    expect(screen.getByText('API keys and webhooks.')).toBeInTheDocument()
  })

  it('falls back to default description when one is not provided', () => {
    render(<PageContent title="Success+" />)

    expect(screen.getByText('Success+ content goes here.')).toBeInTheDocument()
  })

  it('renders payments empty state when emptyState is true', () => {
    render(<PageContent title="Payments" emptyState={true} />)

    expect(
      screen.getByRole('heading', { level: 2, name: "This is where you'll find each payment" }),
    ).toBeInTheDocument()
  })
})

