<template>
  <div>
    <div>{{ detail.curSituation }}</div>
    <div>{{ detail.summary }}</div>
    <div>{{ detail.mdHistory }}</div>
    <div>{{ detail.medical }}</div>
    <div>{{ detail.status }}</div>
    <div>{{ detail.createdAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { getCaseDetail } from "@/api/case";
import { notify } from "@/components/Notification";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const detail = ref<any>();

const loadData = async () => {
  if (!route.query.id) return notify("参数错误");
  const { code, data } = await getCaseDetail({ uid: route.query.id as string });
  if (code !== 0) return;
  detail.value = data;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
