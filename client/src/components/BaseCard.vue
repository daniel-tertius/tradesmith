<template>
    <div class="data-card" :class="{ 'success-card': success }">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <info-field label="Actor" :value="actor" />
        <info-field label="Action" :value="action" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
        success: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
  
<style scoped>
.data-card {
    background-color: #222;
    color: #fff;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.success-card {
    background-color: #080a2c;
    border-radius: 20px;
}
</style>
  