export type TimerMode = 'work' | 'shortBreak' | 'longBreak'

// 任务标签
export interface TaskTag {
  id: string
  name: string
  color: string
  icon: string
  isDefault: boolean
}

// 任务记录
export interface TaskRecord {
  tagId: string
  pomodoros: number
  minutes: number
}

// 历史记录
export interface HistoryRecord {
  id: string
  date: string
  completedPomodoros: number
  totalWorkMinutes: number
  tasks: TaskRecord[]
}

// 音效设置
export interface SoundSettings {
  notificationSound: string
  volume: number
}

// 自动切换设置
export interface AutoSwitchSettings {
  autoStartBreak: boolean
  autoStartWork: boolean
  countdownSeconds: number
}

// 快捷键设置
export interface KeyboardSettings {
  enabled: boolean
  startPause: string
  reset: string
  workMode: string
  shortBreak: string
  longBreak: string
  settings: string
  theme: string
}

// 计时器设置
export interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
  sound: SoundSettings
  autoSwitch: AutoSwitchSettings
  keyboard: KeyboardSettings
  dailyGoal: number
}

// 计时器状态
export interface TimerState {
  mode: TimerMode
  timeLeft: number
  isRunning: boolean
  pomodoroCount: number
  settings: TimerSettings
  history: HistoryRecord[]
  tags: TaskTag[]
  currentTagId: string | null
  autoSwitchCountdown: number | null
}
