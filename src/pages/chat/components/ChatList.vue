<template>
    <v-sheet
        rounded="lg"
        class="chat-list-wrp preset-bg-light px-4 py-4 h-100 d-flex flex-column"
    >
        <v-sheet class="w-100 d-flex justify-center">
            <v-btn append-icon="mdi-plus" @click="handleCreate">
                创建新对话
                <template v-slot:prepend>
                    <v-img :height="25" :width="25" :src="DefaultAiAvatar" />
                </template>
            </v-btn>
        </v-sheet>
        <v-virtual-scroll :items="navList" class="flex-1-1 w-100 mt-2">
            <template v-slot:default="{ item }">
                <v-tooltip :text="item.title" :open-delay="200">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            class="preset-bg-gray w-100 my-2"
                            @click="handleSelect(item.uid)"
                        >
                            <div class="chat-name">
                                {{ item.title || 'New Chat' }}
                            </div>
                        </v-btn>
                    </template>
                </v-tooltip>
            </template>
        </v-virtual-scroll>
    </v-sheet>
</template>

<script setup lang="ts">
import DefaultAiAvatar from '@/assets/images/default-robots-avatar.svg'
import { ref, onMounted, watch } from 'vue'
import { getChatList } from '@/api/chat'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navList = ref<any[]>([])

const chatListInit = async () => {
    const { code, data } = await getChatList()
    if (code !== 0) return
    navList.value = data
}

const handleSelect = (uid: any) => {
    router.push({ name: 'Chat', params: { id: uid } })
}

const handleCreate = () => {
    router.push({ name: 'Chat', params: { id: 'create' } })
}

onMounted(() => {
    chatListInit()
})

watch(
    () => route.params.id,
    n => {
        console.log(navList.value.findIndex(item => item.uid === n))
        if (navList.value.findIndex(item => item.uid === n) === -1) {
            console.log('查一下')
            setTimeout(() => {
                chatListInit()
            }, 1000)
        }
    }
)
</script>

<style scoped lang="scss">
.chat-list-wrp {
    width: 240px;

    .chat-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 180px !important;
    }
}
</style>
