<template>
    <div class="login-page d-flex justify-center">
        <v-card class="w-50 pa-6">
            <!-- 密码登录 -->
            <LoginForm />
        </v-card>
    </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue';
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()

console.log(auth)

</script>

<style scoped lang="scss">
.login-page {
    width: 600px;
}
</style>