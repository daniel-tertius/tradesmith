import { createApp } from 'vue'
import App from './App.vue';
import { addIcons } from './fontawesome';

import Button from './components/BaseButton.vue';
import ButtonGroup from './components/BaseButtonGroup.vue';
import BaseInput from './components/BaseInput.vue';
import Notification from './components/notification-banner.vue';
import Container from './components/BaseContainer.vue';
import InfoField from './components/info-field.vue';
import ErrorAlert from './components/ErrorAlert.vue';

import SubHeading from './components/TradesmithSubHeading.vue';
import Heading from './components/TradesmithHeading.vue';

const app = addIcons(createApp(App));

app.component("base-button", Button);
app.component("base-button-group", ButtonGroup);
app.component("base-input", BaseInput);
app.component("notification-banner", Notification);
app.component("base-container", Container);
app.component("info-field", InfoField);
app.component("error-alert", ErrorAlert);

app.component("tradesmith-sub-heading", SubHeading);
app.component("tradesmith-heading", Heading);

app.mount('#app');
