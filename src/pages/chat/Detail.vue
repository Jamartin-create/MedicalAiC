<template>
    <div class="page-wrp">
        <ChatList />
        <div class="d-flex justify-center h-100 px-4 py-2">
            <v-sheet
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
    height: calc(100vh - var(--v-layout-top));
    overflow-y: scroll;
    .page-main {
        display: flex;
        justify-content: center;
        height: 100%;
    }
}
</style>
