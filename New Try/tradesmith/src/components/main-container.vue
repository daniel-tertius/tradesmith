<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>
.container {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;

    height: auto;
    min-height: 50vh;

    background-color: #777777;
    border-radius: 10px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>