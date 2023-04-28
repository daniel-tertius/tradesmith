<template>
    <teleport to="body">
        <error-alert v-if="showAlert" title="Work In Progress" message="This functionality is not yet implemented.">
            <base-button-group>
                <base-button label="Close" icon="times" :index="0" @click="showAlert = false" />
            </base-button-group>
        </error-alert>
    </teleport>

    <div>
        <tradesmith-heading />
        <tradesmith-sub-heading :label="bot_settings.bot_name" />
    </div>

    <div class="middle">
        <info-field label="Base Order Size:" :value="bot_settings.base_order_size" />
        <info-field label="Target profit (%):" :value="bot_settings.target_profit" />

        <base-button-group>
            <base-button label="View Logs" icon="list" :index="0" @click="showAlert = true" />
            <base-button label="Edit Settings" icon="edit" :index="1" @click="editSettings" />
        </base-button-group>
        <base-button-group mode="row">
            <base-button label="Start" icon="flag-checkered" :index="0" @click="showAlert = true" />
            <base-button label="Continue" icon="repeat" :index="1" @click="showAlert = true" />
        </base-button-group>
    </div>
    <base-button-group>
        <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
    </base-button-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BotLanding",
    emits: ['navigate'],

    data() {
        return {
            showAlert: false,
            bot_settings: {
                bot_name: "No Name Set",
                base_order_size: "",
                target_profit: ""
            }
        }
    },
    methods: {
        editSettings() {
            this.$router.push({ path: "settings/load" });
        }
    }
});
</script>

<style>
.middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>