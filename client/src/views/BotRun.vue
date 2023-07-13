<template>
    <base-container>
        <div>
            <tradesmith-heading />
            <tradesmith-sub-heading label="Current Price" />
        </div>

        <div class="chart-container">
            <LineChart :options="chartOptions" :data="chartData" />
        </div>

        <base-button-group mode="row">
            <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
        </base-button-group>
    </base-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// import DB from '../DB';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default defineComponent({
    components: { LineChart: Line },
    data() {
        const chartOptions: ChartOptions<'line'> = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    position: 'right',
                    ticks: {
                        color: '#000000',
                        callback: (price: any) => {
                            if (`${price}`.endsWith('000')) {
                                return `${price}`.substring(0, `${price}`.length - 3) + 'k';
                            }

                            return `${price}`;
                        },
                    },
                },
                x: {
                    ticks: {
                        color: '#000000',
                        autoSkip: true,
                        maxTicksLimit: 10,
                        stepSize: 5,
                    },
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#000000',
                    },
                },
                tooltip: {
                    callbacks: {
                        label(tooltipItem) {
                            console.log(tooltipItem);
                            return tooltipItem.formattedValue + '%';
                        }
                    },
                }
            }
        };

        return {
            chartData: { labels: Array(), datasets: Array() } as ChartData<'line'>,
            chartOptions,
        };
    },
    async mounted() {
        const fetchData = async () => {
            // const allPrices: {
            //     _id: string;
            //     timestamp: any;
            //     price: any;
            // }[] = await DB.btc_price.getAll();
            // return allPrices.map((price) => ({
            //     timestamp: price.timestamp,
            //     price: price.price,
            // }));
            let price = 500000;
            let timestamp = 1685577600000;
            const data = [];
            for (let i = 0; i < 10000; i++) {
                data.push({
                    timestamp: timestamp += Math.floor(Math.random() * 5000000),
                    price: price += Math.floor(Math.random() * 500 - 250)
                })
            }
            return data;
        };

        const allPrices = await fetchData();

        this.chartData = {
            labels: allPrices.map((row) => {
                const date = new Date(row.timestamp);
                return date.toLocaleDateString('en-ZA', {
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }).replace(', ', ',\n');
            }),
            datasets: [
                {
                    label: 'BTC Price',
                    data: allPrices.map((price) => +price.price),
                    backgroundColor: (ctx) => {
                        const canvas = ctx.chart.ctx;
                        const gradient = canvas.createLinearGradient(0, 0, 0, 1000);

                        gradient.addColorStop(0, 'rgba(39, 48, 214, 0.9)');
                        gradient.addColorStop(1, 'rgba(102, 102, 102, 0)');

                        return gradient;
                    },
                    fill: true,
                    pointRadius: 0,
                    borderColor: '#2730D6',
                    borderWidth: 2,
                    pointBackgroundColor: '#2730D6',
                    pointBorderColor: '#2730D6',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#2730D6',
                },
            ],
        };
    },
});
</script>
  
<style scoped>
.chart {
    margin: 10px;
    font-family: 'Helvetica Neue', sans-serif;
}

.chart-container {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 1/0.75;

    background-color: #666666;
    border-radius: 10px;
}
</style>
  