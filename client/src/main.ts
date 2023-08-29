import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import addIcons from './helpers/fontawesome';
import addGlobalComponents from './helpers/globalComponents';

import Landing from './views/MainLanding.vue';
import Settings from './views/BotSettings.vue';
import BotLanding from './views/BotLanding.vue';
import BotRun from './views/BotRun.vue';

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/settings/new',
      name: 'New Settings',
      component: Settings,
      props: { isNewBot: true }
    },
    {
      path: '/settings/load',
      name: 'Load Settings',
      component: Settings,
      props: { isNewBot: false }
    },
    {
      path: '/bot-landing',
      name: 'BotLanding',
      component: BotLanding
    },
    {
      path: '/bot-run',
      name: 'BotRun',
      component: BotRun
    }
  ]
});

// Create the app instance
const app = createApp(App);

// Use router, add icons, and add global components
app.use(router);
addIcons(app);
addGlobalComponents(app);

// Mount the app
app.mount('#app');
