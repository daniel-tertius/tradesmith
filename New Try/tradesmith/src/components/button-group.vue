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
                "margin-inline": "1rem"
            }
        }
    },
    created() {
        const getMarginSetting = (i, length) => {
            if (i === 0) return '0 0.5rem 0.5rem 0';
            if (i === (length - 1)) return '0 0 0.5rem 0.5rem';
            return '0 0.5rem 0.5rem 0.5rem';
        }

        const buttons = this.$slots.default();
        for (let i = 0; i < buttons.length; i++) {
            // const data = {
            //     width: (this.mode === "row") ? `${(100 / buttons.length).toFixed(2)}%` : "100%",
            //     margin: getMarginSetting(i, buttons.length)
            // }

            const data = buttons[i].type.data();
            data.style.width = (this.mode === "row") ? `${(100 / buttons.length).toFixed(2)}%` : "100%",
            data.style.margin = getMarginSetting(i, buttons.length)
            console.log(i, data);
            buttons[i].type.data = () => (data);
        }
    }
}
</script>
  