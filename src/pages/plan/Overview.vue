<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <!-- 计划总览详情页面 -->
        <v-sheet class="form-layout-wrp bg-transparent ml-4 mr-2 mb-4">
            <PlanDetail :detail="detail" />
        </v-sheet>
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <PlanOverview :overview="detail.planOverview" />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import { getPlanDetail } from '@/api/plan'
import { notify } from '@/components/Notification'
import { useRoute } from 'vue-router'
import PlanDetail from './components/PlanDetail.vue'
import PlanOverview from './components/PlanOverview.vue'
import { ref, onMounted } from 'vue'

const route = useRoute()

const detail = ref<any>({})

const loadData = async () => {
    if (!route.query.planid) notify('未找到计划~')
    try {
        const { code, data } = await getPlanDetail({
            uid: route.query.planid as string
        })
        if (code != 0) return
        detail.value = data
    } catch (e) {
        console.log('PlanDetail.vue', e)
    }
}

onMounted(() => {
    loadData()
})
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
