import { createApp } from 'vue'
import App from './App.vue';

import Button from './components/main-button.vue';
import ButtonGroup from './components/button-group.vue';
import InputField from './components/input-field.vue';
import Notification from './components/notification-banner.vue';
const app = createApp(App)

app.component("main-button", Button);
app.component("input-field", InputField);
app.component("button-group", ButtonGroup);
app.component("notification-banner", Notification);

app.mount('#app');
