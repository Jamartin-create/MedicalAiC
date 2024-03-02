<template>
    <v-sheet class="bg-transparent">
        <div class="chat-message">
            <div class="chat-message-avatar">
                <v-avatar size="30">
                    <template v-if="role === 'assistant'">
                        <v-img :src="DefaultAiAvatar" />
                    </template>
                    <template v-else>
                        <v-img
                            :src="
                                pinia.userInfoGetter.avatar ||
                                DefaultAvatar
                            "
                        />
                    </template>
                </v-avatar>
                <div class="chat-message-name">
                    {{ role === 'assistant' ? '小助手' : '你' }}
                </div>
            </div>
            <div class="chat-message-content">
                <template v-if="role === 'assistant'">
                    <CustomMessageContentCard :content="content" />
                </template>
                <template v-else>
                    {{ content }}
                </template>
            </div>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomMessageContentCard from '@/components/CustomMessageContentCard.vue'
import DefaultAiAvatar from '@/assets/images/default-robots-avatar.svg'
import DefaultAvatar from '@/assets/images/default-avatar.svg'
import { MessageT } from '@/api/types'
import { useAuthStore } from '@/store/auth';

const pinia = useAuthStore()


defineProps<MessageT>()

</script>

<style scoped lang="scss">
.chat-message {
    padding-bottom: 30px;
    .chat-message-avatar {
        display: flex;
        gap: 8px;
        align-items: center;

        .chat-message-name {
            font-size: 14px;
            font-weight: bold;
        }
    }

    .chat-message-content {
        padding-left: 38px;
    }
}
</style>