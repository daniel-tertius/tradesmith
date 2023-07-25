<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div>
            <bitcoin-graph />
            <br />
            <base-card title="Sample Title" message="This is a sample message." actor="John Doe" action="Update" success />

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
            // this.logs = await DB.log.getAll();
            // console.log("LOGS", this.logs)
        }
    },
    async created() {
        // await this.fetchData();
        // this.interval = setInterval(this.fetchData, 5000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },


});
</script>
  
<style scoped>
.log-container {
    width: 100%;
    max-width: 800px;

    background-color: #666666;
    border-radius: 10px;
}
</style> 