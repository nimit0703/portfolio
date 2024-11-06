/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import "@/assets/css/main.css"
// Plugins
import { registerPlugins } from '@/plugins'
import { store } from './stores/store'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import VueScrollTo from 'vue-scrollto';

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const app = createApp(App)
registerPlugins(app)
app.use(VueScrollTo);
app.use(store)
app.mount('#app')
