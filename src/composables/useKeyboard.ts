import { onMounted, onUnmounted } from 'vue'
import { useTimerStore } from '../stores/timer'
import type { TimerMode } from '../types/timer'

export function useKeyboard(handlers: {
  onToggle: () => void
  onReset: () => void
  onSwitchMode: (mode: TimerMode) => void
  onToggleTheme: () => void
  onOpenSettings: () => void
}) {
  const store = useTimerStore()

  function handleKeydown(e: KeyboardEvent) {
    if (!store.settings.keyboard.enabled) return

    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return

    const code = e.code
    const kb = store.settings.keyboard

    if (code === kb.startPause) {
      e.preventDefault()
      handlers.onToggle()
    } else if (code === kb.reset) {
      e.preventDefault()
      handlers.onReset()
    } else if (code === kb.workMode) {
      e.preventDefault()
      handlers.onSwitchMode('work')
    } else if (code === kb.shortBreak) {
      e.preventDefault()
      handlers.onSwitchMode('shortBreak')
    } else if (code === kb.longBreak) {
      e.preventDefault()
      handlers.onSwitchMode('longBreak')
    } else if (code === kb.settings) {
      e.preventDefault()
      handlers.onOpenSettings()
    } else if (code === kb.theme) {
      e.preventDefault()
      handlers.onToggleTheme()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
