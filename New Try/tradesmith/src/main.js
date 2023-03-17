import { createApp } from 'vue'
import App from './App.vue';
import { addIcons } from './fontawesome';

import Button from './components/main-button.vue';
import ButtonGroup from './components/button-group.vue';
import InputField from './components/input-field.vue';
import Notification from './components/notification-banner.vue';
import Container from './components/main-container.vue';
import InfoField from './components/info-field.vue';

const app = addIcons(createApp(App));

app.component("main-button", Button);
app.component("input-field", InputField);
app.component("button-group", ButtonGroup);
app.component("notification-banner", Notification);
app.component("main-container", Container);
app.component("info-field", InfoField)

app.mount('#app');
