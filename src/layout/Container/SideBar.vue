<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        :width="180"
        :rail-width="65"
        @click="rail = false"
    >
        <v-list density="compact" nav @click:select="handleSelect">
            <template v-for="nav in navList" :key="nav.value">
                <v-list-item :prepend-icon="nav.preIcon" :title="nav.title" :value="nav.value"></v-list-item>
            </template>
        </v-list>
        <template #append>
            <v-list-item nav>
                <template v-slot:prepend>
                    <v-btn @click="logout" v-if="!rail" prepend-icon="mdi-logout">退出登录</v-btn>
                </template>
                <template v-slot:append>
                    <v-btn
                        variant="text"
                        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { navList } from '../config';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter()
const pinia = useAuthStore()

const drawer = ref<boolean>(true)
const rail = ref<boolean>(true)

const handleSelect = (a: any) => {
    router.push({ path: a.id })
}

const logout = () => pinia.logout()
</script>

<style scoped>

</style>