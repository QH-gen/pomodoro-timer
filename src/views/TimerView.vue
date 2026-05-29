<script setup lang="ts">
import { useTimer } from '../composables/useTimer'
import TimerDisplay from '../components/TimerDisplay.vue'
import ModeSwitch from '../components/ModeSwitch.vue'
import ControlButtons from '../components/ControlButtons.vue'
import StatsCard from '../components/StatsCard.vue'
import TagSelector from '../components/timer/TagSelector.vue'
import DailyGoal from '../components/timer/DailyGoal.vue'
import type { TimerMode } from '../types/timer'

const { store, toggleTimer, resetTimer } = useTimer()

function switchMode(mode: TimerMode) {
  if (store.isRunning) return
  store.switchMode(mode)
}
</script>

<template>
  <div class="timer-view">
    <!-- 模式切换 -->
    <ModeSwitch :mode="store.mode" @switch="switchMode" />

    <!-- 计时器 -->
    <TimerDisplay
      :time-left="store.timeLeft"
      :progress="store.progress"
      :is-running="store.isRunning"
    />

    <!-- 控制按钮 -->
    <ControlButtons :is-running="store.isRunning" @toggle="toggleTimer" @reset="resetTimer" />

    <!-- 标签选择器 -->
    <TagSelector
      :tags="store.tags"
      :current-tag-id="store.currentTagId"
      @select="store.setCurrentTag"
    />

    <!-- 番茄计数 -->
    <div class="pomodoro-count">
      <div class="count-dots">
        <span
          v-for="i in 4"
          :key="i"
          class="count-dot"
          :class="{ filled: store.pomodoroCount % 4 >= i || (store.pomodoroCount % 4 === 0 && store.pomodoroCount > 0) }"
        ></span>
      </div>
      <span class="count-text">
        已完成 <strong>{{ store.pomodoroCount }}</strong> 个番茄
      </span>
    </div>

    <!-- 每日目标 -->
    <DailyGoal :current="store.dailyProgress" :target="store.settings.dailyGoal" />

    <!-- 统计卡片 -->
    <StatsCard :record="store.todayRecord" />
  </div>
</template>

<style scoped>
.timer-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 24px 0;
}

/* 番茄计数 */
.pomodoro-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 16px 0 8px;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}

.count-dots {
  display: flex;
  gap: 8px;
}

.count-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-ring-bg);
  border: 1.5px solid var(--color-border-strong);
  transition: all 0.3s ease;
}

.count-dot.filled {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 8px rgba(196, 113, 92, 0.3);
}

.count-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.count-text strong {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  color: var(--color-text);
}
</style>
