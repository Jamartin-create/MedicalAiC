<template>
    <!-- 用户编辑页面 -->
    <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <BasicEditorForm />
    </v-container>
</template>

<script setup lang="ts">
import BasicEditorForm from './components/BasicEditorForm.vue'

// 面包屑
const breadcrumbs = [
    {
        title: '首页',
        disabled: false,
        href: '/dashboard'
    },
    {
        title: '个人信息',
        disabled: true
    }
]
</script>
