<template>
    <div class="row">
        <span class="label">{{ label }}</span>
        <span class="value">{{ value }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    }
});
</script>

<style scoped>
.value {
    font-style: italic;
    text-align: right;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
}

.label {
    font-weight: bold;
    text-align: left;
}
</style>
