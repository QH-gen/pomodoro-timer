import { ref } from 'vue'
import { useTimerStore } from '../stores/timer'

const SOUND_FILES: Record<string, string> = {
  'default': '/sounds/notification.mp3',
  'bird': '/sounds/bird.mp3',
  'wind-chime': '/sounds/wind-chime.mp3',
  'wooden-fish': '/sounds/wooden-fish.mp3',
  'rain': '/sounds/rain.mp3',
  'piano': '/sounds/piano.mp3',
  'guitar': '/sounds/guitar.mp3',
  'bell': '/sounds/bell.mp3',
}

export const SOUND_OPTIONS = [
  { id: 'default', name: '默认提示音' },
  { id: 'bird', name: '鸟鸣' },
  { id: 'wind-chime', name: '风铃' },
  { id: 'wooden-fish', name: '木鱼' },
  { id: 'rain', name: '雨声' },
  { id: 'piano', name: '钢琴' },
  { id: 'guitar', name: '吉他' },
  { id: 'bell', name: '铃声' },
]

export function useSound() {
  const store = useTimerStore()
  const isPlaying = ref(false)
  let currentAudio: HTMLAudioElement | null = null

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
      })

      audio.addEventListener('ended', () => {
        isPlaying.value = false
        currentAudio = null
      })
    } catch {
      isPlaying.value = false
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
