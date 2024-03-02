<template>
    <v-form class="w-100">

        <v-textarea
            required
            label="饮食"
            :error-messages="getMsgList('diet')"
            v-model:model-value="form.diet"
            @input="v$.diet.$touch"
            @blur="v$.diet.$touch"
        />

        <v-textarea
            required
            label="睡眠"
            :error-messages="getMsgList('sleep')"
            v-model:model-value="form.sleep"
            @input="v$.sleep.$touch"
            @blur="v$.sleep.$touch"
        />

        <v-textarea
            required
            label="用药"
            :error-messages="getMsgList('medical')"
            v-model:model-value="form.medical"
            @input="v$.medical.$touch"
            @blur="v$.medical.$touch"
        />

        <v-btn class="me-4" @click="submit">
            创建
        </v-btn>
        <v-btn @click="clear">
            重置
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { CreateRecordParamsT, createRecord } from '@/api/plan'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate';
import { useRoute, useRouter } from 'vue-router';
import { notify } from '@/components/Notification';

const router = useRouter()
const route = useRoute()

const initForm: CreateRecordParamsT = {
    diet: '',
    sleep: '',
    medical: '',
    planid: route.query.planid as string
}

const rule = {
    diet: { required: helpers.withMessage('请填写今日饮食', required)},
    sleep: { required: helpers.withMessage('请填写今日睡眠情况', required) },
    medical: { required: helpers.withMessage('请填写今日用药情况', required) }
}

const { v$, form, clear, submit, getMsgList } = useFormValidate<CreateRecordParamsT>(initForm, rule, {
    callback: async () => {
        const { code } = await createRecord(form.value)
        if (code !== 0) return
        notify('打卡成功')
        router.push({ name: 'Home' })
    }
})
</script>

<style scoped>

</style>