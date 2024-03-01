import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import HomeViewVue from '@/views/HomeView.vue'
import SettingsViewVue from '@/views/SettingsView.vue'
import NothingToShowVue from '@/components/section/cards/NothingToShow.vue'
import ProjectViewVue from '@/views/ProjectView.vue';
import ConnectViewVue from '@/views/ConnectView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'default',
      component:HomeViewVue,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeViewVue
    },
    {
      path:'/settings',
      name: 'settings',
      component : SettingsViewVue
    },
    {
      path:'/projects',
      name: 'projects',
      component : ProjectViewVue
    },
    {
      path:'/connect',
      name: 'connect',
      component : ConnectViewVue
    },

  ]
})

export default router
