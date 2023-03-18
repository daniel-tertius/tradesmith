<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    /* background-color: #777777; */
    /* border-radius: 10px; */

    width: 100%;
    max-width: 40rem;
    height: calc(100vh - 16px);

    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
