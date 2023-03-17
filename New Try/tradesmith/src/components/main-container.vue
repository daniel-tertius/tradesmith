<template>
    <div :class="containerClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    computed: {
        containerClass() {
            return "container";
        }
    }
};
</script>

<style scoped>
.container {
    /* line-height: 1.5; */
    /* color: #333333; */

    /* background-color: #777777; */
    border-radius: 10px;

    width: 100%;
    max-width: 40rem;
    height: 90vh;

    padding: 1rem;

    /* padding: 1rem; */

    /* justify-content: center; */
    /* align-items: center; */
}
</style>
