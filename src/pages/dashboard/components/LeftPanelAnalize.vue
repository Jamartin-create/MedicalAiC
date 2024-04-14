<template>
    <v-sheet
        rounded="xl"
        class="preset-bg-light w-100 h-100 rounded-xl px-2 py-2"
    >
        <div id="apex"></div>
    </v-sheet>
</template>

<script setup lang="ts">
import { getSevenDaysStatistic } from '@/api/plan'
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'

const initOptions = async () => {
    try {
        // api：获取近七日统计信息
        const { code, data } = await getSevenDaysStatistic()
        const recordCount: number[] = [] // 打卡数量
        const needCount: number[] = [] // 应打卡数量
        const dateList: string[] = [] // 日期信息

        if (code !== 0) return

        data.forEach(item => {
            recordCount.push(item.actual_count)
            needCount.push(item.plan_count)
            dateList.push(item.date)
        })

        const options = {
            series: [
                {
                    name: '实际打卡任务',
                    data: recordCount
                },
                {
                    name: '应打卡任务',
                    data: needCount
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
                labels: {
                    show: false
                },
                categories: dateList
            },
            yaxis: {
                show: false
            }
        }
        const chart = new ApexCharts(document.querySelector('#apex'), options)
        chart.render()
    } catch (e) {
        console.log('LeftPanelAnalize.vue - Error', e)
    }
}

onMounted(() => {
    initOptions()
})
</script>

<style lang="scss" scoped></style>
