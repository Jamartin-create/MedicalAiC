<template>
    <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar color="green" size="large">
                    <v-img
                        :src="pinia.userInfoGetter.avatar || defaultAvatar"
                    />
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="brown">
                        <v-img
                            :src="pinia.userInfoGetter.avatar || defaultAvatar"
                        />
                    </v-avatar>
                    <h3 class="mt-5">{{ pinia.userInfoGetter.realname }}</h3>
                    <p class="text-caption mt-1">
                        {{ pinia.userInfoGetter.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="toEdit">
                        更新信息
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
</script>

<style scoped></style>
