import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PaymentsFilterForm } from './PaymentsFilterForm'

describe('PaymentsFilterForm', () => {
  it('calls onChange when values change', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<PaymentsFilterForm onClose={() => {}} onChange={onChange} />)
    await user.click(screen.getByRole('radio', { name: 'Charge date' }))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('submits selected values and closes', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onClose = vi.fn()

    render(<PaymentsFilterForm onClose={onClose} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('radio', { name: 'Charge date' }))
    await user.click(screen.getByRole('radio', { name: 'Today' }))
    await user.click(screen.getByRole('button', { name: 'Show results' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ dateType: 'charge', timeRange: 'today' })
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('resets filters and calls clear handlers', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onClear = vi.fn()

    render(<PaymentsFilterForm onClose={() => {}} onChange={onChange} onClear={onClear} />)

    await user.click(screen.getByRole('radio', { name: 'Charge date' }))
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))

    await waitFor(() => {
      expect(onClear).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalled()
    })
  })
})

