import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders button text and supports click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Create payment</Button>)
    await user.click(screen.getByRole('button', { name: 'Create payment' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('supports variants and sizes through class names', () => {
    render(
      <Button size="lg" variant="secondary">
        Secondary
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Secondary' })
    expect(button.className).toContain('bg-[#f0ede7]')
    expect(button.className).toContain('h-12')
  })

  it('renders loading state and disables interaction', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button isLoading onClick={onClick}>
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeDisabled()
    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('supports asChild rendering', () => {
    render(
      <Button asChild variant="ghost">
        <a href="/payments">View payments</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'View payments' })
    expect(link).toHaveAttribute('href', '/payments')
    expect(link.className).toContain('bg-transparent')
  })
})
