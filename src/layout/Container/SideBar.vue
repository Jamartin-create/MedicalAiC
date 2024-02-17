<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        :width="180"
        :rail-width="65"
        @click="rail = false"
    >
        <v-list density="compact" nav @click:select="handleSelect">
            <template v-for="nav in navList" :key="nav.value">
                <v-list-item :prepend-icon="nav.preIcon" :title="nav.title" :value="nav.value"></v-list-item>
            </template>
        </v-list>
        <template #append>
            <v-list-item title="Logout" nav>
                <template v-slot:append>
                    <v-btn
                        variant="text"
                        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { navList } from '../config';
import { useRouter } from 'vue-router';

const router = useRouter()

const drawer = ref<boolean>(true)
const rail = ref<boolean>(true)

const handleSelect = (a: any) => {
    router.push({ path: a.id })
}

</script>

<style scoped>

</style>