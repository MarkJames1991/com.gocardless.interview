import { useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Extra = Record<string, string | number | boolean | null | undefined>
const OPENED_MARKER = '__opened'

function toSearch(qs: URLSearchParams) {
  const s = qs.toString()
  return s ? `?${s}` : ''
}

export function useDrawerParam(name: string) {
  const [search] = useSearchParams()
  const navigate = useNavigate()

  const isOpen = useMemo(() => search.get('modal') === name, [search, name])

  /** Open this modal. Pushes a new history entry by default. */
  const open = useCallback(
    (extra?: Extra, replace = false) => {
      const next = new URLSearchParams(search)

      // mark this modal as open
      next.set('modal', name)

      // clear old namespaced params for this modal (avoid stale values)
      for (const key of Array.from(next.keys())) {
        if (key.startsWith(name + '.')) next.delete(key)
      }

      // mark the entry as one created by this hook
      next.set(`${name}.${OPENED_MARKER}`, '1')

      // set namespaced extras (invite.person, refund.orderId, etc.)
      if (extra) {
        for (const [k, v] of Object.entries(extra)) {
          const key = `${name}.${k}`
          if (v === null || v === undefined) next.delete(key)
          else next.set(key, String(v))
        }
      }

      navigate({ search: toSearch(next) }, { replace })
    },
    [navigate, search, name],
  )

  /**
   * Close this modal.
   * If opened by the hook, pop history (single Back behavior).
   * If deep-linked, sanitize URL in place via replace.
   */
  const close = useCallback(() => {
    const isCurrentModal = search.get('modal') === name
    const openedByHook = search.get(`${name}.${OPENED_MARKER}`) === '1'

    if (isCurrentModal && openedByHook) {
      navigate(-1)
      return
    }

    const next = new URLSearchParams(search)
    next.delete('modal')
    for (const key of Array.from(next.keys())) {
      if (key.startsWith(name + '.')) next.delete(key)
    }
    navigate({ search: toSearch(next) }, { replace: true })
  }, [navigate, search, name])

  /** Read a namespaced param belonging to this modal. */
  const get = useCallback((key: string) => search.get(`${name}.${key}`), [search, name])

  return { isOpen, open, close, get, search }
}
