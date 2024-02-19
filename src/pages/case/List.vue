<template>
  <div class="case-list-wrp d-flex">
    <template v-for="item in list" :key="item.uid">
      <CaseCard :item="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import CaseCard from "./components/CaseCard.vue";
import { ref, onMounted } from "vue";
import { getCaseList } from "@/api/case";

const list = ref<any[]>([]);

const loadData = async () => {
  const { code, data } = await getCaseList();
  if (code !== 0) return;
  list.value = data;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
