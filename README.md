# GoCardless Interview Exercise

This repository contains a frontend implementation of a GoCardless-style dashboard using React, TypeScript, Vite, and Tailwind CSS.

It includes:
- App shell with responsive sidebar and top navigation
- Payments, Payouts, and Customers pages
- Reusable `DataTable` with sorting, pagination, and pluggable filter drawer
- `RemoteDataTable` wrapper for async data loading
- Sliding drawer infrastructure and URL-param drawer hook
- Unit and integration tests (Vitest + Testing Library)

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Ant Design (`Form`) for filter forms
- Vitest + Testing Library for tests

## Run Locally

### Prerequisites
- Node.js 20+
- Yarn 1.22+

### Install
```bash
yarn
```

### Start dev server
```bash
yarn dev
```

### Build
```bash
yarn build
```

### Lint
```bash
yarn lint
```

### Test
```bash
yarn test
```

## Environment

Optional:
- `VITE_API_PATH` (used by `ServiceCall` for API base path)

If omitted, requests use relative endpoints.

## Project Structure (high level)

- `src/app` - shell, routes, route config
- `src/components`
  - `data-table` - reusable table + pagination provider + remote wrapper
  - `drawer` - sliding drawer primitives + URL param integration
  - `sidebar`, `button`, `stat-card`, `dropdown-menu`, etc.
- `src/pages`
  - `home`, `payments`, `payouts`, `customers`
- `src/services`
  - `ServiceCall`
  - dashboard data hooks

## Testing Approach

The suite focuses on behavior:
- Routing and app integration
- Sidebar interactions (desktop + mobile)
- Drawer open/close and URL param behavior
- DataTable sorting, pagination, filter drawer integration
- RemoteDataTable loading/error/retry/refetch behavior
- Payments/Payouts/Customers page-level filtering and rendering

Current status: all tests pass with `yarn test`.

## Notes / Tradeoffs

- UI and interactions are intentionally componentized for interview readability and incremental extension.
- Some data is stubbed locally to demonstrate behavior without backend dependency.
- Vite build currently warns about bundle chunk size; this is expected in current scope and can be addressed with route-level code splitting if needed.
