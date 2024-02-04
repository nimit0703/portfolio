import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import HomeViewVue from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeViewVue
    },
  ]
})

export default router
