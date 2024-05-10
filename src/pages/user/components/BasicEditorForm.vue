<template>
    <v-form class="w-100">
        <v-divider />
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="form.realname"
                        class="mb-5"
                        :counter="10"
                        label="化名"
                        hint="化名用于平台对您的称呼，您可随时删除，删除后平台将用用户名来称呼您~"
                        persistent-hint
                        :persistent-counter="false"
                    ></v-text-field>

                    <v-select
                        v-model="form.gender"
                        class="mb-5"
                        :error-messages="getMsgList('gender')"
                        :items="[
                            { label: '男', value: 0 },
                            { label: '女', value: 1 },
                            { label: '未知', value: -1 }
                        ]"
                        item-title="label"
                        item-value="value"
                        label="性别"
                        hint="提供您的性别有助于我们为您提供更加个性化和适当的医疗建议~"
                        persistent-hint
                        @input="v$.gender.$touch"
                        @blur="v$.gender.$touch"
                    ></v-select>

                    <v-text-field
                        v-model="form.age"
                        class="mb-5"
                        :error-messages="getMsgList('age')"
                        label="年龄"
                        type="number"
                        hint="请提供您的年龄，以便我们更好地了解您的年龄段，为您推荐适当的健康建议和服务~"
                        persistent-hint
                        @input="v$.age.$touch"
                        @blur="v$.age.$touch"
                    ></v-text-field>

                    <v-text-field
                        v-model="form.height"
                        class="mb-5"
                        :error-messages="getMsgList('height')"
                        label="身高"
                        type="number"
                        hint="提供您的身高和体重信息有助于我们提供更精确的健康建议和监测您的整体健康状况~"
                        persistent-hint
                        @input="v$.height.$touch"
                        @blur="v$.height.$touch"
                    ></v-text-field>

                    <v-text-field
                        v-model="form.weight"
                        class="mb-5"
                        :error-messages="getMsgList('weight')"
                        label="体重"
                        type="number"
                        @input="v$.weight.$touch"
                        @blur="v$.weight.$touch"
                    ></v-text-field>

                    <v-combobox
                        class="mb-5"
                        chips
                        multiple
                        label="过敏史"
                        :items="[]"
                        v-model="form.allergy"
                        hint="请列举您的过敏信息，包括对食物、药物或其他物质的过敏情况，以便我们为您提供更安全的医疗建议~"
                        persistent-hint
                    />

                    <v-combobox
                        class="mb-5"
                        chips
                        multiple
                        label="病史"
                        :items="[]"
                        v-model="form.medicalHis"
                        hint="请分享您的医疗病史，包括手术历史、疾病诊断等，以帮助我们更好地了解您的医疗背景~"
                        persistent-hint
                    />

                    <v-text-field
                        v-model="form.tel"
                        class="mb-5"
                        label="电话"
                        hint="提供一个可靠的联系电话是确保我们能够在需要时与您联系的关键。我们将保护您的隐私信息，仅在必要时使用该号码~"
                        persistent-hint
                    ></v-text-field>
                </v-col>
                <v-col cols="6" align="center">
                    <v-avatar size="200">
                        <v-img :src="form.avatar" />
                    </v-avatar>

                    <v-file-input
                        prepend-icon="mdi-image"
                        accept="image/*"
                        class="w-50 mt-5"
                        label="要更换头像点我"
                        :loading="loading"
                        v-model:model-value="files"
                        @update:model-value="handleFileUpload"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col class="d-flex justify-center">
                    <v-btn class="mb-8" color="blue" @click="submit">
                        保存更新
                    </v-btn>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import type { UpdateUserInfoParamsT } from '@/api/auth'
import { notify } from '@/components/Notification'
import { useAuthStore } from '@/store/auth'
import { upload } from '@/utils/upload'
import { editInfo } from '@/api/auth'
import { ref } from 'vue'

const pinia = useAuthStore()

const { userInfo } = pinia

// 初始表单
const initForm: UpdateUserInfoParamsT = {
    realname: userInfo?.realname || '',
    gender: userInfo?.gender == null ? -1 : userInfo.gender,
    age: userInfo?.age || null,
    tel: userInfo?.tel || '',
    avatar: userInfo?.avatar || '',
    allergy: userInfo?.allergy || [],
    medicalHis: userInfo?.medicalHis || [],
    height: userInfo?.height,
    weight: userInfo?.weight,
    uid: pinia.userInfoGetter.uid
}

// 表单校验规则
const rule = {
    gender: {
        required: helpers.withMessage(
            '请选择性别，以便平台更精准的为您服务',
            required
        ),
        choseGender: helpers.withMessage(
            '请选择性别，以便平台更精准的为您服务',
            (value: number) => value != -1
        )
    },
    age: {
        required: helpers.withMessage(
            '请输入年龄，以便平台更精准的为您服务',
            required
        ),
        inputAge: helpers.withMessage(
            '请输入年龄，以便平台更精准的为您服务',
            (value: number) => value > 0 && value < 200
        )
    },
    height: {
        required: helpers.withMessage(
            '请输入身高，以便平台更精准的为您服务',
            required
        ),
        inputAge: helpers.withMessage(
            '请输入身高，以便平台更精准的为您服务',
            (value: number) => value > 0 && value < 300
        )
    },
    weight: {
        required: helpers.withMessage(
            '请输入体重，以便平台更精准的为您服务',
            required
        ),
        inputAge: helpers.withMessage(
            '请输入体重，以便平台更精准的为您服务',
            (value: number) => value > 0
        )
    }
}

// 利用表单创建 hook，处理表单信息
const { v$, form, submit, getMsgList } = useFormValidate<UpdateUserInfoParamsT>(
    initForm,
    rule,
    {
        callback: async () => {
            const { code } = await editInfo(form.value)
            console.log(code)
            if (code !== 0) return
            pinia.getUserInfo()
            notify('更新成功')
        }
    }
)

const files = ref<File[]>([])
const loading = ref<boolean>(false)

// 处理文件上传
const handleFileUpload = async (e: File[]) => {
    console.log(e)
    const file = e[0]

    loading.value = true
    try {
        const res = await upload(file)
        form.value.avatar = res
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped lang="scss"></style>
