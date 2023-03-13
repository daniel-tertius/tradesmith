<template>
    <div>
        <div class="settings-row">
            <span class="settings-label">Setting 1:</span>
            <span class="settings-value">{{ setting1 }}</span>
        </div>
        <div class="settings-row">
            <span class="settings-label">Setting 2:</span>
            <span class="settings-value">{{ setting2 }}</span>
        </div>
        <div class="settings-row">
            <span class="settings-label">Setting 3:</span>
            <span class="settings-value">{{ setting3 }}</span>
        </div>
    </div>
    <div class="settings-actions">
        <button-group>
            <main-button :index="0" @click="temp">View Logs</main-button>
            <main-button :index="1" @click="temp">Edit Info</main-button>
        </button-group>
        <button-group mode="row">
            <main-button :index="0" @click="temp">Start</main-button>
            <main-button :index="1" @click="temp">Continue</main-button>
        </button-group>
        <button-group>
            <main-button :index="0" @click="back">Back</main-button>
        </button-group>
    </div>
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
  
<style scoped>
.settings-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

.settings-label {
    font-weight: bold;
}

.settings-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.settings-column {
    display: flex;
    flex-direction: column;
}

.settings-button {
    background-color: #222222;
    color: white;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 5px;
}

.settings-button-start {
    margin-right: 10px;
}

.settings-button:hover {
    cursor: pointer;
    opacity: 0.8;
}

.settings-value {
    font-style: italic;
}
</style>
  