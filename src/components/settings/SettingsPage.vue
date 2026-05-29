<script setup lang="ts">
</script>

<template>
  <div class="settings-page">
    <h2 class="page-title">设置</h2>
    <div class="placeholder">
      <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="placeholder-text">设置功能即将上线...</p>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.page-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-text);
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  background: var(--color-surface);
  border-radius: 20px;
  border: 1px dashed var(--color-border-strong);
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: var(--color-text-muted);
}

.placeholder-text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
</style>
