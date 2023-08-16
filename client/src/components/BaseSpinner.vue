<template>
    <div class="spinner">
        <font-awesome-icon class="fa-spinner" icon="spinner" spin />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.fa-spinner {
    font-size: 3em;
    color: #000000;
}
</style>