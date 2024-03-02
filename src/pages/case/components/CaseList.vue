<template>
    <v-sheet class="preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex flex-column">
        <CustomHead title="档案列表">
            <template #append>
                <v-btn class="preset-bg" size="small" icon="mdi-plus" @click="toCreate" />
            </template>
        </CustomHead>
        <v-virtual-scroll :items="list" class="flex-1-1 px-1" @scroll="handleScroll">
            <template v-slot:default="{ item }">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-card
                            variant="flat"
                            rounded="xl"
                            :color="isHovering ? 'primary': ''"
                            class="preset-bg mb-3 d-flex cursor-pointer justify-space-between"
                            v-bind="props"
                            @click="change(item.uid)"
                        >
                            <v-sheet class="bg-transparent d-flex flex-column">
                                <v-card-title>症状关键词占位</v-card-title>
                                <v-card-subtitle> 症状关键词列表 </v-card-subtitle>
                                <v-card-text> {{ item.status }} - {{ item.createdAt }} </v-card-text>
                            </v-sheet>
                            <v-sheet class="bg-transparent d-flex align-center">
                                <v-btn class="preset-bg mr-2" size="small" icon="mdi-pencil" /> 
                                <v-btn class="preset-bg mr-2" size="small" icon="mdi-calendar-blank-multiple" />
                                <v-btn class="bg-red" size="small" icon="mdi-delete" />  
                            </v-sheet>
                        </v-card>
                    </template>
                </v-hover>
            </template>
        </v-virtual-scroll>
        <v-sheet v-if="loading" class="w-100 py-1 d-flex justify-center">
            <v-progress-circular indeterminate size="small" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { PageParamsT, PageResultT } from '@/api/types';
import CustomHead from '@/components/CustomHead.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getCaseList } from '@/api/case';
import useScroll from '@/hooks/useScroll';
import { onMounted } from 'vue';

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

        if(other.hasPrevious) list.value = list.value.concat(l)
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

<style scoped>

</style>