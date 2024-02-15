<template>
    <v-app class="main-container w-100">
        <!-- 头部导航 -->
        <NavTopBar />

        <!-- 侧边栏 -->
        <SideBar />

        <v-main>
            <RouterView v-slot="{ Component }">
                <Transition name="page" mode="out-in">
                    <component :is="Component"></component>
                </Transition>
            </RouterView>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import NavTopBar from './Container/NavTopBar.vue';
import SideBar from './Container/SideBar.vue';
import { RouterView } from 'vue-router';

</script>

<style lang="scss" scoped>
</style>