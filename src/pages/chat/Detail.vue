<template>
    <div class="page-wrp d-flex px-4 pb-4">
        <ChatList />
        <div class="bg-transparent d-flex flex-1-1 justify-center h-100">
            <v-sheet
                rounded="lg"
                class="preset-bg-light rounded w-100 h-100 d-flex justify-center"
            >
                <ChatPage />
            </v-sheet>
        </div>
    </div>
</template>

<script setup lang="ts">
import ChatList from './components/ChatList.vue'
import ChatPage from './components/ChatPage.vue'
</script>

<style scoped lang="scss">
.page-wrp {
    height: calc(100vh - 110px);
    overflow-y: scroll;
    gap: 10px;
    .page-main {
        display: flex;
        justify-content: center;
        height: 100%;
    }
}
</style>
