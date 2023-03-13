<template>
    <div :style="getStyle">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'column',
        }
    },
    computed: {
        getStyle() {
            return {
                "display": "flex",
                "flex-direction": this.mode,
                "justify-content": "center",
                "align-items": "center",
                "width": "100%",
                "margin-inline": "1rem",
                "margin-bottom": "0",
                "margin-top": "0"
            }
        }
    }
}
</script>
  