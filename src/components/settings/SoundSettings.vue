<script setup lang="ts">
import type { SoundSettings as SoundSettingsType } from '../../types/timer'
import { SOUND_OPTIONS, useSound } from '../../composables/useSound'

defineProps<{ settings: SoundSettingsType }>()
const emit = defineEmits<{ update: [settings: Partial<SoundSettingsType>] }>()

const { preview } = useSound()

function updateSound(soundId: string) {
  emit('update', { notificationSound: soundId })
  preview(soundId)
}

function updateVolume(e: Event) {
  const value = +(e.target as HTMLInputElement).value
  emit('update', { volume: value })
}
</script>

<template>
  <div class="settings-section">
    <h3 class="section-title">音效设置</h3>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">提示音</span>
        <span class="setting-hint">计时结束时播放</span>
      </div>
      <select
        :value="settings.notificationSound"
        @change="updateSound(($event.target as HTMLSelectElement).value)"
        class="sound-select"
      >
        <option v-for="sound in SOUND_OPTIONS" :key="sound.id" :value="sound.id">
          {{ sound.name }}
        </option>
      </select>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">音量</span>
        <span class="setting-hint">{{ settings.volume }}%</span>
      </div>
      <input
        type="range"
        :value="settings.volume"
        @input="updateVolume"
        min="0"
        max="100"
        class="volume-slider"
      />
    </div>
  </div>
</template>

<style scoped>
.settings-section {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.setting-hint {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.sound-select {
  padding: 6px 10px;
  border: 1px solid var(--color-input-border);
  border-radius: 8px;
  background: var(--color-input-bg);
  color: var(--color-text);
  font-size: 0.8rem;
  cursor: pointer;
}

.sound-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.volume-slider {
  width: 120px;
  accent-color: var(--color-primary);
}
</style>
