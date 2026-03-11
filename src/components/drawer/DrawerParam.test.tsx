import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DrawerParam } from './DrawerParam'
import { useDrawerParam } from './hooks/use-drawer-param/useDrawerParam'

vi.mock('./hooks/use-drawer-param/useDrawerParam', () => ({
  useDrawerParam: vi.fn(),
}))

const mockedUseDrawerParam = vi.mocked(useDrawerParam)

describe('DrawerParam', () => {
  it('passes hook context to render prop', () => {
    mockedUseDrawerParam.mockReturnValue({
      close: vi.fn(),
      get: vi.fn(),
      isOpen: true,
      open: vi.fn(),
      search: new URLSearchParams('modal=filters'),
    })

    render(
      <DrawerParam name="filters">
        {(ctx) => <p>{ctx.isOpen ? 'open' : 'closed'}</p>}
      </DrawerParam>,
    )

    expect(mockedUseDrawerParam).toHaveBeenCalledWith('filters')
    expect(screen.getByText('open')).toBeInTheDocument()
  })
})

