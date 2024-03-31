<template>
    <div class="chat-page-container">
        <div class="chat-page-header py-4">Chat GPT 4.0</div>
        <div class="chat-msg-list-wrp" ref="chatListWrpRef">
            <template v-for="chat in chatList">
                <CustomMessageCard :role="chat.role" :content="chat.content" />
            </template>
            <div class="msg-generate-loading">
                <v-progress-circular
                    v-if="generating"
                    size="20"
                    width="2"
                    indeterminate
                    class="mb-10"
                    color="black"
                />
            </div>
        </div>

        <div class="chat-page-footer">
            <v-textarea
                v-model="inputText"
                placeholder="发消息给小助手~"
                variant="solo-inverted"
                :persistent-hint="false"
                :disabled="generating"
                :rows="1"
                auto-grow
                @keydown.enter="handleSubmit"
            >
                <template v-slot:append-inner>
                    <v-btn
                        :disabled="!inputText"
                        icon="mdi-send-variant"
                        size="small"
                        v-bind:loading="generating"
                        @click="handleSubmit"
                    >
                    </v-btn>
                </template>
            </v-textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getNewChat, createChat, keepOnChat, getChatDetail } from '@/api/chat'
import CustomMessageCard from '@/components/CustomMessageCard.vue'
import { watch, nextTick, ref, onMounted } from 'vue'
import { notify } from '@/components/Notification'
import { Typewriter } from '@/utils/typeingWriter'
import { useScroll } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 滚动的元素，滚动至底部
const chatListWrpRef = ref()
const { y } = useScroll(chatListWrpRef)
const scrollToBottom = () => {
    nextTick(() => {
        y.value = chatListWrpRef.value?.scrollHeight || 0
    })
}

const chatInfo = ref<any>(null)

const chatList = ref<any[]>([])

const generating = ref<boolean>(false)

// 打开新聊天时
const newChatInit = async () => {
    // 先判断是否有历史新对话
    const history = await getNewChat()

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

    const typer = new Typewriter((str: string) => {
        chatList.value[chatList.value.length - 1].content += str || ''
    })

    try {
        typer.start()
        const question = inputText.value
        inputText.value = ''

        chatList.value.push({ role: 'user', content: question })
        chatList.value.push({ role: 'assistant', content: '' })

        await keepOnChat(
            { content: question, uid: chatInfo.value.uid },
            (chunk: string) => {
                typer.add(chunk)
            }
        )
        if (route.params.id === 'create') {
            router.push({ name: 'Chat', params: { id: chatInfo.value.uid } })
        }
    } catch (e) {
        console.log(e)
    } finally {
        typer.done()
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

watch(
    () => route.params.id,
    n => {
        if (n === 'create') {
            chatInfo.value = null
            chatList.value = []
            inputText.value = ''
            newChatInit()
            return
        }
        if (chatInfo.value && n === chatInfo.value.uid) return
        n && getDetail(n as string)
    },
    { immediate: true }
)

watch(
    () => chatList.value,
    () => nextTick(() => scrollToBottom()),
    { deep: true }
)

onMounted(() => {
    newChatInit()
})
</script>

<style scoped lang="scss">
.chat-page-container {
    display: flex;
    flex-direction: column;
    height: calc(100%);

    width: 100%;
    max-width: 800px;

    .chat-msg-list-wrp {
        flex: 1;
        overflow-y: scroll;

        .msg-generate-loading {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
