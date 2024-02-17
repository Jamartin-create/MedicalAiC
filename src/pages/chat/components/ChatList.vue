<template>
    <v-navigation-drawer :width="180">
        <v-list-item>
            <v-btn @click="handleCreate">添加</v-btn>
        </v-list-item>
        <v-divider />
        <v-list @click:select="handleSelect">
            <template v-for="nav in navList" :key="nav.value">
                <v-list-item :title="nav.title || 'New Chat'" :value="nav.uid"></v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getChatList } from '@/api/chat'
import { useRouter } from 'vue-router';

const router = useRouter()

const navList = ref<any[]>([])

const chatListInit = async () => {
    const {code, data} = await getChatList()
    if(code !== 0) return
    navList.value = data
}

const handleSelect = (e: any) => {
    console.log('select---', e)
    router.push({ name: "Chat", params: { id: e.id } }) 
}

const handleCreate = () => {
    console.log('新增')
    router.push({ name: "Chat", params: { id: 'create' } })
}

onMounted(() => {
    chatListInit()
})
</script>