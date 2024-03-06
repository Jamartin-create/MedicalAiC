<template>
    <v-sheet
        class="preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex flex-column"
    >
        <CustomHead title="计划分析报告">
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
        <v-sheet class="preset-scroll flex-1-1 w-100 d-flex justify-center">
            <template v-if="overview.content">
                <CustomMessageContentCard
                    class="w-75"
                    :content="overview.content"
                />
            </template>
            <template v-else>
                <v-sheet>暂无分析报告~</v-sheet>
            </template>
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import CustomHead from '@/components/CustomHead.vue'
import CustomMessageContentCard from '@/components/CustomMessageContentCard.vue'

const route = useRoute()
const router = useRouter()

type PropsT = {
    overview: any
}

withDefaults(defineProps<PropsT>(), {
    overview: {}
})

// 其他逻辑
const toChat = () => {
    // 跳转到聊天页续写对话
    router.push({ name: 'ChatRoot', query: { planid: route.query.planid } })
}
</script>
