<template>
    <v-sheet class="w-100 px-4 py-4 d-flex align-center justify-space-between">
        <div class="text-h5 text-bold">
            {{ title }}
            <slot name="title" v-if="!title"></slot>
        </div>
        <div>
            <slot name="append"></slot>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
type PropsT = {
    title: string;
}

defineProps<PropsT>()
</script>