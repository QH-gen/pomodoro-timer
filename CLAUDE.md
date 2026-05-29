# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

番茄钟桌面应用，基于 Tauri 2.x + Vue 3 + TypeScript 构建。所有业务逻辑在前端，Rust 后端仅为 Tauri 默认脚手架。

## 常用命令

```bash
# 开发（启动 Tauri 桌面应用，包含 Vite 前端 + Rust 后端）
npm run tauri dev

# 仅启动前端开发服务器（不含 Tauri 窗口）
npm run dev

# 类型检查 + 构建前端
npm run build

# 构建 Tauri 桌面应用（生成安装包）
npm run tauri build

# Windows 快捷启动
start.bat
```

## 架构概览

### 前端（src/）

- **Vue 3 Composition API** + `<script setup>` 语法
- **Pinia** 单一 store（`stores/timer.ts`），通过 `pinia-plugin-persistedstate` 持久化到 localStorage
- **Vue Router** 三条懒加载路由：`/`（计时器）、`/stats`（统计）、`/settings`（设置）
- **Chart.js + vue-chartjs** 用于统计图表（柱状图、折线图、饼图）
- **Composables** 封装核心逻辑：`useTimer`（计时）、`useKeyboard`（快捷键）、`useSound`（音效）、`useAutoSwitch`（自动切换）

### 后端（src-tauri/）

- Tauri 2.x 默认脚手架，仅含一个未使用的 `greet` 命令
- 窗口配置在 `src-tauri/tauri.conf.json`：400×600 固定尺寸

### 关键目录

| 目录 | 说明 |
|------|------|
| `src/components/timer/` | 计时器页面组件（DailyGoal、TagSelector） |
| `src/components/stats/` | 统计页面组件（图表、导出） |
| `src/components/settings/` | 设置页面组件（计时器、标签、音效、快捷键等） |
| `src/composables/` | 组合式函数，封装跨组件复用的逻辑 |
| `src/types/timer.ts` | 全部 TypeScript 类型定义 |
| `src/utils/` | 工具函数（图表数据处理、数据导出） |
| `public/sounds/` | 音效文件（notification.mp3 等） |

### 数据流

1. 组件通过 `useTimerStore()` 读写状态
2. `useTimer` composable 驱动计时逻辑（setInterval），调用 store 的 tick/start/pause 等 action
3. `useSound` 和 `useAutoSwitch` 在计时完成时被回调触发
4. 历史记录保存在 store 的 history 数组中，上限 90 天

### 主题

通过 `<html data-theme="dark|light">` 切换，CSS 变量定义在 `style.css` 中，主色调为 terra-cotta（#C4715C）。

## 类型检查

项目使用 `vue-tsc` 进行 Vue SFC 的 TypeScript 类型检查，包含在 `npm run build` 流程中。IDE 推荐安装 Volar 扩展。

## 注意事项

- Vite 开发服务器固定端口 1420，HMR 端口 1421
- Chart.js 图表组件各自独立注册模块（tree-shaking 友好）
- 音效文件需放在 `public/sounds/` 目录下，格式为 mp3
- 暂无测试框架，设计文档中规划了 Vitest 但尚未配置
