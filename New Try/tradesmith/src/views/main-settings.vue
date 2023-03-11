<template>
    <notification-banner :message="banner_message" :type="'success'" ref="banner" />
    <div>
        <div class="container">
            <h2>Settings</h2>
            <form class="settings-form">
                <input-field labelText="Koopbedrag per Bitcoin-transaksie" inputType="whole_number" />
                <input-field labelText="Age" inputType="number" />
                <input-field labelText="Age" inputType="number" />
                <input-field labelText="Age" inputType="number" />
            </form>

            <button-group mode="row">
                <main-button @click="back">Back</main-button>
                <main-button @click="saveData">Save</main-button>
                <main-button @click="saveData">Save</main-button>
            </button-group>
        </div>
    </div>
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
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

.settings-form {
    max-width: 500px;
    margin: 0 auto;
}

</style>