<template>
    <div :style='getStyle'>
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'column'
        }
    },
    computed: {
        getStyle() {
            return {
                'flex-direction': this.mode,
            };
        }
    }
};
</script>

<style scoped>
div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    margin-top: 1rem;
    width: 100%;
    max-width: 40rem;
}

@media screen and (max-width: 33rem) {
    div {
        gap: 0.75rem;
        margin-top: 0.75rem;

    }
}

@media screen and (max-width: 300px) {
    div {
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
}
</style>