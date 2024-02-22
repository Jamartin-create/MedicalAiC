<template>
    <div>
        <v-btn @click="toDashBoard">返回</v-btn>
        <v-form class="w-100">

            <v-text-field
                v-model="form.realname"
                :error-messages="getMsgList('realname')"
                :counter="10"
                label="真实姓名"
                required
                @input="v$.realname.$touch"
                @blur="v$.realname.$touch"
            ></v-text-field>


            <v-select
                v-model:model-value="form.gender"
                :items="[
                    { label: '男', value: 0 }, 
                    { label: '女', value: 1 },
                    { label: '未知', value: -1}
                ]"
                item-title="label"
                item-value="value"
                label="病别"
            ></v-select>

            <v-text-field
                v-model="form.tel"
                :error-messages="getMsgList('tel')"
                label="电话"
                required
                @input="v$.tel.$touch"
                @blur="v$.tel.$touch"
            ></v-text-field>


            <v-text-field
                v-model="form.age"
                :error-messages="getMsgList('age')"
                label="年龄"
                type="number"
                required
                @input="v$.age.$touch"
                @blur="v$.age.$touch"
            ></v-text-field>

            <v-row>
                <v-col>
                    <v-file-input
                        accept="image/*"
                        label="File input"
                        :loading="loading"
                        :error-messages="getMsgList('avatar')"
                        v-model:model-value="files"
                        @update:model-value="handleFileUpload"
                    ></v-file-input>
                </v-col>
                <v-col>
                    <v-img width="40px" :src="form.avatar" />
                </v-col>
            </v-row>

            <v-btn class="me-4" @click="submit">
                创建
            </v-btn>
            <v-btn @click="clear">
                重置
            </v-btn>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { useFormValidate } from '@/hooks/useValidate'
import type { UpdateUserInfoParamsT } from '@/api/auth';
import { notify } from '@/components/Notification';
import { useAuthStore } from '@/store/auth';
import { upload } from '@/utils/upload'
import { editInfo } from '@/api/auth'
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const router = useRouter()

const pinia = useAuthStore()

const { userInfo } = pinia

const initForm: UpdateUserInfoParamsT = {
    realname: userInfo?.realname || '',
    gender: userInfo?.gender == null ? -1 : userInfo.gender,
    age: userInfo?.age || null,
    tel: userInfo?.tel || '',
    avatar: userInfo?.avatar || '',
    uid: pinia.userInfoGetter.uid,
}

const rule = {
    realname: { required: helpers.withMessage('请输入真实姓名', required) },
    gender: { required: helpers.withMessage('请选择性别', required) },
    age: { required: helpers.withMessage('请输入年龄', required) },
    tel: {
        required: helpers.withMessage('请输入手机号', required),
        isTel: helpers.withMessage('请输入正确的手机号', (value: string) => {
            return /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
        })
    },
    avatar: { required: helpers.withMessage('请上传头像', required), },
}

const { v$, form, clear, submit, getMsgList } = useFormValidate<UpdateUserInfoParamsT>(initForm, rule, {
    callback: async () => {
        const { code } = await editInfo(form.value)
        if (code !== 0) return
        notify('更新成功')
        setTimeout(() => {
            router.push({ name: 'UserDetail' })
        }, 600)
    }
})



const files = ref<File[]>([])
const loading = ref<boolean>(false)

// AliOssClient.getInstance().then(res => {
//     // 有效期一天
//     const url = res.signatureUrl('/IMG_3672 21708505066 21708506291.png', { expires: 60 * 60 * 24 })
//     console.log('----', url)
// })


// 处理文件上传
const handleFileUpload = async (e: File[]) => {
    const file = e[0]

    loading.value = true
    try {
        const res = await upload(file)
        form.value.avatar = res
    } catch (e) {
        console.log(e)
    } finally {
        v$.value.avatar.$touch()
        loading.value = false
    }
}


// 返回首页
const toDashBoard = () => {
    router.push({ name: 'Dashboard' })
}


</script>