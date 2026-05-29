import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Timer',
    component: () => import('../views/TimerView.vue'),
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('../views/StatsView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
