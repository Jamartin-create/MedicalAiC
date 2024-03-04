<template>
    <v-sheet class="preset-bg-light w-100 h-100 rounded-xl py-2 px-2">
        <v-sheet class="w-75 py-6" v-if="caseid">
            <div>{{ detail.curSituation }}</div>
            <div>{{ detail.summary }}</div>
            <div>{{ detail.mdHistory }}</div>
            <div>{{ detail.medical }}</div>
            <div>{{ detail.status }}</div>
            <div>{{ detail.createdAt }}</div>
            <div>{{ detail.analizeDetail }}</div>
        </v-sheet>
        <v-sheet v-else class="w-100 h-100 d-flex justify-center align-center">
            未选择档案～
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { getCaseDetail } from '@/api/case'
import { watch, ref } from 'vue'

type PropsT = {
    caseid: string
}

const props = defineProps<PropsT>()

const detail = ref<any>({})

const loadData = async () => {
    const { code, data } = await getCaseDetail({ uid: props.caseid })
    if (code !== 0) return
    detail.value = data
}

watch(
    () => props.caseid,
    () => {
        loadData()
    }
)
</script>

<style scoped></style>
