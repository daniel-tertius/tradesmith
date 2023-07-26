<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div>
            <bitcoin-graph />
            <div v-for="(log, index) in logs" :key="index">
                <br />
                <base-card :title="log.title" :message="log.message" :actor="log.actor" :action="log.action" />
            </div>

        </div>

        <base-button-group mode="row">
            <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
        </base-button-group>
    </base-container>
</template>
  
<script lang="ts">
import BitcoinGraph from '@/components/BitcoinGraph.vue';
import BaseCard from '@/components/BaseCard.vue';

import { defineComponent } from 'vue';
// import DB from '../DB';

export default defineComponent({
    components: { BitcoinGraph, BaseCard },
    data() {
        type dataType = {
            logs: any[],
            interval: number | undefined
        }

        const data: dataType = {
            logs: [],
            interval: undefined
        }

        return data;
    },
    methods: {
        async fetchData() {
            // Testing info...
            this.logs = [
                {
                    title: "Bought Bitcoin",
                    message: "Bought 11 BTC at R400000",
                    actor: "Tradesmith",
                    action: "buy"
                },
                {
                    title: "Sell Bitcoin",
                    message: "Sold 12 BTC at R 600000",
                    actor: "Tradesmith",
                    action: "sell"
                }
            ]
            // this.logs = await DB.log.getAll();
        }
    },
    async created() {
        await this.fetchData();
        // this.interval = setInterval(this.fetchData, 5000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },


});
</script>