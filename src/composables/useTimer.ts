import { ref, onUnmounted } from 'vue'
import { useTimerStore } from '../stores/timer'

export function useTimer() {
  const store = useTimerStore()
  const intervalId = ref<number | null>(null)

  function startTimer() {
    if (intervalId.value !== null) return

    store.start()
    intervalId.value = window.setInterval(() => {
      store.tick()

      if (store.timeLeft <= 0) {
        stopTimer()
        store.completeCycle()
        playNotification()
      }
    }, 1000)
  }

  function stopTimer() {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    store.pause()
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

  function playNotification() {
    try {
      const audio = new Audio('/sounds/notification.mp3')
      audio.volume = 0.5
      audio.play().catch(() => {})
    } catch {}

    if ('Notification' in window && Notification.permission === 'granted') {
      const label = store.mode === 'work' ? '休息一下' : '开始工作'
      new Notification('番茄钟', { body: label })
    }
  }

  onUnmounted(() => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
    }
  })

  return {
    store,
    toggleTimer,
    resetTimer,
  }
}
