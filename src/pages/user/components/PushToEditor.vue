<template>
    <v-tooltip location="top" :text="`点击编辑${text}`" :open-delay="200">
        <template v-slot:activator="{ props }">
            <span
                v-bind="props"
                class="user-email-tips text-body-2 text-grey-lighten-1 cursor-pointer"
                @click="toEdit"
            >
                {{ value || `未填写${text}` }}
            </span>
        </template>
    </v-tooltip>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

type PropsT = {
    value?: string | number // 值
    text: string
}

const toEdit = () => {
    router.push({ name: 'UserEdit' })
}

defineProps<PropsT>()
</script>

<style scoped></style>
