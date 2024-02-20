<template>
  <div class="case-list-wrp d-flex">
    
    <v-btn @click="toCreate">新建病例</v-btn>

    <template v-for="item in list" :key="item.uid">
      <CaseCard :item="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import CaseCard from "./components/CaseCard.vue";
import type { PageParamsT } from '@/api/types'
import { ref, onMounted } from "vue";
import { getCaseList } from "@/api/case";
import { useRouter } from "vue-router";

const router = useRouter()

const list = ref<any[]>([]);

const pageParams = ref<PageParamsT>({
  pageIndex: 0,
  pageSize: 10
})

const loadData = async () => {
  const { code, data } = await getCaseList(pageParams.value);
  if (code !== 0) return;
  list.value = data.list;
};

const toCreate = () => {
  router.push({ name: 'CaseCreate' })
}

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
