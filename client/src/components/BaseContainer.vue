<template>
    <div :style="divClass">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BaseContainer",

    computed: {
        divClass() {
            return {
                height: 'calc(var(--vh, 1vh) * 98)'
            }
        }
    },
    methods: {
        setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    },
    mounted() {
        window.addEventListener('resize', this.setViewportHeight);
        this.setViewportHeight();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.setViewportHeight);
    }
})
</script>

<style scoped>
div {
    width: 100%;
    max-width: 40rem;

    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
