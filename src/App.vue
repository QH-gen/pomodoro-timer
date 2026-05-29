<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/common/Sidebar.vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <main class="app-main">
      <router-view />
    </main>
    <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换浅色' : '切换深色'">
      <svg v-if="!isDark" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.app-layout {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.app-main {
  margin-left: 64px;
  display: flex;
  justify-content: center;
  padding: 24px 32px;
  min-height: 100vh;
}

.theme-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  background: var(--color-btn-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.theme-toggle:hover {
  background: var(--color-btn-hover);
  border-color: var(--color-border-strong);
}

.theme-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-secondary);
}
</style>
