<template>
    <div>
        <v-btn @click="toDashBoard">返回</v-btn>

        <v-card
            class="mx-auto"
            color="#26c6da"
            theme="dark"
            max-width="400"
            prepend-icon="mdi-twitter"
            :loading="loading"
            title="Twitter"
        >
            <template v-slot:prepend>
                <v-icon size="x-large"></v-icon>
            </template>

            <v-card-text class="text-h5 py-2">
                "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
                <v-list-item class="w-100">
                    <template v-slot:prepend>
                        <v-avatar
                            color="grey-darken-3"
                            :image="userInfo.avatar"
                        ></v-avatar>
                    </template>

                    <v-list-item-title>{{ userInfo.realname }}</v-list-item-title>

                    <v-list-item-subtitle>{{ userInfo.tel }}</v-list-item-subtitle>

                    <template v-slot:append>
                        <div class="justify-self-end">
                            <v-icon class="me-1" icon="mdi-heart"></v-icon>
                                <span class="subheading me-2">{{ userInfo.gender }}</span>
                                <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                            <span class="subheading">{{ userInfo.age }}</span>
                        </div>
                    </template>
                </v-list-item>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { notify } from '@/components/Notification';
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const pinia = useAuthStore()
const router = useRouter()

const loading = ref<boolean>(false)

const userInfo = ref<any>({})

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


// 返回首页
const toDashBoard = () => {
    router.push({ name: 'Dashboard' })
}


onMounted(() => {
    loadData()
})

</script>

<style scoped>

</style>