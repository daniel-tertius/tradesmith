import { createApp } from 'vue';
import App from './App.vue';
import { MongoClient } from "mongodb";

async function run() {
    const uri = "mongodb+srv://Redtiger777:Tertius%23777@cluster0.uggvich.mongodb.net/test?retryWrites=true&w=majority";
    const _client = new MongoClient(uri);
    const databasesList = (await _client.db().admin().listDatabases()).databases;
    console.log(databasesList);
    await _client.close();
}
run();

const app = createApp(App);
// app.use(MongoClient)

app.mount('#app');
