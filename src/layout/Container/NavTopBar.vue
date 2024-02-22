<template>
    <v-app-bar :elevation="2" :height="70">
        <v-app-bar-title>MedicalAi</v-app-bar-title>
        <template v-slot:prepend>
            <div class="logo-wrp">
                <img class="w-100" :src="logo" />
            </div>
        </template>
        <template v-slot:append>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <Settings />
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import Settings from './Settings.vue';
</script>

<style scoped>
.logo-wrp {
    width: 50px;
}
</style>