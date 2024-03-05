<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card
                variant="flat"
                rounded="xl"
                :color="isHovering ? 'primary' : ''"
                class="preset-bg mb-3 d-flex cursor-pointer justify-space-between"
                v-bind="props"
                @click="emits('select', item)"
            >
                <v-sheet class="bg-transparent d-flex flex-column">
                    <v-card-title>症状关键词占位</v-card-title>
                    <v-card-subtitle>
                        症状关键词列表
                    </v-card-subtitle>
                    <v-card-text>
                        {{ item.status }} - {{ item.createdAt }}
                    </v-card-text>
                </v-sheet>
                <v-sheet class="bg-transparent d-flex align-center">
                    <v-btn
                        class="preset-bg mr-2"
                        size="small"
                        icon="mdi-pencil"
                    />
                    <v-btn
                        class="preset-bg mr-2"
                        size="small"
                        icon="mdi-calendar-blank-multiple"
                    />
                    <v-btn
                        class="bg-red"
                        size="small"
                        icon="mdi-delete"
                    />
                </v-sheet>
            </v-card>
        </template>
    </v-hover>
</template>

<script setup lang="ts">

type PropsT = {
    item: any;
}
defineProps<PropsT>()

const emits = defineEmits(['select'])

</script>