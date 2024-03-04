<template>
    <v-sheet class="preset-bg-light w-100 h-100 px-4 py-2 rounded-xl">
        <CustomHead title="创建健康档案">
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
                label="当前状况"
                :error-messages="getMsgList('curSituation')"
                v-model:model-value="form.curSituation"
                @change="v$.curSituation.$touch"
                @blur="v$.curSituation.$touch"
            >
                <v-radio label="差" :value="0"></v-radio>
                <v-radio label="一般" :value="1"></v-radio>
                <v-radio label="挺好的" :value="2"></v-radio>
            </v-radio-group>

            <v-textarea
                required
                label="自我描述"
                :error-messages="getMsgList('summary')"
                v-model:model-value="form.summary"
                @input="v$.summary.$touch"
                @blur="v$.summary.$touch"
            />

            <v-combobox
                chips
                multiple
                label="病史"
                :items="mdHistoryOptions"
                v-model:model-value="form.mdHistory"
            />

            <v-combobox
                chips
                multiple
                label="用药史"
                v-model:model-value="form.medical"
            ></v-combobox>

            <v-sheet class="bg-transparent d-flex justify-center">
                <v-btn :disabled="formdisabled" class="me-4" @click="submit">
                    创建
                </v-btn>
                <v-btn :disabled="formdisabled" @click="clear"> 重置 </v-btn>
            </v-sheet>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { CreateCaseParamsT, createCase } from '@/api/case'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import CustomHead from '@/components/CustomHead.vue'
import { notify } from '@/components/Notification'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emits = defineEmits(['analize'])

const initForm: CreateCaseParamsT = {
    curSituation: 0,
    summary: '',
    medical: [],
    mdHistory: []
}

const mdHistoryOptions = ref<string[]>()

const rule = {
    curSituation: {
        required: helpers.withMessage('请选择符合自己当前状况的描述', required)
    },
    summary: {
        required: helpers.withMessage('请具体描述一下你目前的状况', required)
    }
}

const formdisabled = ref<boolean>(false)

const { v$, form, clear, submit, getMsgList } =
    useFormValidate<CreateCaseParamsT>(initForm, rule, {
        callback: async () => {
            const { code, data } = await createCase(form.value)
            if (code !== 0) return
            notify('创建成功，即将开始分析')
            formdisabled.value = true
            emits('analize', data.uid)
        }
    })

// 其他逻辑
const back = () => {
    router.push({ name: 'CaseList' })
}
</script>
