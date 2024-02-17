<template>
    <div class="chat-page-container">

        <template v-for="(chat) in chatList">
            <div class="d-flex">
                <div>{{ chat.role === 'assistant' ? '助手' : '你' }}：</div>
                <div class="ms-2">{{ chat.content }}</div>
            </div>
        </template>

        <v-text-field v-model="inputText" />
        <v-btn v-bind:loading="generating" @click="handleSubmit">提交</v-btn>
    </div>
</template>

<script setup lang="ts">
import { getNewChat, createChat, keepOnChat, getChatDetail } from '@/api/chat'
import { notify } from '@/components/Notification';
import { watch } from 'vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const chatInfo = ref<any>(null)

const chatList = ref<any[]>([])

const generating = ref<boolean>(false)


// 打开新聊天时
const newChatInit = async () => {

    // 先判断是否有历史新对话
    const history = await getNewChat()

    console.log(history)

    if (history.code !== 0) return
    if (history.data) {
        chatList.value = JSON.parse(history.data.chatDetail)
        chatInfo.value = history.data
        return
    }

    const ret = await createChat()
    if (ret.code !== 0) return
    if (!ret.data) notify('对话生成失败，请检查网络～')
    chatList.value = JSON.parse(ret.data.chatDetail)
    chatInfo.value = ret.data
}

const inputText = ref<string>('')

// 提交聊天
const handleSubmit = async () => {

    generating.value = true

    try {
        const question = inputText.value
        inputText.value = ''
        
        chatList.value.push({ role: 'user', content: question })
        chatList.value.push({ role: 'assistant', content: '' })

        await keepOnChat(
            { content: question, uid: chatInfo.value.uid },
            (chunk: string) => {
                chatList.value[chatList.value.length - 1].content += chunk
            }
        )
    } catch (e) {
        console.log(e)
    } finally {
        generating.value = false
    }
}

// 获取详情
const getDetail = async (uid: string) => {
    const { code, data } = await getChatDetail({ uid })

    if (code != 0) return
    chatInfo.value = data
    chatList.value = data.chatDetail
}

const route = useRoute()

watch(() => route.params.id, (n) => {
    console.log('---', n)
    if (n === 'create') {
        chatInfo.value = null
        chatList.value = []
        inputText.value = ''
        newChatInit()
        return
    } 
    n && getDetail(n as string)
}, { immediate: true })

onMounted(() => {
    newChatInit()
})

</script>