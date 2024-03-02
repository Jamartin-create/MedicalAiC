<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <v-sheet class="form-layout-wrp bg-transparent ml-4 mr-2 mb-4">
            <PlanCreateForm @analize="handleGenOverwrite" />
        </v-sheet>
        <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
            <PlanCreateOvAnaPanel :planid="planid" />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import PlanCreateForm from './components/PlanCreateForm.vue';
import PlanCreateOvAnaPanel from './components/PlanCreateOvAnaPanel.vue';
import { ref } from 'vue';

const planid = ref<string>('')

const handleGenOverwrite = (uid: string) => {
    planid.value = uid
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