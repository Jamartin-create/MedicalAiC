<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <!-- 计划打卡列表页面 -->
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <RecordListCalendar />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import RecordListCalendar from './components/RecordListCalendar.vue'
</script>

<style scoped lang="scss">
$createFormWidth: 400px;
.form-layout-wrp {
    width: $createFormWidth;
    min-width: $createFormWidth;
}

.home-layout-container {
    height: calc(100vh - 110px);
}
</style>
