<template>
    <v-sheet
        rounded="xl"
        class="preset-bg-light w-100 h-100 px-4 py-2 d-flex flex-column"
    >
        <CustomHead :title="title || '日历'">
            <template #append>
                <v-btn
                    variant="text"
                    size="small"
                    icon="mdi-chevron-left"
                    @click="previous"
                />
                <v-btn
                    variant="text"
                    size="small"
                    icon="mdi-chevron-right"
                    @click="next"
                />
            </template>
        </CustomHead>
        <v-sheet class="preset-scroll flex-1-1 w-100">
            <FullCalendar ref="fullCalendar" :options="calendarOptions" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { getRecordList } from '@/api/plan'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core'
import { ref } from 'vue'
import CustomHead from '@/components/CustomHead.vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/components/Notification'
import { formatTime } from '@/utils/tools'

const route = useRoute()
const router = useRouter()

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
            const { code, data } = await getRecordList({
                planid: route.query.planid as string
            })
            if (code !== 0) throw Error()
            successCallback(
                data
                    .filter(item => !!item.createdAt)
                    .map(item => {
                        const start = formatTime(
                            new Date(item.createdAt),
                            'yyyy-MM-dd'
                        )
                        return { start, display: 'background' } as EventInput
                    })
            )
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

const title = ref<string>()

// 获取当前年月，回显标题
const getCurrentMonth = () => {
    if (!calendarApi.value) return
    const { currentDate } = calendarApi.value.getCurrentData()
    title.value = `${currentDate.getFullYear()}年 ${
        currentDate.getMonth() + 1
    }月`
}

// 跳转至前一个月
const previous = () => {
    calendarApi.value?.prev()
    getCurrentMonth()
}
// 跳转至后一个月
const next = () => {
    calendarApi.value?.next()
    getCurrentMonth()
}

onMounted(() => {
    if (!route.query.planid) {
        notify('未找到计划~')
        router.push({ name: 'Home' })
    }
    calendarApi.value = fullCalendar.value?.getApi()
    getCurrentMonth()
})
</script>

<style scoped lang="scss"></style>
