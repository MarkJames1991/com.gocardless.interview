export type TimeRange = 'anytime' | 'today' | 'yesterday' | 'this-week' | 'this-month'

const toDateOnlyString = (value: Date): string => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const isInCurrentWeek = (targetDate: Date, currentDate: Date): boolean => {
  const dayOfWeek = currentDate.getDay()
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const weekStart = new Date(currentDate)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(currentDate.getDate() - mondayOffset)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)

  return targetDate >= weekStart && targetDate <= weekEnd
}

export const matchesTimeRange = (targetDateString: string, timeRange: TimeRange): boolean => {
  if (timeRange === 'anytime') {
    return true
  }

  const targetDate = new Date(`${targetDateString}T00:00:00`)
  const now = new Date()
  const today = toDateOnlyString(now)

  if (timeRange === 'today') {
    return targetDateString === today
  }

  if (timeRange === 'yesterday') {
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    return targetDateString === toDateOnlyString(yesterday)
  }

  if (timeRange === 'this-week') {
    return isInCurrentWeek(targetDate, now)
  }

  return targetDate.getFullYear() === now.getFullYear() && targetDate.getMonth() === now.getMonth()
}

