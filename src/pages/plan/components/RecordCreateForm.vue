<template>
    <v-sheet rounded="xl" class="preset-bg-light w-100 h-100 px-4 py-2">
        <custom-head title="计划打卡">
            <template #append>
                <v-btn
                    class="preset-bg"
                    size="small"
                    icon="mdi-reply"
                    @click="back"
                />
            </template>
        </custom-head>
        <v-form class="w-100" :disabled="formdisabled">
            <v-textarea
                required
                label="饮食"
                rows="2"
                :error-messages="getMsgList('diet')"
                v-model:model-value="form.diet"
                @input="v$.diet.$touch"
                @blur="v$.diet.$touch"
            />

            <v-textarea
                required
                label="睡眠"
                rows="2"
                :error-messages="getMsgList('sleep')"
                v-model:model-value="form.sleep"
                @input="v$.sleep.$touch"
                @blur="v$.sleep.$touch"
            />

            <v-textarea
                required
                label="用药"
                rows="2"
                :error-messages="getMsgList('medical')"
                v-model:model-value="form.medical"
                @input="v$.medical.$touch"
                @blur="v$.medical.$touch"
            />

            <v-textarea
                required
                label="其他"
                rows="2"
                v-model:model-value="form.other"
            />

            <v-sheet class="d-flex justify-center mt-2">
                <v-btn
                    :loading="loading"
                    :disabled="formdisabled"
                    class="me-4"
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
import { CreateRecordParamsT, createRecord } from '@/api/plan'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/components/Notification'
import CustomHead from '@/components/CustomHead.vue'
import { ref } from 'vue'
import useLoading from '@/hooks/useLoading'

const { show, hide } = useLoading()

const emits = defineEmits(['analize'])
const router = useRouter()
const route = useRoute()

const initForm: CreateRecordParamsT = {
    diet: '',
    sleep: '',
    medical: '',
    other: '',
    planid: route.query.id as string
}

const rule = {
    diet: { required: helpers.withMessage('请填写今日饮食', required) },
    sleep: { required: helpers.withMessage('请填写今日睡眠情况', required) },
    medical: { required: helpers.withMessage('请填写今日用药情况', required) }
}

const formdisabled = ref<boolean>(false)

const { v$, form, loading, clear, submit, getMsgList } =
    useFormValidate<CreateRecordParamsT>(initForm, rule, {
        callback: async () => {
            show('正在创建打卡记录')
            try {
                const { code, data } = await createRecord(form.value)
                if (code !== 0) return
                notify('打卡成功')
                formdisabled.value = true
                emits('analize', data.uid)
            } catch (e) {
                console.log(e)
            } finally {
                hide()
            }
        }
    })

// 其他逻辑
const back = () => {
    router.push({ name: 'Home' })
}
</script>

<style scoped></style>
