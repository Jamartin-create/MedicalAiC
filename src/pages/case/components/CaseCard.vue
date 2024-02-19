<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <p class="text-h4 text--primary">{{ item.summary }}</p>
      <p>{{ item.mdHistory }}</p>
      <div class="text--primary">
        {{ item.medical }}
      </div>
      <div class="text--primary">
        {{ item.createdAt }} <br />
        {{ item.status }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="teal-accent-4" @click="toDetail">
        查看分析结果
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

type CompoProps = {
  item: any;
};
const props = defineProps<CompoProps>();

const toDetail = () => {
  router.push({ name: "CaseDetail", query: { id: props.item.uid } });
};
</script>

<style scoped></style>
