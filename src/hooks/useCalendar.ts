import { formatTime } from '@/utils/tools'
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import { ref } from 'vue'

// 日历使用快捷 Hook
export default function useCalendar() {
    const fullCalendar = ref<InstanceType<typeof FullCalendar>>() // 日历实例
    const calendarApi = ref<Calendar>() // 日历的 API
    const title = ref<string>('') // 日历标题

    console.log(fullCalendar)

    // 获取当前月份
    function getCurrentMonth() {
        if (!calendarApi.value) return
        const { currentDate } = calendarApi.value.getCurrentData()
        title.value = formatTime(currentDate, 'yyyy年 - MM月') || '--'
    }

    // 获取前一个月数据
    function previous() {
        calendarApi.value?.prev()
        getCurrentMonth()
    }

    // 获取后一个月数据
    function next() {
        calendarApi.value?.next()
        getCurrentMonth()
    }

    // 初始化日历组件
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
