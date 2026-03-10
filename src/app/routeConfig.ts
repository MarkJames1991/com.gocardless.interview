export type AppRoute = {
  path: string
  title: string
  description?: string
  emptyState?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    path: '/subscription-templates',
    title: 'Subscription templates',
    description: 'Create, organize, and publish subscription templates for customers.',
  },
  {
    path: '/customers',
    title: 'Customers',
    description: 'Find customers, manage mandates, and take new payments.',
  },
  {
    path: '/success-plus',
    title: 'Success+',
    description: 'Recovery and optimization settings for failed payments.',
  },
  {
    path: '/protect-plus',
    title: 'Protect+',
    description: 'Fraud prevention and payment risk monitoring controls.',
  },
  {
    path: '/developers',
    title: 'Developers',
    description: 'API keys, webhooks, and integration settings live here.',
  },
]
