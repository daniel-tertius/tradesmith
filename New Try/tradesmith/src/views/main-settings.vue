<template>
    <notification-banner :message="banner_message" type="success" ref="banner" />
    <h2>Settings</h2>
    <input-field text="Base Order Size" input_type="currency"
        text_info="The Base Order is the first order the bot will create when starting a new deal." />
    <input-field text="Target profit (%)" input_type="percentage"
        text_info="Configure the percentage Take Profit target the bot will use to close successful trades, the bot will automatically account for exchange fees." />

    <button-group mode="row">
        <main-button icon="arrow-left" index="0" @click="back">Back</main-button>
        <main-button icon="save" :index="1" @click="saveData">Save</main-button>
    </button-group>
</template>
  
<script>
export default {
    emits: {
        navigate: Function
    },
    data() {
        return {
            banner_message: "",
            banner_type: "",
        }
    },
    methods: {
        saveData() {
            this.showNotification();
            this.$emit('navigate', "BotLanding");
        },
        showNotification() {
            this.banner_message = "Hello, world!";
            this.banner_type = "info";
            this.$refs.banner.show();
        },
        back() {
            this.$emit('navigate', "Landing");
        },
    }
}
</script>
  
<style scoped>
.container {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;

    background-color: #777777;
    border-radius: 10px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
</style>