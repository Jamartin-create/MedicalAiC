<template>
    <v-app-bar class="preset-bg" :elevation="0" :height="110">
        <v-container
            class="preset-bg-light w-auto py-0 px-0 rounded-pill d-flex align-center justify-center"
        >
            <div class="w-auto h-auto d-flex">
                <template v-for="tab in items" :key="tab.name">
                    <div
                        class="cursor-pointer px-10 py-4 rounded-pill text-body-2 font-weight-regular"
                        :class="{ 'preset-bg-dark text-white': tab.active }"
                        @click="handleChangeTab(tab.value)"
                    >
                        {{ tab.label }}
                    </div>
                </template>
            </div>
        </v-container>
        <template v-slot:prepend>
            <v-sheet class="preset-bg d-flex align-center">
                <div class="logo-wrp mx-4">
                    <img class="w-100" :src="logo" />
                </div>
                <v-app-bar-title>MedicalAi</v-app-bar-title>
            </v-sheet>
        </template>
        <template v-slot:append>
            <v-sheet class="preset-bg-light w-auto mr-5 px-1 py-1 rounded-pill d-flex align-center justify-center">
                <Settings />
                <v-sheet class="mx-4">LilMartin</v-sheet>
                <v-btn class="text-body-2" size="small" icon="mdi-help" />
                <v-btn class="text-body-2" size="small" icon="mdi-tune" />
            </v-sheet>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import Settings from './Settings.vue'
import { useRoute, useRouter } from 'vue-router'
import useCreateTabs from '@/hooks/useCreateTabs'

const route = useRoute()
const router = useRouter()

type TabT = {
    label: string
    path: string
    value: string
}

const tabs: TabT[] = [
    { label: '工作台', path: '/dashboard/home', value: 'Home' },
    { label: '你的助手', path: '/dashboard/chat/create', value: 'Chat' },
    { label: '健康档案', path: '/dashboard/case/list', value: 'CaseList' }
]

// 利用 hook 获取需要的列表 & 一些公用事件
const { items, handleChangeTab } = useCreateTabs<TabT>(tabs, {
    defaultActive: route.name as string,
    callback: (item: TabT) => {
        router.push({ path: item.path })
    }
})

</script>

<style scoped>
.logo-wrp {
    width: 50px;
}
</style>
