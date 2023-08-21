<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div>
            <base-button label="Start" icon="flag-checkered" @click="startBot" v-if="start"/>
            <base-button label="Pause" icon="repeat" @click="startBot" v-if="!start"/>
            
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
import DB from '../setup/DB';
import TradeSmithControl from '../setup/TradesmithControl';

export default defineComponent({
    components: { BitcoinGraph, BaseCard },
    data() {
        type dataType = {
            logs: any[],
            interval: number | undefined,
            start: boolean
        }

        const data: dataType = {
            logs: [],
            interval: undefined,
            start: false
        }

        return data;
    },
    methods: {
        async fetchData() {
            // // Testing info...
            // this.logs = [
            //     {
            //         title: "Bought Bitcoin",
            //         message: "Bought 11 BTC at R400000",
            //         actor: "Tradesmith",
            //         action: "buy"
            //     },
            //     {
            //         title: "Sell Bitcoin",
            //         message: "Sold 12 BTC at R 600000",
            //         actor: "Tradesmith",
            //         action: "sell"
            //     }
            // ]
            this.logs = await DB.log.getAll();
        },

        async startBot() {
            this.start = !this.start;
            if (this.start) {
                await TradeSmithControl.start();
            } else {
                await TradeSmithControl.stop();
            }
            
        }
    },
    async created() {
        await this.fetchData();

        //@ts-ignore
        this.interval = setInterval(this.fetchData, 60000);
        // var tradeSmith = new TradeSmith({
        //     idleTime: 10 * 1000,
        //     btcGapBetweenBuys: 0.001,
        //     btcTradeAmount: 0.02,
        //     lunoKey: "",
        //     lunoSecret: "",
        //     profitPercentage: 0.01
        // });

        // tradeSmith.start(); 
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },


});
</script>