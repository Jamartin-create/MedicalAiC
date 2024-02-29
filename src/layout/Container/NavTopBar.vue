<template>
    <v-app-bar class="preset-bg" :elevation="0" :height="90">
        <v-container
            class="preset-bg-light w-auto py-3 px-4 rounded-lg d-flex align-center justify-center"
        >
            <div class="w-auto h-auto d-flex">
                <template v-for="tab in tabs" :key="tab.name">
                    <div
                        class="cursor-pointer mx-2 px-6 py-2 rounded-xl"
                        :class="{ 'preset-bg-orange': active === tab.name }"
                        @click="handleChangeTab(tab)"
                    >
                        {{ tab.label }}
                    </div>
                </template>
            </div>
        </v-container>
        <template v-slot:prepend>
            <div class="logo-wrp">
                <img class="w-100" :src="logo" />
            </div>
            <v-app-bar-title>MedicalAi</v-app-bar-title>
        </template>
        <template v-slot:append>
            <Settings />
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import Settings from './Settings.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

type TabT = {
    label: string
    path: string
    name: string
}

const tabs: TabT[] = [
    { label: '工作台', path: '/dashboard/home', name: 'Home' },
    { label: '你的助手', path: '/dashboard/chat/create', name: 'Chat' },
    { label: '健康档案', path: '/dashboard/case/list', name: 'CaseList' }
]

const active = ref<string>(route.name as string)

const handleChangeTab = (tab: TabT) => {
    router.push({ path: tab.path })
    active.value = tab.name
}
</script>

<style scoped>
.logo-wrp {
    width: 50px;
}
</style>
