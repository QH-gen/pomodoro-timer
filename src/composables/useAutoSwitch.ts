import { ref } from 'vue'
import { useTimerStore } from '../stores/timer'

export function useAutoSwitch(onAutoStart: () => void) {
  const store = useTimerStore()
  const countdown = ref<number | null>(null)
  let countdownTimer: number | null = null

  function clearCountdown() {
    if (countdownTimer !== null) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    countdown.value = null
  }

  function startCountdown() {
    const settings = store.settings.autoSwitch
    const shouldAutoSwitch =
      (store.mode === 'work' && settings.autoStartBreak) ||
      (store.mode !== 'work' && settings.autoStartWork)

    if (!shouldAutoSwitch) return

    clearCountdown()
    countdown.value = settings.countdownSeconds

    countdownTimer = window.setInterval(() => {
      if (countdown.value !== null && countdown.value > 0) {
        countdown.value--
      } else {
        clearCountdown()
        onAutoStart()
      }
    }, 1000)
  }

  function cancelCountdown() {
    clearCountdown()
  }

  return {
    countdown,
    startCountdown,
    cancelCountdown,
    clearCountdown,
  }
}
