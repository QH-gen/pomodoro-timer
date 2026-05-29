import { ref } from 'vue'
import { useTimerStore } from '../stores/timer'

const SOUND_FILES: Record<string, string> = {
  'default': '/sounds/notification.mp3',
}

export const SOUND_OPTIONS = [
  { id: 'default', name: '默认提示音' },
]

export function useSound() {
  const store = useTimerStore()
  const isPlaying = ref(false)
  let currentAudio: HTMLAudioElement | null = null

  function playFallbackBeep(volume: number) {
    try {
      const ctx = new AudioContext()
      const gain = ctx.createGain()
      gain.connect(ctx.destination)
      gain.gain.value = volume * 0.3

      const notes = [523, 659]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.connect(gain)
        osc.start(ctx.currentTime + i * 0.15)
        osc.stop(ctx.currentTime + i * 0.15 + 0.12)
        gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime + i * 0.15)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.12)
      })

      setTimeout(() => ctx.close(), 500)
    } catch {
      // Web Audio API unavailable
    }
  }

  function play(soundId?: string) {
    const id = soundId ?? store.settings.sound.notificationSound
    const file = SOUND_FILES[id] ?? SOUND_FILES['default']
    const volume = store.settings.sound.volume / 100

    stop()

    try {
      const audio = new Audio(file)
      audio.volume = volume
      currentAudio = audio
      isPlaying.value = true

      audio.play().catch(() => {
        isPlaying.value = false
        playFallbackBeep(volume)
      })

      audio.addEventListener('ended', () => {
        isPlaying.value = false
        currentAudio = null
      })
    } catch {
      isPlaying.value = false
      playFallbackBeep(volume)
    }
  }

  function stop() {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio = null
      isPlaying.value = false
    }
  }

  function preview(soundId: string) {
    play(soundId)
  }

  return {
    play,
    stop,
    preview,
    isPlaying,
  }
}
