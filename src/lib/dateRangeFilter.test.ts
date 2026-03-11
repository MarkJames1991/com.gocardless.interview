import { afterEach, describe, expect, it, vi } from 'vitest'
import { matchesTimeRange } from './dateRangeFilter'

describe('matchesTimeRange', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true for anytime', () => {
    expect(matchesTimeRange('1999-01-01', 'anytime')).toBe(true)
  })

  it('matches today and yesterday relative to current date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-11T10:00:00.000Z'))

    expect(matchesTimeRange('2026-03-11', 'today')).toBe(true)
    expect(matchesTimeRange('2026-03-10', 'yesterday')).toBe(true)
    expect(matchesTimeRange('2026-03-09', 'yesterday')).toBe(false)
  })

  it('matches this-week and this-month', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-11T10:00:00.000Z'))

    expect(matchesTimeRange('2026-03-09', 'this-week')).toBe(true)
    expect(matchesTimeRange('2026-03-03', 'this-week')).toBe(false)
    expect(matchesTimeRange('2026-03-01', 'this-month')).toBe(true)
    expect(matchesTimeRange('2026-02-28', 'this-month')).toBe(false)
  })
})

