<template>
    <div class="case-list-wrp d-flex">
        <v-btn @click="toCreate">新建计划</v-btn>
        <template v-for="item in list" :key="item.uid">
            <PlanCard :item="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { getPlanList } from '@/api/plan';
import { onMounted } from 'vue';
import { ref } from 'vue';
import PlanCard from './components/PlanCard.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const list = ref<any[]>([])

const loadData = async () => {
    const { code, data } = await getPlanList()
    if (code !== 0) return
    list.value = data
}

const toCreate = () => {
    router.push({ name: 'PlanCreate' })
}

onMounted(() => {
    loadData()
})

</script>

<style scoped>

</style>