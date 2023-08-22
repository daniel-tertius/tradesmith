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
        <tradesmith-sub-heading :label="botSettings.botName" />
    </div>

    <div class="middle">
        <info-field label="Base Order Size:" :value="botSettings.baseOrderSize" />
        <info-field label="Target profit (%):" :value="botSettings.takeProfit" />

        <base-button-group>
            <base-button label="View Logs" icon="list" :index="0" @click="showAlert = true" />
            <base-button label="Edit Settings" icon="edit" :index="1" @click="editSettings" />
        </base-button-group>
        <base-button-group mode="row">
            <base-button label="Start" icon="flag-checkered" :index="0" @click="startBot" />
            <base-button label="Continue" icon="repeat" :index="1" @click="showAlert = true"
                v-if="botSettings.hasStarted" />
        </base-button-group>
    </div>
    <base-button-group>
        <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
    </base-button-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DB from "../setup/DB";

export default defineComponent({
    name: "BotLanding",
    emits: ['navigate'],

    data() {
        return {
            showAlert: false,
            botSettings: {
                botName: "No Name Set",
                baseOrderSize: "",
                takeProfit: "",
                hasStarted: false,
            }
        }
    },
    methods: {
        editSettings() {
            this.$router.push({ path: "settings/load" });
        },
        startBot() {
            this.$router.push({ path: 'bot-run' })
        }
    },
    async created() {
        const config: any = await DB.config.getOne();
        if (!config) return;

        this.botSettings.botName = config.bot_title;
        this.botSettings.baseOrderSize = config.base_order_size;
        this.botSettings.takeProfit = config.target_profit;
        this.botSettings.hasStarted = config.has_started;
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