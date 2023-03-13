<template>
    <notification-banner :message="banner_message" :type="'success'" ref="banner" />
    <h2>Settings</h2>
    <input-field labelText="Koopbedrag per Bitcoin-transaksie" inputType="whole_number" />
    <input-field labelText="Age" inputType="number" />
    <input-field labelText="Age" inputType="number" />
    <input-field labelText="Age" inputType="number" />

    <button-group mode="row">
        <main-button :index="0" @click="back">Back</main-button>
        <main-button :index="1" @click="saveData">Save</main-button>
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