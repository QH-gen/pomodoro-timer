import { ref, onUnmounted } from 'vue'
import { useTimerStore } from '../stores/timer'
import { useSound } from './useSound'
import { useAutoSwitch } from './useAutoSwitch'
import type { TimerMode } from '../types/timer'

export function useTimer() {
  const store = useTimerStore()
  const intervalId = ref<number | null>(null)
  const { play: playSound } = useSound()

  function onAutoStart() {
    store.completeCycle()
    startTimer()
  }

  const { countdown, startCountdown, cancelCountdown } = useAutoSwitch(onAutoStart)

  function startTimer() {
    if (intervalId.value !== null) return

    cancelCountdown()
    store.start()

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    intervalId.value = window.setInterval(() => {
      store.tick()

      if (store.timeLeft <= 0) {
        stopTimer()
        playSound()

        if ('Notification' in window && Notification.permission === 'granted') {
          const label = store.mode === 'work' ? '休息一下' : '开始工作'
          new Notification('番茄钟', { body: label })
        }

        store.completeCycle()
        startCountdown()
      }
    }, 1000)
  }

  function stopTimer() {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    store.pause()
    cancelCountdown()
  }

  function toggleTimer() {
    if (store.isRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }

  function resetTimer() {
    stopTimer()
    store.reset()
  }

  function switchMode(mode: TimerMode) {
    if (store.isRunning) return
    store.switchMode(mode)
  }

  onUnmounted(() => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
    }
    cancelCountdown()
  })

  return {
    store,
    countdown,
    toggleTimer,
    resetTimer,
    switchMode,
  }
}
