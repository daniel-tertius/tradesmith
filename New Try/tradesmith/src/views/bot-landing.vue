<template>
    <info-field label="Setting 1:" value="setting1" />
    <info-field label="Setting 2:" value="setting2" />
    <info-field label="Setting 3:" value="setting3" />

    <button-group>
        <main-button :index="0" @click="temp">View Logs</main-button>
        <main-button :index="1" @click="temp">Edit Info</main-button>
    </button-group>
    <button-group mode="row">
        <main-button :index="0" @click="temp">Start</main-button>
        <main-button :index="1" @click="temp">Continue</main-button>
    </button-group>
    <button-group>
        <main-button icon="arrow-left" :index="0" @click="back">Back</main-button>
    </button-group>
</template>

<script>
export default {
    emits: {
        navigate: Function
    },
    data() {
        return {

        }
    },
    methods: {
        back() {
            this.$emit('navigate', "Settings");
        },
        temp() {
            alert("WIP")
        }
    }
}
</script>