<script setup lang="ts">
defineProps<{
  timeLeft: number
  progress: number
}>()

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
}
</script>

<template>
  <div class="timer-display">
    <svg class="progress-ring" viewBox="0 0 200 200">
      <circle class="progress-ring__bg" cx="100" cy="100" r="90" fill="none" stroke-width="8" />
      <circle class="progress-ring__fill" cx="100" cy="100" r="90" fill="none" stroke-width="8"
        :stroke-dasharray="565.48" :stroke-dashoffset="565.48 * (1 - progress)" stroke-linecap="round" />
    </svg>
    <div class="timer-text">{{ formatTime(timeLeft) }}</div>
  </div>
</template>

<style scoped>
.timer-display {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
}
.progress-ring { width: 100%; height: 100%; transform: rotate(-90deg); }
.progress-ring__bg { stroke: var(--color-ring-bg); }
.progress-ring__fill { stroke: var(--color-primary); transition: stroke-dashoffset 0.3s ease; }
.timer-text {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-size: 2.5rem; font-weight: 300; font-variant-numeric: tabular-nums; color: var(--color-text);
}
</style>
