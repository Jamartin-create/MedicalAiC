<template>
    <v-sheet class="bg-transparent w-100 h-100 d-flex flex-column">
        <CustomHead :title="title || '打卡概览'">
            <template #append>
                <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-chevron-left"
                    @click="previous"
                />
                <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-chevron-right"
                    @click="next"
                />
            </template>
        </CustomHead>
        <v-sheet class="news-wrp preset-scroll flex-1-1 w-100">
            <FullCalendar ref="fullCalendar" :options="calendarOptions" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomHead from '@/components/CustomHead.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core'
import { onMounted } from 'vue'
import { formatTime } from '@/utils/tools'
import { ref } from 'vue'
import { getRecordList } from '@/api/plan'

// 获取日程
async function getEvents() {
    const { code, data } = await getRecordList({
        month: new Date().getMonth() + 1
    })
    if (code !== 0) throw Error()

    const ret = data
        .filter(item => !!item.createdAt)
        .map(item => {
            const start = item.createdAt
            const end = new Date(new Date(start).getTime() + 6000)
            console.log(start, end)
            return {
                title: '#打卡',
                start,
                end,
                meta: item
            } as EventInput
        })
    return ret
}

const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    selectable: true,
    selectOverlap: function (info) {
        return info.display === 'background'
    },
    events: async function (_, successCallback, failureCallback) {
        try {
            successCallback(await getEvents())
        } catch (e: any) {
            failureCallback(e)
        }
    },
    select: function (info) {
        console.log(info)
    }
}

const fullCalendar = ref<InstanceType<typeof FullCalendar>>()
const calendarApi = ref<Calendar>()
const title = ref<string>('')

console.log(fullCalendar)

function getCurrentMonth() {
    if (!calendarApi.value) return
    const { currentDate } = calendarApi.value.getCurrentData()
    title.value = formatTime(currentDate, 'yyyy年 - MM月') || '--'
}

function previous() {
    calendarApi.value?.prev()
    getCurrentMonth()
}

function next() {
    calendarApi.value?.next()
    getCurrentMonth()
}

function initCalendar() {
    calendarApi.value = fullCalendar.value?.getApi()

    console.log(fullCalendar.value)
    calendarApi.value?.render()
    getCurrentMonth()
}

onMounted(() => {
    initCalendar()
})
</script>

<style lang="scss">
.news-wrp {
    padding: 10px;
    .fc {
        height: 100%;

        .fc-view-harness {
            height: 100%;

            .fc-scrollgrid {
                border-radius: 10px;
            }
        }
    }
}
</style>
