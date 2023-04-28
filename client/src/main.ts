import { createApp } from 'vue'
import App from './App.vue';
import addIcons from './fontawesome';
import addGlobalComponents from './globalComponents';
import { createRouter, createWebHistory } from 'vue-router'

import Landing from './views/MainLanding.vue';
import Settings from './views/BotSettings.vue';
import BotLanding from './views/BotLanding.vue';

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
            name: "BotLanding",
            component: BotLanding
        }
    ]
});

let app = createApp(App);

app.use(router)
app = addIcons(app);
app = addGlobalComponents(app);

app.mount('#app');