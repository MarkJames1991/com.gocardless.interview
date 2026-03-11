import { useDataTablePagination } from './pagination-store'

type DataTablePaginationProps = {
  dataLength: number
}

export function DataTablePagination({ dataLength }: DataTablePaginationProps) {
  const {
    canGoNext,
    canGoPrevious,
    goNext,
    goPrevious,
    pageSizeOptions,
    rowsPerPage,
    setRowsPerPage,
  } = useDataTablePagination()

  if (dataLength <= 0) {
    return null
  }

  return (
    <footer className="flex items-center justify-between border-t border-[#d9d3cc] px-4 py-3 text-[#2c2924]">
      <div className="flex items-center gap-4">
        <label className="font-normal tracking-[-0.03em]" htmlFor="items-per-page">
          Items per page
        </label>
        <div className="relative">
          <select
            id="items-per-page"
            className="h-11 min-w-[80px] appearance-none rounded-xl border border-[#9f978d] bg-transparent px-3 pr-9 text-[1.85rem] tracking-[-0.03em] outline-none"
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(Number(event.target.value))}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2c2924]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Previous page"
          className="inline-flex h-8 w-8 items-center justify-center text-[#b8b2aa] transition enabled:text-[#7b746b] enabled:hover:text-[#5f5952] disabled:cursor-not-allowed"
          disabled={!canGoPrevious}
          type="button"
          onClick={goPrevious}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label="Next page"
          className="inline-flex h-8 w-8 items-center justify-center text-[#b8b2aa] transition enabled:text-[#7b746b] enabled:hover:text-[#5f5952] disabled:cursor-not-allowed"
          disabled={!canGoNext}
          type="button"
          onClick={goNext}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
