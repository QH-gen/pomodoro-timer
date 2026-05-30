import type { HistoryRecord } from '../types/timer'

export function getChartData(records: HistoryRecord[], days: number) {
  const today = new Date()
  const dates: string[] = []
  const counts: number[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const record = records.find(r => r.date === dateStr)

    dates.push(`${d.getMonth() + 1}/${d.getDate()}`)
    counts.push(record?.completedPomodoros ?? 0)
  }

  return { dates, counts }
}

export const chartColors = {
  primary: 'rgba(196, 113, 92, 1)',
  primaryLight: 'rgba(196, 113, 92, 0.2)',
  grid: 'rgba(196, 113, 92, 0.1)',
  text: 'rgba(100, 80, 70, 0.8)',
}
