import { defineStore } from 'pinia'
import type {
  TimerMode, TimerSettings, HistoryRecord, TimerState,
  TaskTag, SoundSettings, AutoSwitchSettings, KeyboardSettings,
} from '../types/timer'

const DEFAULT_SOUND: SoundSettings = {
  notificationSound: 'default',
  volume: 50,
}

const DEFAULT_AUTO_SWITCH: AutoSwitchSettings = {
  autoStartBreak: true,
  autoStartWork: true,
  countdownSeconds: 3,
}

const DEFAULT_KEYBOARD: KeyboardSettings = {
  enabled: true,
  startPause: 'Space',
  reset: 'KeyR',
  workMode: 'Digit1',
  shortBreak: 'Digit2',
  longBreak: 'Digit3',
  settings: 'KeyS',
  theme: 'KeyT',
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  sound: { ...DEFAULT_SOUND },
  autoSwitch: { ...DEFAULT_AUTO_SWITCH },
  keyboard: { ...DEFAULT_KEYBOARD },
  dailyGoal: 8,
}

const DEFAULT_TAGS: TaskTag[] = [
  { id: 'work', name: '工作', color: '#3B82F6', icon: '💼', isDefault: true },
  { id: 'study', name: '学习', color: '#10B981', icon: '📚', isDefault: true },
  { id: 'reading', name: '阅读', color: '#F59E0B', icon: '📖', isDefault: true },
  { id: 'exercise', name: '运动', color: '#EF4444', icon: '🏃', isDefault: true },
  { id: 'meditation', name: '冥想', color: '#8B5CF6', icon: '🧘', isDefault: true },
]

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
    tags: [...DEFAULT_TAGS],
    currentTagId: null,
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
        tasks: [],
      }
    },

    currentTag(state): TaskTag | undefined {
      return state.tags.find(t => t.id === state.currentTagId)
    },

    dailyProgress(state): number {
      const today = getToday()
      const record = state.history.find(r => r.date === today)
      return record ? record.completedPomodoros : 0
    },

    recentHistory(state): HistoryRecord[] {
      return [...state.history].sort((a, b) => b.date.localeCompare(a.date))
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

      const tagId = this.currentTagId ?? 'work'
      const workMinutes = this.settings.workDuration

      if (existing) {
        existing.completedPomodoros++
        existing.totalWorkMinutes += workMinutes
        const taskRecord = existing.tasks.find(t => t.tagId === tagId)
        if (taskRecord) {
          taskRecord.pomodoros++
          taskRecord.minutes += workMinutes
        } else {
          existing.tasks.push({ tagId, pomodoros: 1, minutes: workMinutes })
        }
      } else {
        this.history.push({
          id: generateId(),
          date: today,
          completedPomodoros: 1,
          totalWorkMinutes: workMinutes,
          tasks: [{ tagId, pomodoros: 1, minutes: workMinutes }],
        })
      }

      // 保留最近 90 天
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 90)
      const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-${String(cutoff.getDate()).padStart(2, '0')}`
      this.history = this.history.filter(r => r.date >= cutoffStr)
    },

    updateSettings(settings: Partial<TimerSettings>) {
      const validated = { ...settings }
      if (validated.workDuration !== undefined) validated.workDuration = Math.max(1, validated.workDuration)
      if (validated.shortBreakDuration !== undefined) validated.shortBreakDuration = Math.max(1, validated.shortBreakDuration)
      if (validated.longBreakDuration !== undefined) validated.longBreakDuration = Math.max(1, validated.longBreakDuration)
      if (validated.longBreakInterval !== undefined) validated.longBreakInterval = Math.max(2, validated.longBreakInterval)
      if (validated.dailyGoal !== undefined) validated.dailyGoal = Math.max(1, validated.dailyGoal)
      Object.assign(this.settings, validated)
      if (!this.isRunning) {
        this.timeLeft = this.totalTime
      }
    },

    updateSoundSettings(sound: Partial<SoundSettings>) {
      Object.assign(this.settings.sound, sound)
    },

    updateAutoSwitchSettings(autoSwitch: Partial<AutoSwitchSettings>) {
      Object.assign(this.settings.autoSwitch, autoSwitch)
    },

    updateKeyboardSettings(keyboard: Partial<KeyboardSettings>) {
      Object.assign(this.settings.keyboard, keyboard)
    },

    setCurrentTag(tagId: string | null) {
      this.currentTagId = tagId
    },

    addTag(tag: Omit<TaskTag, 'isDefault'>) {
      this.tags.push({ ...tag, isDefault: false })
    },

    updateTag(id: string, updates: Partial<TaskTag>) {
      const tag = this.tags.find(t => t.id === id)
      if (tag) {
        Object.assign(tag, updates)
      }
    },

    removeTag(id: string) {
      const tag = this.tags.find(t => t.id === id)
      if (tag && !tag.isDefault) {
        this.tags = this.tags.filter(t => t.id !== id)
        if (this.currentTagId === id) {
          this.currentTagId = null
        }
      }
    },
  },

  persist: true,
})
