<template>
    <button :style="style">
        <slot></slot>
    </button>
</template>

<script>

export default {
    data() {
        return {
            style: {
                "font-family": "'Helvetica Neue', sans-serif",
                "font-size": "1.5rem",
                "padding": "1rem 2rem",
                "border": "none",
                "align-self": "center",
                "align-content": "center",
                "border-radius": "5px",
                "background-color": "#444444",
                "color": "#FFFFFF",
                "cursor": "pointer",
                "width": "100%",
                "margin": "0 0 0 0",
                "transition": "background-color 0.2s ease-in-out",
            }
        }
    }
}
</script>

<style>
button:hover {
    background-color: #666666;
}

@media screen and (max-width: 700px) {
    button {
        font-size: 1rem;
        padding: 0.5rem 1rem;
    }
}
</style>