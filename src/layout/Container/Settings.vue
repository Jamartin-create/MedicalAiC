<template>
    <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar color="green" size="large">
                    <v-img :src="pinia.userInfo.avatar || defaultAvatar" />
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="brown">
                        <v-img :src="pinia.userInfo.avatar || defaultAvatar" />
                    </v-avatar>
                    <h3 class="mt-5">{{ pinia.userInfo.realname }}</h3>
                    <p class="text-caption mt-1">
                        {{ pinia.userInfo.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="toEdit">
                        更新信息
                    </v-btn>
                    <v-btn
                        class="preset-bg-orange"
                        rounded
                        variant="text"
                        @click="logout"
                    >
                        退出登录
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const pinia = useAuthStore()
const router = useRouter()

const toEdit = () => router.push({ name: 'UserEdit' })

const logout = () => pinia.logout()
</script>

<style scoped></style>
