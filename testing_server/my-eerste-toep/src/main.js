import { createApp } from 'vue'
import App from './App.vue';
import FriendContact from './components/FriendContact.vue'
import EditFriendContact from './components/EditFriendContact.vue'

const app = createApp(App);

app.component('friend-contact', FriendContact);
app.component('edit-contact', EditFriendContact);

app.mount('#app');
