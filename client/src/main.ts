import { createApp } from 'vue'
import App from './App.vue';
import addIcons from './fontawesome';
import addGlobalComponents from './components';

let app = createApp(App);

app = addIcons(app);
app = addGlobalComponents(app);

app.mount('#app');