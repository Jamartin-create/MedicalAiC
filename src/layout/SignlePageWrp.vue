<template>
    <v-app class="main-container w-100">
        <!-- 头部导航 -->
        <NavTopBar />

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
import { RouterView } from 'vue-router';

</script>
