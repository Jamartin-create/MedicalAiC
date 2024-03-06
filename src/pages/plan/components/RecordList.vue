<template>
    <v-sheet rounded="xl" class="preset-bg-light px-4 py-2 w-100 h-100">
        <CustomHead title="打卡记录">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-reply"
                    @click="back"
                />
            </template>
        </CustomHead>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomHead from '@/components/CustomHead.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转逻辑
const back = () => {
    router.push({ name: 'Home' })
}
</script>

<style scoped></style>
