import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/main.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
})

const app = createApp(App);

// Use the router
app.use(router);
app.use(vuetify)
app.mount("#app"); // Mount the app after data is loaded

