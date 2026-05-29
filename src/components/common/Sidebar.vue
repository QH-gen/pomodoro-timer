<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface NavItem {
  path: string
  name: string
  icon: string
}

const navItems: NavItem[] = [
  { path: '/', name: '计时器', icon: 'timer' },
  { path: '/stats', name: '统计', icon: 'stats' },
  { path: '/settings', name: '设置', icon: 'settings' },
]

function navigateTo(path: string) {
  router.push(path)
}

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="var(--color-primary)" opacity="0.15" />
        <circle cx="16" cy="16" r="8" fill="var(--color-primary)" opacity="0.3" />
        <circle cx="16" cy="16" r="3" fill="var(--color-primary)" />
      </svg>
    </div>

    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.path"
        :class="['nav-btn', { active: isActive(item.path) }]"
        @click="navigateTo(item.path)"
        :title="item.name"
      >
        <svg v-if="item.icon === 'timer'" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="13" r="9" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 9v4l2.5 2.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9 2h6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 2v2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else-if="item.icon === 'stats'" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else-if="item.icon === 'settings'" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 64px;
  height: 100vh;
  background: var(--color-card-bg);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 50;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-logo {
  width: 36px;
  height: 36px;
  margin-bottom: 32px;
  flex-shrink: 0;
}

.sidebar-logo svg {
  width: 100%;
  height: 100%;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.nav-btn:hover {
  background: var(--color-btn-bg);
}

.nav-btn.active {
  background: var(--color-primary);
}

.nav-btn.active .nav-icon {
  color: #FFFBF7;
}

.nav-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  transition: color 0.25s ease;
}
</style>
