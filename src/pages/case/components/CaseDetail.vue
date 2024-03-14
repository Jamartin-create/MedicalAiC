<template>
    <v-sheet
        class="preset-bg-light w-100 h-100 rounded-xl py-2 px-2 d-flex flex-column"
    >
        <CustomHead title="档案分析报告">
            <template #append>
                <v-tooltip text="聊聊？">
                    <template #activator="{ props }">
                        <v-btn
                            v-bind="props"
                            class="preset-bg"
                            size="small"
                            icon="mdi-chat"
                            @click="toChat"
                        />
                    </template>
                </v-tooltip>
            </template>
        </CustomHead>
        <v-sheet
            class="preset-scroll w-100 py-6 px-4 d-flex h-100"
            v-if="caseid"
        >
            <v-sheet class="w-50 px-4">
                <CustomKeyValue label="当前状况">
                    {{ getValue(detail.curSituation) || '— —' }}
                </CustomKeyValue>
                <CustomKeyValue label="自我描述">
                    {{ detail.summary || '— —' }}
                </CustomKeyValue>
                <CustomKeyValue label="用药情况">
                    {{ detail.medical || '— —' }}
                </CustomKeyValue>
                <CustomKeyValue label="病史描述">
                    {{ detail.mdHistory || '— —' }}
                </CustomKeyValue>
            </v-sheet>
            <v-sheet class="w-50">
                <template v-if="!!detail.analizeDetail?.content">
                    <CustomMessageContentCard
                        :content="detail.analizeDetail.content"
                    />
                </template>
                <template v-else>
                    <v-sheet
                        class="w-100 h-100 d-flex justify-center align-center"
                    >
                        未检测到分析报告~
                    </v-sheet>
                </template>
            </v-sheet>
        </v-sheet>
        <v-sheet v-else class="w-100 h-100 d-flex justify-center align-center">
            未选择档案～
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { getCaseDetail } from '@/api/case'
import CustomHead from '@/components/CustomHead.vue'
import CustomKeyValue from '@/components/CustomKeyValue.vue'
import CustomMessageContentCard from '@/components/CustomMessageContentCard.vue'
import useDataDir from '@/hooks/useDataDir'
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type PropsT = {
    caseid: string
}

const props = defineProps<PropsT>()

// 档案详情
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

// 数据字典
const { getValue } = useDataDir('caseSituation')

// 其他逻辑
const toChat = () => {
    // 跳转到聊天页续写对话
    router.push({ name: 'ChatRoot', query: { planid: detail.value.uid } })
}
</script>

<style scoped></style>
