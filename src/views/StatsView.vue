<script setup lang="ts">
import StatsPage from '../components/stats/StatsPage.vue'
</script>

<template>
  <div class="stats-view">
    <StatsPage />
  </div>
</template>

<style scoped>
.stats-view {
  padding: 24px 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
