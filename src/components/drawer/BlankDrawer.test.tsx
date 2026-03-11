import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BlankDrawer from './BlankDrawer'

describe('BlankDrawer', () => {
  it('renders title, content, and footer when provided', () => {
    render(
      <BlankDrawer
        open={true}
        title="Filters"
        footer={<button type="button">Apply</button>}
        onCancel={() => {}}
      >
        <p>Drawer body</p>
      </BlankDrawer>,
    )

    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument()
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  it('uses default title and omits footer when not provided', () => {
    render(
      <BlankDrawer open={true} onCancel={() => {}}>
        <p>Body</p>
      </BlankDrawer>,
    )

    expect(screen.getByRole('heading', { name: 'Drawer' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Apply' })).not.toBeInTheDocument()
  })
})

