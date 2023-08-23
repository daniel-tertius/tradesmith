<template>
    <div class="log-container">
        <div class="log">
            <div class="log-title">{{ upperTitle }}</div>
            <div class="log-message">{{ message }}</div>
            <div class="log-actor">Actor: {{ actor }} at {{ created_at || "<no time given>" }}</div>
            <div class="log-action">Action: {{ action }}</div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            upperTitle: ""
        }
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        actor: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            required: true
        }
    },
    mounted() {
        this.upperTitle = this.title.toUpperCase();
    },
});
</script>
  
<style scoped>
.log-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.log {
    width: 100%;
    max-width: 800px;

    background-color: #666666;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.log-title {
    font-size: 20px;
    font-weight: bold;
    color: #2730D6;
}

.log-message {
    margin-top: 8px;
    font-size: 16px;
    color: #DDDDDD;
}

.log-actor {
    margin-top: 8px;
    font-size: 14px;
    color: #AAAAAA;
}

.log-action {
    margin-top: 8px;
    font-size: 14px;
    color: #AAAAAA;
}
</style>
  