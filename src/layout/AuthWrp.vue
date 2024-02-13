<template>
    <div class="auth-container">
        权限界面框架
        <RouterView>
            <slot></slot>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>

</style>