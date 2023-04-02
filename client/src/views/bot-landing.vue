<template>
    <div>
        <tradesmith-heading />
        <tradesmith-sub-heading label="Bot name here" />
    </div>

    <div class="middle">
        <info-field label="Setting 1:" value="setting1" />
        <info-field label="Setting 2:" value="setting2" />
        <info-field label="Setting 3:" value="setting3" />

        <base-button-group>
            <base-button label="View Logs" icon="list" :index="0" @click="temp" />
            <base-button label="Edit Info" icon="edit" :index="1" @click="temp" />
        </base-button-group>
        <base-button-group mode="row">
            <base-button label="Start" icon="flag-checkered" :index="0" @click="temp" />
            <base-button label="Continue" icon="repeat" :index="1" @click="temp" />
        </base-button-group>
    </div>
    <base-button-group>
        <base-button label="Back" icon="arrow-left" :index="0" @click="back" />
    </base-button-group>
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
            this.$emit('navigate', "Landing");
        },
        temp() {
            alert("WIP")
        }
    }
}
</script>

<style>
.middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>