<template>
  <div>
    <v-btn @click="goBack">返回</v-btn>
    <div>{{ detail.curSituation }}</div>
    <div>{{ detail.summary }}</div>
    <div>{{ detail.mdHistory }}</div>
    <div>{{ detail.medical }}</div>
    <div>{{ detail.status }}</div>
    <div>{{ detail.createdAt }}</div>
    <div>{{ detail.analizeDetail }}</div>
  </div>
</template>

<script setup lang="ts">
import { getCaseDetail } from "@/api/case";
import { notify } from "@/components/Notification";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const detail = ref<any>({});

const loadData = async () => {
  if (!route.query.id) return notify("参数错误");
  const { code, data } = await getCaseDetail({ uid: route.query.id as string });
  if (code !== 0) return;
  detail.value = data;
};

const goBack = () => {
  router.push({ name: "CaseList" })
}

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
