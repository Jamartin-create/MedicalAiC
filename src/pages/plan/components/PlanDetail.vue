<template>
    <!-- 计划详情 -->
    <v-sheet rounded="xl" class="preset-bg-light w-100 h-100 px-4 py-2">
        <CustomHead title="计划详情">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-reply"
                    @click="back"
                />
            </template>
        </CustomHead>
        <v-sheet class="px-4">
            <CustomKeyValue label="名称" :label-width="100">
                {{ detail.title || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="周期" :label-width="100">
                {{ detail.cycle || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="目标" :label-width="100">
                {{ detail.target || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="状态" :label-width="100">
                {{ planStatus(detail.status) || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="类型" :label-width="100">
                {{ planType(detail.type) || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="开始日期" :label-width="100">
                {{ formatTime(detail.startAt, 'yyyy-MM-dd hh:mm:ss') || '— —' }}
            </CustomKeyValue>
            <CustomKeyValue label="结束日期" :label-width="100">
                {{ formatTime(detail.endAt, 'yyyy-MM-dd hh:mm:ss') || '— —' }}
            </CustomKeyValue>
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomKeyValue from '@/components/CustomKeyValue.vue'
import CustomHead from '@/components/CustomHead.vue'
import useDataDir from '@/hooks/useDataDir'
import { formatTime } from '@/utils/tools'

const router = useRouter()

type PropsT = {
    detail: any
}

defineProps<PropsT>()

// 数据字典
const { getValue: planStatus } = useDataDir('planStatus')
const { getValue: planType } = useDataDir('planType')

// 其他逻辑

const back = () => {
    router.push({ name: 'Home' })
}
</script>
