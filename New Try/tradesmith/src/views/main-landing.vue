<template>
    <div class="container">
        <h2>Welcome!</h2>
        <button-group :mode="'row'">
            <main-button @click="createNewBot">New</main-button>
            <main-button @click="loadBot">Load</main-button>
        </button-group>
    </div>
</template>

<script>
export default {
    methods: {
        createNewBot() {
            this.$emit("navigate", "Settings");
        },

        loadBot() {

        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0.1rem;
    padding: 0;
}

.container {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
</style>