<template>
    <v-sheet rounded="xl" class="preset-scroll preset-bg-light w-100 h-100 px-4 py-2">
        <CustomHead title="记录日历">
            <template #append>
                <v-btn variant="text" size="small" icon="mdi-chevron-left" @click="previous" />
                <v-btn variant="text" size="small" icon="mdi-chevron-right" @click="next" />
            </template>
        </CustomHead>
        <FullCalendar ref="fullCalendar" :options="calendarOptions"  />
    </v-sheet>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { ref } from 'vue';
import CustomHead from '@/components/CustomHead.vue';
import { onMounted } from 'vue';

const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: false
}

const fullCalendar = ref<InstanceType<typeof FullCalendar>>()

const calendarApi = ref<Calendar>()

const previous = () => calendarApi.value?.prev()
const next = () => calendarApi.value?.next()

onMounted(() => {
    calendarApi.value = fullCalendar.value?.getApi()
})
</script>

<style scoped lang="scss">
</style>
