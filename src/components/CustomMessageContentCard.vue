<template>
    <!-- 通用消息内容展示组件 -->
    <div v-html="content" style="white-space: pre-wrap"></div>
</template>

<script setup lang="ts">
defineProps<{
    content: string
}>()
</script>

<style scoped></style>
