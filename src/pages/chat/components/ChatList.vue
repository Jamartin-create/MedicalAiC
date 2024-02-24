<template>
    <v-navigation-drawer :width="180">
        <div class="w-100 pt-5 d-flex justify-center">
            <v-btn append-icon="mdi-plus" @click="handleCreate">
                创建新对话
                <template v-slot:prepend>
                    <v-img :height="25" :width="25" :src="DefaultAiAvatar" />
                </template>
            </v-btn>
        </div>
        <v-list @click:select="handleSelect">
            <template v-for="nav in navList" :key="nav.value">
                <v-list-item
                    :title="nav.title || 'New Chat'"
                    :value="nav.uid"
                ></v-list-item>
            </template>
        </v-list>
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

const handleSelect = (e: any) => {
    console.log('select---', e)
    router.push({ name: 'Chat', params: { id: e.id } })
}

const handleCreate = () => {
    console.log('新增')
    router.push({ name: 'Chat', params: { id: 'create' } })
}

onMounted(() => {
    chatListInit()
})
</script>
