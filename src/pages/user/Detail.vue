<template>
    <!-- 用户详情页面 -->
    <v-container class="user-basic-info">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row justify="center">
            <v-avatar size="70px">
                <v-img :src="userInfo.avatar || defaultAvatar" />
            </v-avatar>
        </v-row>
        <v-row justify="center" class="mt-5 text-h5">
            {{ userInfo.realname }}
        </v-row>
        <v-row
            justify="center"
            class="mt-5 d-flex align-center text-body-2 text-grey-lighten-1"
        >
            <PushToEditor :value="userInfo.tel" text="电话" />
            &nbsp;/&nbsp;
            <PushToEditor :value="userInfo.email" text="邮箱" />
        </v-row>
        <v-row
            justify="center"
            class="mt-5 d-flex align-center text-body-2 text-grey-lighten-1"
        >
            <PushToEditor :value="userInfo.age" text="年龄" />
            &nbsp;/&nbsp;
            <PushToEditor
                :value="
                    userInfo.gender === -1
                        ? '未知'
                        : userInfo.gender === 0
                        ? '男'
                        : '女'
                "
                text="性别"
            />
        </v-row>
        <v-row
            justify="center"
            class="mt-5 d-flex align-center text-body-2 text-grey-lighten-1"
        >
            <PushToEditor :value="userInfo.height" text="身高" />
            &nbsp;/&nbsp;
            <PushToEditor :value="userInfo.weight" text="体重" />
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import PushToEditor from './components/PushToEditor.vue'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import { notify } from '@/components/Notification'
import { useAuthStore } from '@/store/auth'
import { onMounted } from 'vue'
import { ref } from 'vue'

const pinia = useAuthStore()

const loading = ref<boolean>(false) // 当前是否正在加载数据

const userInfo = ref<any>({})

// 获取数据
async function loadData() {
    loading.value = true
    try {
        if (await pinia.getUserInfo()) {
            userInfo.value = pinia.userInfo
            return
        }
        notify('用户信息加载失败')
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
}

const breadcrumbs = [
    {
        title: '首页',
        disabled: false,
        href: '/dashboard'
    },
    {
        title: '个人中心',
        disabled: true
    }
]

// 挂载时即开始获取用户信息
onMounted(() => {
    loadData()
})
</script>

<style scoped></style>
