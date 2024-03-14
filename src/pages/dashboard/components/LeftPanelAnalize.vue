<template>
    <v-sheet
        rounded="xl"
        class="preset-bg-light w-100 h-100 rounded-xl px-2 py-2"
    >
        <div id="apex"></div>
    </v-sheet>
</template>

<script setup lang="ts">
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'

var options = {
    series: [
        {
            name: '打卡',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: '任务',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ],
    chart: {
        height: '100%',
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
        show: false
    },
    legend: {
        show: false
    },
    xaxis: {
        show: false,
        type: 'datetime',
        categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
        ]
    },
    yaxis: {
        show: false
    }
}

onMounted(() => {
    var chart = new ApexCharts(document.querySelector('#apex'), options)
    chart.render()
})
</script>

<style lang="scss" scoped></style>
