<script setup lang="ts">
import SettingsPage from '../components/settings/SettingsPage.vue'
</script>

<template>
  <div class="settings-view">
    <SettingsPage />
  </div>
</template>

<style scoped>
.settings-view {
  padding: 24px 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
