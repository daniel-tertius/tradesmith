<template>
    <div :class="['notification', $props.type]" v-show="isVisible" @click="hide">
        <p>{{ $props.message }}</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    __name: "BaseBanner",
    created() {
        this.local_duration = this.$props.duration;
    },
    props: {
        message: {
            type: String,
            default: ""
        },
        duration: {
            type: Number,
            default: 3000
        },
        type: {
            type: String,
            default: "info"
        }
    },

    data() {
        return {
            isVisible: false,
            local_duration: 0,
        }
    },
    methods: {
        show() {
            this.local_duration = this.$props.duration;
            if (!this.isVisible) {
                this.isVisible = true;
                this.runTime();
            }
        },

        runTime() {
            setTimeout(() => {
                this.local_duration -= 1000;
                this[(this.local_duration > 0) ? 'runTime' : 'hide']();
            }, 1000);
        },

        hide() {
            this.local_duration = 0;
            this.isVisible = false;
        }
    }
});
</script>
  
<style scoped>
.notification {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
    color: #333333;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    z-index: 9999;
}

.default {
    background-color: #F5F5F5;
    color: #333333;
}

.success {
    background-color: #DFF2BF;
    color: #4F8A10;
}

.warning {
    background-color: #FFD8A8;
    color: #9F6000;
}

.danger {
    background-color: #FFBABA;
    color: #D8000C;
}

.banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    font-size: 1.2rem;
    z-index: 9999;
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(0%);
    }
}
</style>