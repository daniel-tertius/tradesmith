<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div class="chart-container">
            <Line class="chart" :options="chartOptions" :data="chartData" />
        </div>

        <base-button-group mode="row">
            <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
        </base-button-group>
    </base-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import DB from '../DB';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default defineComponent({
    components: { Line },
    data() {
        return {
            chartData: { labels: Array(), datasets: Array() },
            chartOptions: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    y: {
                        position: 'right',
                        ticks: {
                            color: '#000000',
                            callback: (price: any) => {
                                if (`${price}`.endsWith("000")) {
                                    return `${price}`.substring(0, `${price}`.length - 3) + "k"
                                }

                                return `${price}`;
                            },
                        },
                    },
                    x: {
                        ticks: {
                            color: '#000000',
                        },
                        grid: {
                            display: false,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true, // Set to true to display the legend
                        labels: {
                            color: '#000000',
                        },
                    },
                },
            },
        };
    },
    async mounted() {
        const fetchData = async () => {
            const allPrices: {
                _id: string;
                timestamp: any;
                price: any;
            }[] = await DB.btc_price.getAll();
            return allPrices.map((price) => ({
                timestamp: price.timestamp,
                price: price.price,
            }));
        };

        const allPrices = await fetchData();
        /*[
            {
                timestamp: 10000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 11000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 12000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 13000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 14000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 15000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 16000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 17000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 18000000000,
                price: Math.floor(Math.random() * (200001)) + 500000,
            },
            {
                timestamp: 19000000000,
                price: 500000
            }]*/
        console.log("allprices", allPrices);

        this.chartData = {
            labels: allPrices.map((row) => {
                const date = new Date(row.timestamp)
                return date.toLocaleDateString('en-ZA', {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                }).replace(", ", ",\n")

            }),
            datasets: [
                {
                    label: 'BTC Price',
                    data: allPrices.map((price) => +price.price),
                    labelColor: '#000000',
                    fill: false,
                    pointRadius: 0,
                    borderColor: '#2730D6',
                    borderWidth: 2,
                    pointBackgroundColor: '#2730D6',
                    pointBorderColor: '#2730D6',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#2730D6',
                },
            ]
        };
    },
});
</script>
  
<style scoped>
.chart {
    margin: 10px;
    font-family: "Helvetica Neue', sans-serif";
}

.chart-container {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 1/0.75;

    background-color: #666666;
    border-radius: 10px;
}
</style>
  