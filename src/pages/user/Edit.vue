<template>
    <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <BasicEditorForm />
    </v-container>
</template>

<script setup lang="ts">
import BasicEditorForm from './components/BasicEditorForm.vue'

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
