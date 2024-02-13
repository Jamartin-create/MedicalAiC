<template>
    <div class="main-container">
        主框架
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