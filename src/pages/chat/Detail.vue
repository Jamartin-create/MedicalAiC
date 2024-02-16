<template>
    <div class="chat-page-container">

        <template v-for="(chat) in chatList">
            <div class="d-flex">
                <div>{{ chat.role === 'assistant' ? '助手' : '你' }}：</div>
                <div class="ms-2">{{ chat.content }}</div>
            </div>
        </template>

        <v-text-field v-model="inputText" />
        <v-btn @click="handleSubmit">提交</v-btn>
    </div>
</template>

<script setup lang="ts">
import { getNewChat, createChat, keepOnChat } from '@/api/chat'
import { notify } from '@/components/Notification';
import { ref, onMounted } from 'vue';

const chatInfo = ref<any>(null)

const chatList = ref<any[]>([])

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

const handleSubmit = async () => {
    console.log(inputText.value)

    
    chatList.value.push({ role: 'user', content: inputText.value })
    chatList.value.push({ role: 'assistant', content: '' })

    keepOnChat(
        { content: inputText.value, uid: chatInfo.value.uid },
        (chunk: string) => {
            chatList.value[chatList.value.length - 1].content += chunk
        }
    )

}


onMounted(() => {
    newChatInit()
})

</script>

<style scoped>

</style>