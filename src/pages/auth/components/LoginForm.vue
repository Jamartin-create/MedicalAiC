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
            v-model="form.password"
            :error-messages="getMsgList('password')"
            label="密码"
            type="password"
            required
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <v-checkbox
            v-model="form.staystatus"
            label="30 天内保持登录状态？"
            required
        ></v-checkbox>

        <v-btn class="me-4" @click="submit">
            登录
        </v-btn>
        <v-btn @click="clear">
            重置
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { PwdLoginParamsT } from '@/api/auth'
import { helpers, required } from '@vuelidate/validators'
// import { useAuthStore } from '@/store/auth'
import { useFormValidate } from '@/hooks/useValidate'
// const auth = useAuthStore()

const initForm: PwdLoginParamsT = {
    username: '',
    password: '',
    staystatus: false
}

const rule = {
    username: { required: helpers.withMessage('用户名不能为空', required)},
    password: { required: helpers.withMessage('密码不能为空', required) }
}

const { v$, form, clear, submit, getMsgList } = useFormValidate<PwdLoginParamsT>(initForm, rule, {
    callback: () => {
        // auth.login(form.value)
        console.log('dddd')
    }
})

</script>

<style scoped>

</style>