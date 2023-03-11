<template>
    <div class="container">
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
                <main-button @click="editInfo">Edit Info</main-button>
                <main-button @click="viewLogs">View Logs</main-button>
            </button-group>
            <button-group :mode="'row'">
                <main-button @click="start">Start</main-button>
                <main-button @click="continueButton">Continue</main-button>
            </button-group>
            <button-group>
                <main-button @click="back">Back</main-button>
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

        }
    },
    methods: {
        back() {
            this.$emit('navigate', "Settings");
        }
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

.settings-info {
    margin-bottom: 20px;
}

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
  