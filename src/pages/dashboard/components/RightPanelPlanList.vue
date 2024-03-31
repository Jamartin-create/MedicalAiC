<template>
    <v-sheet
        class="panel-wrp preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex flex-column"
    >
        <CustomHead title="Your Plans">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-plus"
                    @click="toCreate"
                ></v-btn>
            </template>
        </CustomHead>
        <v-sheet class="w-100 h-auto py-4 px-2 d-flex justify-center">
            <template v-for="item in items" :key="item.value">
                <div
                    class="plan-tab mx-1 px-3 py-2 rounded-xl cursor-pointer"
                    :class="{ 'preset-bg-dark text-white': item.active }"
                    @click="handleChangeTab(item.value)"
                >
                    {{ item.label }}
                </div>
            </template>
        </v-sheet>
        <v-virtual-scroll
            v-if="list.length"
            ref="virtualList"
            :items="list"
            class="flex-1-1 px-1"
            @scroll="handleScroll"
        >
            <template v-slot:default="{ item, index }">
                <v-card
                    variant="flat"
                    rounded="xl"
                    class="mb-5"
                    :class="
                        index % 2 === 0 ? 'preset-bg-orange' : 'preset-bg-green'
                    "
                >
                    <v-card-title> {{ item.title }} </v-card-title>
                    <v-card-subtitle>
                        {{ item.cycle }} - {{ planStatus(item.status) }} -
                        {{ formatTime(item.createdAt) }}
                    </v-card-subtitle>
                    <v-card-text>
                        {{ planType(item.type) }} - {{ item.target }}
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn @click="toRecordList(item.uid)">
                            打卡记录
                        </v-btn>
                        <v-btn @click="toPlanOverview(item.uid)">
                            分析报告
                        </v-btn>
                        <v-btn
                            v-if="item.status !== 1"
                            @click="handleOverPlan(item.uid)"
                        >
                            结束计划
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-virtual-scroll>
        <CustomEmpty v-else />
        <v-sheet v-if="loading" class="w-100 py-1 d-flex justify-center">
            <v-progress-circular indeterminate size="small" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomHead from '@/components/CustomHead.vue'
import useListScroll from '@/hooks/useScroll'
import useCreateTabs from '@/hooks/useCreateTabs'
import { completePlan, getPlanList } from '@/api/plan'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { PageParamsT, PageResultT } from '@/api/types'
import useDataDir from '@/hooks/useDataDir'
import { formatTime } from '@/utils/tools'
import CustomEmpty from '@/components/CustomEmpty.vue'

// 筛选 tab 相关
type TabT = {
    label: string
    value: number
}
const tabs: TabT[] = [
    { label: '全部', value: -1 },
    { label: '进行', value: 0 },
    { label: '结束', value: 1 }
    // { label: '中断', value: 2 }
]

// 使用 tab hook
const { active, items, handleChangeTab } = useCreateTabs<TabT>(tabs, {
    defaultActive: -1,
    callback: () => {
        // 切换 tab 就要重置一下分页重新查
        resetPage()
        loadData(pageParams.value)
    }
})

// 加载数据相关
const list = ref<any[]>([])
const pageData = ref<Partial<PageResultT>>()
const loading = ref<boolean>(false)

const loadData = async (pageParams: PageParamsT) => {
    if (loading.value) return
    loading.value = true

    try {
        const { code, data } = await getPlanList({
            ...pageParams,
            status: active.value as number
        })
        if (code !== 0) return
        const { list: l, ...other } = data
        pageData.value = other

        if (other.hasPrevious) list.value = list.value.concat(l)
        else list.value = data.list
    } catch (e) {
        console.log('in RightPanelPlanList.vue', e)
    } finally {
        loading.value = false
    }
}

// 触底加载
const { pageParams, resetPage, handleScroll } = useListScroll({
    callback: (pageParams: PageParamsT) => {
        // 查一下 flag 看是否还有后续
        if (!pageData.value?.hasNext) return
        loadData(pageParams)
    }
})

onMounted(() => {
    loadData(pageParams.value)
    pageParams.value.pageIndex += 1
})

// 数据字典
const { getValue: planStatus } = useDataDir('planStatus')
const { getValue: planType } = useDataDir('planType')

// 零散逻辑

const toCreate = async () => {
    router.push({ name: 'PlanCreate' })
}

const toPlanOverview = async (planid: string) => {
    router.push({ name: 'PlanOverview', query: { planid } })
}

const toRecordList = async (planid: string) => {
    router.push({ name: 'RecordList', query: { planid } })
}

// 结束计划
const handleOverPlan = async (planid: string) => {
    const { code } = await completePlan({ uid: planid })
    if (code !== 0) return
    resetPage()
    loadData(pageParams.value)
}
</script>

<style lang="scss" scoped>
.plan-tab {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in 0.3s;
}

@media screen and (max-width: 800px) {
    .plan-tab {
        width: 100px;
    }
}
</style>
