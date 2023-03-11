<template>
    <div :class="['notification', type]" v-show="visible" @click="hide">
        <p>{{ message }}</p>
    </div>
</template>
  
<script>
export default {
    props: {
        message: {
            type: String,
            required: true
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
            visible: false,
            local_duration: this.duration
        };
    },
    methods: {
        show() {
            if (this.visible) {
                // Already visible show just reset timer.
                this.local_duration = this.duration;
            } else {
                this.visible = true;
                this.local_duration = this.duration;
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
            this.visible = false;
        }
    }
};
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