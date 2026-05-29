import type { HistoryRecord, TaskTag } from '../types/timer'

export function getChartData(records: HistoryRecord[], days: number) {
  const today = new Date()
  const dates: string[] = []
  const counts: number[] = []
  const minutes: number[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const record = records.find(r => r.date === dateStr)

    dates.push(`${d.getMonth() + 1}/${d.getDate()}`)
    counts.push(record?.completedPomodoros ?? 0)
    minutes.push(record?.totalWorkMinutes ?? 0)
  }

  return { dates, counts, minutes }
}

export function getTagChartData(records: HistoryRecord[], tags: TaskTag[]) {
  const tagMap = new Map<string, number>()

  for (const record of records) {
    for (const task of record.tasks) {
      tagMap.set(task.tagId, (tagMap.get(task.tagId) ?? 0) + task.pomodoros)
    }
  }

  const labels: string[] = []
  const data: number[] = []
  const colors: string[] = []

  for (const tag of tags) {
    const count = tagMap.get(tag.id) ?? 0
    if (count > 0) {
      labels.push(tag.name)
      data.push(count)
      colors.push(tag.color)
    }
  }

  return { labels, data, colors }
}

export const chartColors = {
  primary: 'rgba(196, 113, 92, 1)',
  primaryLight: 'rgba(196, 113, 92, 0.2)',
  accent: 'rgba(139, 92, 246, 1)',
  accentLight: 'rgba(139, 92, 246, 0.2)',
  grid: 'rgba(196, 113, 92, 0.1)',
  text: 'rgba(100, 80, 70, 0.8)',
}
