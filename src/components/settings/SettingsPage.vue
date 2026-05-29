<script setup lang="ts">
import { useTimerStore } from '../../stores/timer'
import TimerSettings from './TimerSettings.vue'
import TagManager from './TagManager.vue'
import SoundSettings from './SoundSettings.vue'
import AutoSwitchSettings from './AutoSwitchSettings.vue'
import KeyboardSettings from './KeyboardSettings.vue'

const store = useTimerStore()
</script>

<template>
  <div class="settings-page">
    <h2 class="page-title">设置</h2>

    <div class="settings-list">
      <TimerSettings
        :settings="store.settings"
        @update="store.updateSettings"
      />

      <TagManager
        :tags="store.tags"
        @add="store.addTag"
        @remove="store.removeTag"
      />

      <SoundSettings
        :settings="store.settings.sound"
        @update="store.updateSoundSettings"
      />

      <AutoSwitchSettings
        :settings="store.settings.autoSwitch"
        @update="store.updateAutoSwitchSettings"
      />

      <KeyboardSettings
        :settings="store.settings.keyboard"
        @update="store.updateKeyboardSettings"
      />
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  padding-bottom: 40px;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
</style>
