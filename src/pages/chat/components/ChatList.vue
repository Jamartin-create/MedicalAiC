<template>
    <v-navigation-drawer floating class="preset-bg pl-4 pb-4" :width="280">
        <v-sheet class="h-100 pt-5 rounded">
            <v-sheet class="w-100 d-flex justify-center">
                <v-btn append-icon="mdi-plus" @click="handleCreate">
                    创建新对话
                    <template v-slot:prepend>
                        <v-img
                            :height="25"
                            :width="25"
                            :src="DefaultAiAvatar"
                        />
                    </template>
                </v-btn>
            </v-sheet>
            <v-list class="w-100 mt-5 d-flex flex-column align-center">
                <template v-for="nav in navList" :key="nav.value">
                    <v-btn
                        class="preset-bg-gray w-75 my-2"
                        @click="handleSelect(nav.uid)"
                    >
                        {{ nav.title || 'New Chat' }}
                    </v-btn>
                </template>
            </v-list>
        </v-sheet>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import DefaultAiAvatar from '@/assets/images/default-robots-avatar.svg'
import { ref, onMounted } from 'vue'
import { getChatList } from '@/api/chat'
import { useRouter } from 'vue-router'

const router = useRouter()

const navList = ref<any[]>([])

const chatListInit = async () => {
    const { code, data } = await getChatList()
    if (code !== 0) return
    navList.value = data
}

const handleSelect = (uid: any) => {
    console.log('select---', uid)
    router.push({ name: 'Chat', params: { id: uid } })
}

const handleCreate = () => {
    console.log('新增')
    router.push({ name: 'Chat', params: { id: 'create' } })
}

onMounted(() => {
    chatListInit()
})
</script>
