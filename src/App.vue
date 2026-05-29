<script setup lang="ts">
import { ref } from 'vue'
import { useTimer } from './composables/useTimer'
import TimerDisplay from './components/TimerDisplay.vue'
import ModeSwitch from './components/ModeSwitch.vue'
import ControlButtons from './components/ControlButtons.vue'
import StatsCard from './components/StatsCard.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import type { TimerMode } from './types/timer'

const { store, toggleTimer, resetTimer } = useTimer()
const isDark = ref(false)

function switchMode(mode: TimerMode) {
  if (store.isRunning) return
  store.switchMode(mode)
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="app">
    <header>
      <h1>🍅 番茄钟</h1>
      <button class="theme-toggle" @click="toggleTheme">{{ isDark ? '☀️' : '🌙' }}</button>
    </header>

    <ModeSwitch :mode="store.mode" @switch="switchMode" />
    <TimerDisplay :time-left="store.timeLeft" :progress="store.progress" />
    <ControlButtons :is-running="store.isRunning" @toggle="toggleTimer" @reset="resetTimer" />

    <div class="pomodoro-count">已完成: {{ store.pomodoroCount }} 个番茄</div>

    <StatsCard :record="store.todayRecord" />
    <SettingsPanel :settings="store.settings" @update="store.updateSettings" />
  </div>
</template>

<style scoped>
.app { position: relative; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
h1 { font-size: 1.2rem; font-weight: 600; }
.theme-toggle { background: none; border: none; font-size: 1.2rem; cursor: pointer; }
.pomodoro-count { font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 8px; }
</style>
