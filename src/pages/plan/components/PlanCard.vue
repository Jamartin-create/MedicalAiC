<template>
    <v-card class="mx-auto" max-width="344">
        <v-card-text>
            <p class="text-h4 text--primary">{{ item.target }}</p>
            <p>{{ item.cycle }}</p>
            <div class="text--primary">
                {{ item.startAt }}
            </div>
            <div class="text--primary">
                {{ item.createdAt }} <br />
                0=病例，1=养生，2=康复 <br />
                {{ item.type }} <br />
                {{ item.status }} <br />
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn variant="text" color="teal-accent-4" @click="toDetail">
                查看分析结果
            </v-btn>
            <v-btn variant="text" color="teal-accent-4" @click="toRecord">
                去打卡
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

type CompoProps = {
    item: any
}
const props = defineProps<CompoProps>()

const toDetail = () => {
    router.push({ name: 'PlanDetail', query: { id: props.item.uid } })
}

const toRecord = () => {
    router.push({ name: 'RecordCreate', query: { planid: props.item.uid } })
}
</script>

<style scoped></style>
