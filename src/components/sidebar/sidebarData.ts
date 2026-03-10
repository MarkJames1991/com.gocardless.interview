import type { SidebarMenuItem } from './types'

export const primaryMenuItems: SidebarMenuItem[] = [
  { label: 'Home', badge: '3/4', href: '/' },
  {
    label: 'Payments',
    expanded: true,
    children: [
      { label: 'Payments', href: '/payments' },
      { label: 'Subscription templates', href: '/subscription-templates' },
      { label: 'Payouts', href: '/payouts' },
    ],
  },
  { label: 'Customers', href: '/customers' },
]

export const productMenuItems: SidebarMenuItem[] = [
  { label: 'Success+', href: '/success-plus' },
  { label: 'Protect+', href: '/protect-plus' },
  { label: 'Developers', href: '/developers' },
]
