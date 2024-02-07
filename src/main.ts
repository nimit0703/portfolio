import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/main.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';


import vuetify from "./plugins/vuetify";


const app = createApp(App);

// Use the router
app.use(router);
app.use(vuetify)
app.mount("#app"); // Mount the app after data is loaded

