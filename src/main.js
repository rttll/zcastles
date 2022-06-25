import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

import './assets/index.css';
import App from './App.vue';
import routes from '@/routes';

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(pinia);
app.use(router);

app.mount('#app');
