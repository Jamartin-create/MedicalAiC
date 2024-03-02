<template>
  <v-layout class="home-layout-container w-100 d-flex">
    <v-sheet class="list-layout-wrp bg-transparent ml-4 mr-2 mb-4">
      <CaseList @change="handleChange" />
    </v-sheet>
    <v-sheet class="bg-transparent flex-1-1 mr-4 ml-2 mb-4">
      <CaseDetail :caseid="caseid" />
    </v-sheet>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CaseList from './components/CaseList.vue';
import CaseDetail from './components/CaseDetail.vue';

const caseid = ref<string>('')

// 切换 case
const handleChange = (uid: string) => {
  caseid.value = uid
}

</script>

<style scoped lang="scss">
$createFormWidth: 450px;

.list-layout-wrp {
    width: $createFormWidth;
    min-width: $createFormWidth;
}

.home-layout-container {
    height: calc(100vh - 110px);
}
</style>
