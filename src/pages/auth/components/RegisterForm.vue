<template>
    <v-form class="w-100">
        <v-text-field
            v-model="form.username"
            :error-messages="getMsgList('username')"
            :counter="10"
            label="用户名"
            required
            @input="v$.username.$touch"
            @blur="v$.username.$touch"
        ></v-text-field>

        <v-text-field
            v-model="form.realname"
            :error-messages="getMsgList('realname')"
            :counter="10"
            label="真实姓名"
            required
            @input="v$.realname.$touch"
            @blur="v$.realname.$touch"
        ></v-text-field>

        <v-text-field
            v-model="form.password"
            :error-messages="getMsgList('password')"
            label="密码"
            type="password"
            required
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <v-text-field
            v-model="form.repassword"
            :error-messages="getMsgList('repassword')"
            label="确认密码"
            type="password"
            required
            @input="v$.repassword.$touch"
            @blur="v$.repassword.$touch"
        ></v-text-field>

        <v-btn
            block
            class="my-8"
            color="blue"
            size="large"
            variant="tonal"
            @click="submit"
        >
            创建账号
        </v-btn>

        <v-card-text class="text-center" @click="toLogin">
            <a
                class="text-blue text-decoration-none"
                href="javascript: void(0);"
                rel="noopener noreferrer"
            >
                已有账号？去登录 <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
        </v-card-text>
    </v-form>
</template>

<script setup lang="ts">
import { register } from '@/api/auth'
import type { RegisterParamsT } from '@/api/auth'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import { useRouter } from 'vue-router'
import { notify } from '@/components/Notification'

const router = useRouter()

const initForm: RegisterParamsT = {
    username: '',
    password: '',
    repassword: '',
    realname: ''
}

const rule = {
    username: { required: helpers.withMessage('用户名不能为空', required) },
    password: { required: helpers.withMessage('密码不能为空', required) },
    realname: { required: helpers.withMessage('真实姓名不能为空', required) },
    repassword: {
        required: helpers.withMessage('确认密码不能为空', required),
        sameAsPassword: helpers.withMessage(
            '确认密码与密码不匹配',
            function (value: string, f: RegisterParamsT) {
                return value === f.password
            }
        )
    }
}

// 跳转至登录页
const toLogin = () => {
    router.push({ name: 'Login' })
}

const { v$, form, submit, getMsgList } = useFormValidate<RegisterParamsT>(
    initForm,
    rule,
    {
        callback: async () => {
            const res = await register(form.value)
            if (res.code !== 0) {
                console.log(res.msg)
                return
            }
            toLogin()
            notify('注册成功，自动跳转至登录页')
        }
    }
)
</script>

<style scoped></style>
