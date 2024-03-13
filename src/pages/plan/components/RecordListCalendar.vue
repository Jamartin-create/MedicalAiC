<template>
    <v-sheet rounded="xl" class="preset-bg-light w-100 h-100 px-4 py-2 d-flex">
        <v-sheet class="flex-1-1 h-100 d-flex flex-column">
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
                    <v-btn
                        class="preset-bg"
                        size="small"
                        icon="mdi-reply"
                        @click="back"
                    />
                </template>
            </CustomHead>
            <v-sheet class="calendar-wrp preset-scroll flex-1-1 w-100">
                <FullCalendar ref="fullCalendar" :options="calendarOptions" />
            </v-sheet>
        </v-sheet>
        <v-divider v-if="!detailHide" :vertical="true" class="mx-2" />
        <v-sheet
            class="detail-panel w-50 h-100 d-flex flex-column"
            :class="{ hide: detailHide }"
        >
            <CustomHead title="打卡详情" />
            <v-sheet class="preset-scroll flex-1-1 w-100">
                <CustomKeyValue label="睡眠" :label-width="100">
                    {{ detailInfo.sleep || '— —' }}
                </CustomKeyValue>
                <CustomKeyValue label="饮食" :label-width="100">
                    {{ detailInfo.diet || '— —' }}
                </CustomKeyValue>
                <CustomKeyValue label="用药" :label-width="100">
                    {{ detailInfo.medical || '— —' }}
                </CustomKeyValue>
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { getRecordList } from '@/api/plan'
import CustomHead from '@/components/CustomHead.vue'
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import momentPlugin from '@fullcalendar/moment'
import { ref } from 'vue'
import {
    Calendar,
    CalendarOptions,
    EventInput
} from '@fullcalendar/core/index.js'
import { onMounted } from 'vue'
import { notify } from '@/components/Notification'
import { useRoute, useRouter } from 'vue-router'
import CustomKeyValue from '@/components/CustomKeyValue.vue'
import { formatTime } from '@/utils/tools'

const route = useRoute()
const router = useRouter()

const detailHide = ref<boolean>(true)
const detailInfo = ref<any>({})

// 获取日程
async function getEvents() {
    const { code, data } = await getRecordList({
        planid: route.query.planid as string
    })
    if (code !== 0) throw Error()

    const ret = data
        .filter(item => !!item.createdAt)
        .map(item => {
            const start = item.createdAt
            return {
                title: formatTime(start, 'yyyy-MM-dd'),
                start,
                allDay: true,
                backgroundColor: 'green',
                meta: item
            } as EventInput
        })
    return ret
}

// 点击日程
function handleEventClick(eventMeta: any) {
    // 点击同一个日程，视为关闭
    if (detailInfo.value.uid === eventMeta.uid) {
        detailInfo.value = {}
        detailHide.value = true
    } else {
        detailInfo.value = eventMeta
        detailHide.value && (detailHide.value = false)
    }
}

const calendarOptions: CalendarOptions = {
    plugins: [listPlugin, momentPlugin],
    initialView: 'listMonth',
    headerToolbar: false,
    listDaySideFormat: false,
    listDayFormat: { weekday: 'short', day: 'numeric' },
    noEventsContent: '本月没有打卡记录，看来很健康呢~',
    events: async function (_, successCallback, failureCallback) {
        try {
            successCallback(await getEvents())
        } catch (e: any) {
            failureCallback(e)
        }
    },
    eventClick: function (info) {
        handleEventClick(info.event.extendedProps.meta)
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
    calendarApi.value?.render()
    getCurrentMonth()
})

// 其他逻辑
const back = () => {
    router.push({ name: 'Home' })
}
</script>

<style scoped lang="scss">
.detail-panel {
    transition: all ease-in 0.3s;

    &.hide {
        opacity: 0 !important;
        width: 0px !important;
    }
}
</style>

<style lang="scss">
.calendar-wrp {
    padding-bottom: 10px;
    .fc {
        height: 100%;

        .fc-view-harness {
            height: 100%;

            .fc-view {
                overflow: hidden;
                border-radius: 10px;
            }
        }
    }
}
</style>
