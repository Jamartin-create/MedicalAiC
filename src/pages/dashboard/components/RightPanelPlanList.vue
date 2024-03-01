<template>
    <v-sheet class="panel-wrp preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex flex-column">
        <CustomHead title="Your Plans">
            <template #append>
                <v-btn class="preset-bg" size="small" icon="mdi-plus" @click="toCreate"></v-btn>
            </template>
        </CustomHead>
        <v-virtual-scroll :items="list" class="flex-1-1 px-1">
            <template v-slot:default="{ item, index }">
                <v-card
                    variant="flat"
                    rounded="xl"
                    class="mb-5"
                    :class="index % 2 === 0 ? 'preset-bg-orange' : 'preset-bg-green'"
                >
                    <v-card-title>占位标题</v-card-title>
                    <v-card-subtitle> {{ item.cycle }} - {{ item.status }} - {{ item.createdAt }} </v-card-subtitle>
                    <v-card-text> {{ item.type }} - {{ item.target }} </v-card-text>
                </v-card>
            </template>
        </v-virtual-scroll>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomHead from '@/components/CustomHead.vue';
import { getPlanList } from '@/api/plan';
import { onMounted, ref } from 'vue';
import router from '@/router';

const list = ref<any[]>([])

const loadData = async () => {
    const { code, data } = await getPlanList()
    if (code !== 0) return
    console.log('---', data)
    list.value = data
}

const toCreate = async () => {
    router.push({ name: 'PlanCreate' })
}

onMounted(() => {
    loadData()
})
</script>

<style lang="scss" scoped>
</style>