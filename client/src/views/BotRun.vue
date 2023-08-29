<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div>
            <base-button label="Start" icon="flag-checkered" @click="startBot" v-if="!start" />
            <base-button label="Pause" icon="repeat" @click="startBot" v-if="start" />
            <br />
            <br />
            <bitcoin-graph />
            <div v-for="(log, index) in logs" :key="index">
                <br />
                <base-card :title="log.title" :message="log.message" :actor="log.actor" :action="log.action"
                    :created_at="log.created_at" />
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
import DB from '../helpers/DB';
import TradeSmithControl from '../helpers/TradesmithControl';
import WhatsappControl from '../helpers/WhatsappControl';

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
                const post = await DB.config.getOne() as any;
                var data = {
                    botTitle: post.bot_title,
                    baseOrderSize: post.base_order_size,
                    targetProfit: post.target_profit,
                    idleTime: 30 * 1000,
                    lunoKey: process.env.VUE_APP_LUNO_API_KEY,
                    lunoSecret: process.env.VUE_APP_LUNO_API_SECRET,
                    btcTradeAmount: 0.0001,
                    btcGapBetweenBuys: 1000,
                    profitPercentage: 5,
                }
                await TradeSmithControl.start(data);

                const waControl = new WhatsappControl(process.env.VUE_APP_WA_AUTH_KEY);
                await waControl.sendMessage("Hello, World!");
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