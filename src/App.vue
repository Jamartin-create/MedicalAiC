<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/store/auth'

useAuthStore().getUserInfo() // 项目启动即获取一次用户信息（token 等……）
</script>

<template>
    <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
            <component :is="Component"></component>
        </Transition>
    </RouterView>
</template>
