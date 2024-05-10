<template>
    <v-sheet class="preset-bg-light w-100 h-100 px-4 py-2 rounded-xl">
        <CustomHead title="创建计划">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-reply"
                    @click="back"
                />
            </template>
        </CustomHead>
        <v-form class="w-100" :disabled="formdisabled">
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
            </v-radio-group>

            <v-text-field
                label="周期"
                v-model:model-value="form.cycle"
                :suffix="timeType"
                @input="v$.cycle.$touch"
                @blur="v$.cycle.$touch"
            ></v-text-field>

            <v-sheet class="bg-transparent d-flex justify-center">
                <v-btn
                    :loading="loading"
                    class="me-4"
                    :disabled="formdisabled"
                    @click="submit"
                >
                    创建
                </v-btn>
                <v-btn
                    :loading="loading"
                    :disabled="formdisabled"
                    @click="clear"
                >
                    重置
                </v-btn>
            </v-sheet>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { CreatePlanParamsT, createPlan } from '@/api/plan'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import CustomHead from '@/components/CustomHead.vue'
import { notify } from '@/components/Notification'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLoading from '@/hooks/useLoading'

const { show, hide } = useLoading()

const emits = defineEmits(['analize'])
const router = useRouter()

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

const formdisabled = ref<boolean>(false)

const { v$, form, loading, clear, submit, getMsgList } =
    useFormValidate<CreatePlanParamsT>(initForm, rule, {
        callback: async () => {
            show('正在创建计划')
            try {
                form.value.cycle += timeType.value
                const { code, data } = await createPlan(form.value)
                if (code !== 0) return
                notify('创建成功，即将开始分析')
                formdisabled.value = true
                emits('analize', data.uid) // 抛出事件
            } catch (e) {
                hide()
            }
        }
    })

// 其他逻辑

const back = () => {
    router.push({ name: 'Home' })
}
</script>
