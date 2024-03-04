<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <v-sheet class="form-layout-wrp bg-transparent ml-4 mr-2 mb-4">
            <CaseCreateForm @analize="handleGenAnalize" />
        </v-sheet>
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <CaseAnalize :caseid="caseid" />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import CaseAnalize from './components/CaseAnalize.vue'
import CaseCreateForm from './components/CaseCreateForm.vue'
import { ref } from 'vue'

const caseid = ref<string>('')

const handleGenAnalize = (uid: string) => {
    caseid.value = uid
}
</script>

<style scoped lang="scss">
$createFormWidth: 400px;
.form-layout-wrp {
    width: $createFormWidth;
    min-width: $createFormWidth;
}

.home-layout-container {
    height: calc(100vh - 110px);
}
</style>
