<template>
    <v-form class="w-100">
        <v-text-field
            v-model="form.username"
            :error-messages="getMsgList('username')"
            :counter="10"
            label="用户名"
            @input="v$.username.$touch"
            @blur="v$.username.$touch"
        ></v-text-field>

        <v-text-field
            v-model="form.password"
            :error-messages="getMsgList('password')"
            label="密码"
            type="password"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <v-checkbox
            v-model="form.staystatus"
            label="30 天内保持登录状态？"
        ></v-checkbox>

        <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            @click="submit"
        >
            登录
        </v-btn>

        <v-card-text class="text-center" @click="toRegister">
            <a
                class="text-blue text-decoration-none"
                href="javascript: void(0);"
                rel="noopener noreferrer"
            >
                没有账号？去注册 <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
        </v-card-text>
    </v-form>
</template>

<script setup lang="ts">
import { PwdLoginParamsT } from '@/api/auth'
import { helpers, required } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import { useFormValidate } from '@/hooks/useValidate'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()

const initForm: PwdLoginParamsT = {
    username: '',
    password: '',
    staystatus: false
}

const rule = {
    username: { required: helpers.withMessage('用户名不能为空', required) },
    password: { required: helpers.withMessage('密码不能为空', required) }
}

const toRegister = () => {
    router.push({ name: 'Register' })
}

const { v$, form, submit, getMsgList } = useFormValidate<PwdLoginParamsT>(
    initForm,
    rule,
    {
        callback: () => auth.login(form.value)
    }
)
</script>
