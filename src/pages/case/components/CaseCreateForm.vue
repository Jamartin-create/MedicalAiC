<template>
    <v-form class="w-100">

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

        <v-btn class="me-4" @click="submit">
            创建
        </v-btn>
        <v-btn @click="clear">
            重置
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { CreateCaseParamsT, createCase } from '@/api/case'
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import { notify } from '@/components/Notification';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const initForm: CreateCaseParamsT = {
    curSituation: 0,
    summary: '',
    medical: [],
    mdHistory: []
}

const mdHistoryOptions = ref<string[]>()

const rule = {
    curSituation: { required: helpers.withMessage('请选择符合自己当前状况的描述', required)},
    summary: { required: helpers.withMessage('请具体描述一下你目前的状况', required) }
}

const { v$, form, clear, submit, getMsgList } = useFormValidate<CreateCaseParamsT>(initForm, rule, {
    callback: async () => {
        const { code } = await createCase(form.value)
        if (code !== 0) return
        notify('创建成功')
        router.push({ name: 'CaseList' })
    }
})

</script>