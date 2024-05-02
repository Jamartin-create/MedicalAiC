<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <!-- 计划打卡页面 -->
        <v-sheet class="form-layout-wrp bg-transparent ml-4 mr-2 mb-4">
            <RecordCreateForm @analize="handleGenRecordAna" />
        </v-sheet>
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <RecordAnalize :recordid="recordid" />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import RecordAnalize from './components/RecordAnalize.vue'
import RecordCreateForm from './components/RecordCreateForm.vue'
import { ref } from 'vue'

const recordid = ref<string>('')

const handleGenRecordAna = (uid: string) => {
    recordid.value = uid
}
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
