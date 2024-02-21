<template>
    <div>
        <v-btn @click="goBack">返回</v-btn>
        
        <v-btn variant="text" color="teal-accent-4" @click="closePlanConfirm">
            关闭计划
        </v-btn>
        <div>{{ detail.type }}</div>
        <div>{{ detail.target }}</div>
        <div>{{ detail.cycle }}</div>
        <div>{{ detail.status }}</div>
        <div>{{ detail.startAt }}</div>
        <div>{{ detail.endAt }}</div>
        <div>{{ detail.planOverview }}</div>

        <!-- 打卡记录 -->
        <div>{{ recordList }}</div>

        <!-- 复盘内容 -->
        <div>{{ detail.planReview }}</div>
        <v-snackbar
            v-model:model-value="snackbar" 
            :timeout="-1" 
            location="center"
        >
            确定要关闭计划吗～
            
            <template v-slot:actions>
                <v-btn 
                    color="teal-accent-4"
                    variant="text"
                    @click="closePlan"
                >
                    确定
                </v-btn>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="snackbar = false"
                >
                    取消
                </v-btn>
            </template>

        </v-snackbar>
    </div>
</template>

<script setup lang="ts">
import { getPlanDetail, getRecordList, completePlan } from '@/api/plan'
import { notify } from '@/components/Notification';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const detail = ref<any>({})
const recordList = ref<any[]>([])

// 加载详情
const loadData = async () => {
    if (!route.query.id) return notify('参数错误')
    const { code, data } = await getPlanDetail({ uid: route.query.id as string })
    if (code !== 0) return
    detail.value = data
}

// 返回计划列表
const goBack = () => {
    router.push({ name: "PlanList" })
}

// 加载打卡记录
const loadRecordData = async () => {
    const planid = detail.value.uid || route.query.id
    if (!planid) return notify('参数错误')
    const { code, data } = await getRecordList({ planid })
    if (code !== 0) return
    recordList.value = data
}


// 关闭计划
const snackbar = ref<boolean>(false)

const closePlanConfirm = () => {
    snackbar.value = true
}

const closePlan = async () => {
    try { 
        const uid = detail.value.uid || route.query.id
        const { code } = await completePlan({ uid })
        if (code !== 0) return
        notify('关闭成功')
    } catch (e) {
        console.log(e)
    } finally {
        snackbar.value = false
    }
    
}

onMounted(() => {
    loadData()
    loadRecordData()
})
</script>

<style scoped>

</style>