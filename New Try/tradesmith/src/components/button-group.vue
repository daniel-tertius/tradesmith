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
            default: 'column',
        }
    },
    computed: {
        getStyle() {
            return {
                'flex-direction': this.mode,
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'margin-top': '0',
                'margin-right': '0',
                'margin-bottom': '1rem',
                'margin-left': '1rem',
                'position': 'fixed',
                'bottom': '0',
                // 'left': '0',
                'width': 'calc(100% - 1rem)',
                'max-width': '40rem'
            }
        }
    }
}
</script>