import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transcriptions-list',
      component: () => import('@/views/TranscriptionsListView.vue')
    }
  ]
})

export default router
