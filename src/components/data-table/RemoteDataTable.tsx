import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { DataTable, type DataTableProps } from './DataTable'

type DataTableRow = Record<string, unknown>

export type RemoteDataTableResult<TData> =
  | TData[]
  | {
      data: TData[]
      total?: number
    }

type ErrorFallbackRenderer = (error: Error, retry: () => void) => ReactNode

export type RemoteDataTableProps<TData extends DataTableRow> = Omit<
  DataTableProps<TData>,
  'data' | 'resultLabel'
> & {
  dependencies?: readonly unknown[]
  errorFallback?: ReactNode | ErrorFallbackRenderer
  fetchData: () => Promise<RemoteDataTableResult<TData>>
  keepPreviousData?: boolean
  loadingFallback?: ReactNode
}

const EMPTY_DEPENDENCIES: readonly unknown[] = []

const isWrappedResult = <TData extends DataTableRow>(
  value: RemoteDataTableResult<TData>,
): value is { data: TData[]; total?: number } => {
  return !Array.isArray(value)
}

export function RemoteDataTable<TData extends DataTableRow>({
  dependencies = EMPTY_DEPENDENCIES,
  errorFallback,
  fetchData,
  keepPreviousData = true,
  loadingFallback,
  ...tableProps
}: RemoteDataTableProps<TData>) {
  const [data, setData] = useState<TData[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [reloadCount, setReloadCount] = useState(0)
  const dependenciesKey = useMemo(
    () => dependencies.map((dependency) => String(dependency)).join('|'),
    [dependencies],
  )

  const retry = () => {
    setReloadCount((value) => value + 1)
  }

  useEffect(() => {
    let isActive = true

    const load = async () => {
      setIsLoading(true)
      setError(null)
      if (!keepPreviousData) {
        setData([])
        setTotal(null)
      }

      try {
        const result = await fetchData()

        if (!isActive) {
          return
        }

        if (isWrappedResult(result)) {
          setData(result.data)
          setTotal(typeof result.total === 'number' ? result.total : result.data.length)
          return
        }

        setData(result)
        setTotal(result.length)
      } catch (caughtError) {
        if (!isActive) {
          return
        }

        setError(caughtError instanceof Error ? caughtError : new Error('Failed to load table data'))
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      isActive = false
    }
  }, [dependenciesKey, fetchData, keepPreviousData, reloadCount])

  if (isLoading && data.length === 0) {
    return (
      <>
        {loadingFallback ?? (
          <div className="rounded-xl border border-[#d9d3cc] bg-white px-4 py-6 text-sm text-[#76716a]">
            Loading table data...
          </div>
        )}
      </>
    )
  }

  if (error && data.length === 0) {
    if (typeof errorFallback === 'function') {
      return <>{errorFallback(error, retry)}</>
    }

    return (
      <>
        {errorFallback ?? (
          <div className="rounded-xl border border-[#d9d3cc] bg-white px-4 py-6 text-sm text-[#5e3f3b]">
            <p>Failed to load table data.</p>
            <button
              className="mt-3 rounded-full border border-[#d9d3cc] px-3 py-1.5 text-sm font-semibold text-[#2b2824]"
              type="button"
              onClick={retry}
            >
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  return (
    <DataTable
      {...tableProps}
      data={data}
      resultLabel={`(${total ?? data.length} results)${isLoading ? ' Updating...' : ''}`}
    />
  )
}
