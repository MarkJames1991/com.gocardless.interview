import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './index'

describe('DropdownMenu', () => {
  it('opens and closes when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Currency</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>GBP</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Currency' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Currency' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('calls onSelect and closes after item selection', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Dates</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Last 30 days</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole('button', { name: 'Dates' }))
    await user.click(screen.getByRole('menuitem', { name: 'Last 30 days' }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes when clicking outside content', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button type="button">outside</button>
        <DropdownMenu>
          <DropdownMenuTrigger>Options</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'outside' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
