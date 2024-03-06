<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <v-sheet class="form-layout-wrp bg-transparent ml-4 mr-2 mb-4">
            <RecordList />
        </v-sheet>
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <RecordCalendar />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import RecordCalendar from './components/RecordCalendar.vue'
import RecordList from './components/RecordList.vue'
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
