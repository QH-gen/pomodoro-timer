export type TimerMode = 'work' | 'shortBreak' | 'longBreak'

export interface TimerSettings {
  workDuration: number        // 分钟
  shortBreakDuration: number  // 分钟
  longBreakDuration: number   // 分钟
  longBreakInterval: number   // 每 N 个番茄后长休息
}

export interface HistoryRecord {
  id: string
  date: string        // YYYY-MM-DD
  completedPomodoros: number
  totalWorkMinutes: number
}

export interface TimerState {
  mode: TimerMode
  timeLeft: number          // 剩余秒数
  isRunning: boolean
  pomodoroCount: number
  settings: TimerSettings
  history: HistoryRecord[]
}
