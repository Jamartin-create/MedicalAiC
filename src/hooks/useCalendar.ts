import { formatTime } from '@/utils/tools'
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import { ref } from 'vue'

export default function useCalendar() {
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

    return {
        title,
        previous,
        next,
        initCalendar
    }
}
