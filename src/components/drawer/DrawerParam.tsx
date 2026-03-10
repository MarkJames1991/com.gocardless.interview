import { type ReactNode } from 'react'
import { useDrawerParam } from './hooks/use-drawer-param/useDrawerParam'

type Props = {
  name: string
  children: (ctx: ReturnType<typeof useDrawerParam>) => ReactNode
}

export function DrawerParam({ name, children }: Props) {
  const ctx = useDrawerParam(name)
  return <>{children(ctx)}</>
}
