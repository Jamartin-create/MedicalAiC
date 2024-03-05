<template>
    <v-sheet
        class="preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex flex-column"
    >
        <CustomHead title="档案列表">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-plus"
                    @click="toCreate"
                />
            </template>
        </CustomHead>
        <v-virtual-scroll
            :items="list"
            class="flex-1-1 px-1"
            @scroll="handleScroll"
        >
            <template v-slot:default="{ item }">
                <CaseCard :item="item" @select="(it) => change(it.uid)" />
            </template>
        </v-virtual-scroll>
        <v-sheet v-if="loading" class="w-100 py-1 d-flex justify-center">
            <v-progress-circular indeterminate size="small" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { PageParamsT, PageResultT } from '@/api/types'
import CustomHead from '@/components/CustomHead.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getCaseList } from '@/api/case'
import useScroll from '@/hooks/useScroll'
import { onMounted } from 'vue'
import CaseCard from './CaseCard.vue'

const router = useRouter()

const emits = defineEmits(['change'])

// 加载数据相关
const list = ref<any[]>([])
const pageData = ref<Partial<PageResultT>>()
const loading = ref<boolean>(false)

const loadData = async (pageParams: PageParamsT) => {
    if (loading.value) return
    loading.value = true

    try {
        const { code, data } = await getCaseList({
            ...pageParams
        })
        if (code !== 0) return
        const { list: l, ...other } = data
        pageData.value = other

        if (other.hasPrevious) list.value = list.value.concat(l)
        else list.value = data.list
    } catch (e) {
        console.error('in CaseList.vue', e)
    } finally {
        loading.value = false
    }
}

// 触底加载
const { pageParams, handleScroll } = useScroll({
    callback: (pageParams: PageParamsT) => {
        if (!pageData.value?.hasNext) return
        loadData(pageParams)
    }
})

onMounted(() => {
    loadData(pageParams.value)
    pageParams.value.pageIndex += 1
})

// 其他逻辑
const toCreate = () => router.push({ name: 'CaseCreate' })

const change = (caseid: string) => emits('change', caseid)
</script>