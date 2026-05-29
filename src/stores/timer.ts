import { defineStore } from 'pinia'
import type { TimerMode, TimerSettings, HistoryRecord, TimerState } from '../types/timer'

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
}

function getToday(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    mode: 'work',
    timeLeft: DEFAULT_SETTINGS.workDuration * 60,
    isRunning: false,
    pomodoroCount: 0,
    settings: { ...DEFAULT_SETTINGS },
    history: [],
  }),

  getters: {
    totalTime(state): number {
      switch (state.mode) {
        case 'work': return state.settings.workDuration * 60
        case 'shortBreak': return state.settings.shortBreakDuration * 60
        case 'longBreak': return state.settings.longBreakDuration * 60
      }
    },

    progress(state): number {
      return Math.max(0, Math.min(1, 1 - state.timeLeft / this.totalTime))
    },

    todayRecord(state): HistoryRecord {
      const today = getToday()
      return state.history.find(r => r.date === today) ?? {
        id: generateId(),
        date: today,
        completedPomodoros: 0,
        totalWorkMinutes: 0,
      }
    },
  },

  actions: {
    tick() {
      if (this.timeLeft > 0) {
        this.timeLeft--
      }
    },

    start() {
      this.isRunning = true
    },

    pause() {
      this.isRunning = false
    },

    reset() {
      this.isRunning = false
      this.timeLeft = this.totalTime
    },

    completeCycle() {
      this.isRunning = false

      if (this.mode === 'work') {
        this.pomodoroCount++
        this.recordPomodoro()

        if (this.pomodoroCount % this.settings.longBreakInterval === 0) {
          this.switchMode('longBreak')
        } else {
          this.switchMode('shortBreak')
        }
      } else {
        this.switchMode('work')
      }
    },

    switchMode(mode: TimerMode) {
      this.mode = mode
      this.isRunning = false
      switch (mode) {
        case 'work':
          this.timeLeft = this.settings.workDuration * 60
          break
        case 'shortBreak':
          this.timeLeft = this.settings.shortBreakDuration * 60
          break
        case 'longBreak':
          this.timeLeft = this.settings.longBreakDuration * 60
          break
      }
    },

    recordPomodoro() {
      const today = getToday()
      const existing = this.history.find(r => r.date === today)

      if (existing) {
        existing.completedPomodoros++
        existing.totalWorkMinutes += this.settings.workDuration
      } else {
        this.history.push({
          id: generateId(),
          date: today,
          completedPomodoros: 1,
          totalWorkMinutes: this.settings.workDuration,
        })
      }

      // 保留最近 30 天
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 30)
      const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-${String(cutoff.getDate()).padStart(2, '0')}`
      this.history = this.history.filter(r => r.date >= cutoffStr)
    },

    updateSettings(settings: Partial<TimerSettings>) {
      const validated = { ...settings }
      if (validated.workDuration !== undefined) validated.workDuration = Math.max(1, validated.workDuration)
      if (validated.shortBreakDuration !== undefined) validated.shortBreakDuration = Math.max(1, validated.shortBreakDuration)
      if (validated.longBreakDuration !== undefined) validated.longBreakDuration = Math.max(1, validated.longBreakDuration)
      if (validated.longBreakInterval !== undefined) validated.longBreakInterval = Math.max(2, validated.longBreakInterval)
      Object.assign(this.settings, validated)
      if (!this.isRunning) {
        this.timeLeft = this.totalTime
      }
    },
  },

  persist: true,
})
