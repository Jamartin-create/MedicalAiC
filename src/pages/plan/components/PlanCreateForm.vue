<template>
    <v-form class="w-100">

        <v-radio-group
            inline 
            required
            label="计划类型"
            :error-messages="getMsgList('type')"
            v-model:model-value="form.type"
            @change="v$.type.$touch"
            @blur="v$.type.$touch"
        >
            <v-radio label="康复" :value="0"></v-radio>
            <v-radio label="养生" :value="1"></v-radio>
        </v-radio-group>

        <v-textarea
            required
            label="计划目标"
            :error-messages="getMsgList('target')"
            v-model:model-value="form.target"
            @input="v$.target.$touch"
            @blur="v$.target.$touch"
        />


        <v-radio-group
            inline 
            required
            label="周期单位"
            v-model:model-value="timeType"
        >
            <template v-for="item in timeTypeOptions">
                <v-radio :label="item.name" :value="item.value"></v-radio>
            </template>
            <v-radio label="养生" :value="1"></v-radio>
        </v-radio-group>

        
        <v-text-field
            label="周期"
            v-model:model-value="form.cycle"
            :suffix="timeType"
            @input="v$.cycle.$touch"
            @blur="v$.cycle.$touch"
        ></v-text-field>

        <v-btn class="me-4" @click="submit">
            创建
        </v-btn>
        <v-btn @click="clear">
            重置
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { CreatePlanParamsT, createPlan } from '@/api/plan'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import { ref } from 'vue'
import router from '@/router';
import { notify } from '@/components/Notification';

const timeType = ref<string>('天')
const timeTypeOptions = [
    { name: '天', value: '天' },
    { name: '周', value: '周' },
    { name: '月', value: '月' },
    { name: '年', value: '年' }
]

const initForm: CreatePlanParamsT = {
    type: 0, // 默认康复
    target: '',
    cycle: ''
}

const rule = {
    type: { required: helpers.withMessage('请选择计划类型', required) },
    target: { required: helpers.withMessage('请输入计划目标', required) },
    cycle: { required: helpers.withMessage('请选择计划周期', required) }
}

const { v$, form, clear, submit, getMsgList } = useFormValidate<CreatePlanParamsT>(initForm, rule, {
    callback: async () => {
        const { code } = await createPlan(form.value)
        if (code !== 0) return
        notify('创建成功')
        router.push({ name: 'PlanList' })
    }
})

</script>