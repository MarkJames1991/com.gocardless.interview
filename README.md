# GoCardless Frontend Interview Submission

This project is structured and documented for **technical review**.  
It demonstrates product-quality frontend engineering around component design, state boundaries, test coverage, and maintainability.

## What Was Built

- Responsive dashboard shell (sidebar + top actions)
- Route-based pages:
  - Home
  - Payments
  - Payouts
  - Customers (remote table stub)
- Reusable table system:
  - `DataTable` (sorting, pagination, filter entry point)
  - Pagination provider + extracted pagination UI
  - `RemoteDataTable` (async loading/error/retry/total handling)
- Drawer system:
  - Sliding drawer primitives
  - URL param state hook (`useDrawerParam`)
- Ant Design form-driven filters for Payments and Payouts

## Reviewer Quick Start

```bash
yarn
yarn lint
yarn test
yarn build
yarn dev
```

Prereqs:
- Node.js 20+
- Yarn 1.22+

## How To Review (Suggested Order)

1. `src/components/data-table`
   - `DataTable.tsx` (composition)
   - `DataTableContent.tsx` (state orchestration)
   - `DataTableTable.tsx` (rendering + sortable headers)
   - `DataTablePagination.tsx` + provider/store
   - `RemoteDataTable.tsx` (async wrapper)
2. `src/components/drawer`
   - drawer primitives and URL-param hook behavior
3. `src/pages/payments` and `src/pages/payouts`
   - filter form integration and data filtering
4. `src/pages/customers/CustomersPage.tsx`
   - remote table stub pattern for backend wiring

## Engineering Decisions

- **Composition over monoliths**: DataTable was split into focused modules (toolbar, table, sorting, pagination context/provider) to isolate responsibilities.
- **State boundaries**:
  - Pagination state in dedicated provider/store.
  - Sort state local to table content.
  - Route-driven drawer state for deep-linkability/back-button behavior.
- **Remote wrapper abstraction**:
  - `RemoteDataTable` normalizes loading/error/retry and optional remote total count.
  - Keeps page-level code minimal and backend integration straightforward.
- **Type safety**:
  - Strong generics for table rows/columns and service-layer hooks.

## Test Strategy

The test suite is behavior-focused and includes:

- Unit coverage for:
  - sorting helpers
  - pagination provider behavior
  - drawer wrappers and notifications drawer
  - filter forms (change/clear/submit)
- Component integration coverage for:
  - DataTable interactions (sorting, pagination, filter drawer integration)
  - RemoteDataTable async states (loading/error/retry/refetch)
- Route/page coverage for:
  - App routing and navigation
  - Payments/Payouts/Customers table and filtering behavior

Current status:
- `yarn test` passes (full suite)
- `yarn lint` passes
- `yarn build` passes

## Tradeoffs and Follow-Ups

- Data for Payments/Payouts/Customers is currently stubbed to keep the exercise self-contained.
- Build warns on bundle size; next iteration would add route-level code splitting and chunk strategy.
- If connected to production APIs, next steps would include:
  - React Query provider integration at app root
  - request cancellation + retry policies
  - accessibility audit pass (focus management and keyboard-only UX review)

## Environment

Optional:
- `VITE_API_PATH` for `ServiceCall` base URL.

If omitted, endpoints are resolved as relative paths.
