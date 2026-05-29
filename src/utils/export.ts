import type { HistoryRecord, TaskTag } from '../types/timer'

export function exportJSON(data: { history: HistoryRecord[]; tags: TaskTag[] }) {
  const json = JSON.stringify(data, null, 2)
  downloadFile(json, 'pomodoro-data.json', 'application/json')
}

export function exportCSV(records: HistoryRecord[], tags: TaskTag[]) {
  const tagMap = new Map(tags.map(t => [t.id, t.name]))

  const header = '日期,完成番茄数,专注分钟数,标签,标签番茄数,标签分钟数'
  const rows = records.flatMap(record => {
    if (record.tasks.length === 0) {
      return [[record.date, record.completedPomodoros, record.totalWorkMinutes, '', '', ''].join(',')]
    }
    return record.tasks.map(task => [
      record.date,
      record.completedPomodoros,
      record.totalWorkMinutes,
      tagMap.get(task.tagId) ?? task.tagId,
      task.pomodoros,
      task.minutes,
    ].join(','))
  })

  const bom = '﻿'
  const csv = bom + [header, ...rows].join('\n')
  downloadFile(csv, 'pomodoro-data.csv', 'text/csv;charset=utf-8')
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
