// router/index.ts

// Composables
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/HomeView.vue';
import WebGLCanvas from '@/components/webGL/WebGLCanvas.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for dynamic import error
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
