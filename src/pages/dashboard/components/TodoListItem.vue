<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props: p2 }">
            <v-list-item
                v-if="!item.isCheck"
                v-bind="p2"
                class="w-100 cursor-pointer d-flex justify-space-between"
                @click="emits('select', item)"
            >
                <v-tooltip :text="item.title" location="top">
                    <template v-slot:activator="{ props }">
                        <v-sheet v-bind="props" class="todo-title">
                            <v-icon class="mdi mdi-circle-small" />
                            {{ item.title }}
                        </v-sheet>
                    </template>
                </v-tooltip>
                <template #append v-bind="p2">
                    <template v-if="isHovering">
                        <v-icon
                            class="mdi mdi-checkbox-intermediate"
                        />
                    </template>
                    <template v-else>
                        <v-icon
                            class="mdi mdi-checkbox-blank-outline"
                        />
                    </template>
                </template>
            </v-list-item>
            <v-list-item class="cursor-pointer" v-else>
                <v-tooltip :text="item.title" location="top">
                    <template v-slot:activator="{ props }">
                        <v-sheet
                            v-bind="props"
                            class="todo-title text-decoration-line-through"
                        >
                            <v-icon class="mdi mdi-circle-small" />
                            {{ item.title }}
                        </v-sheet>
                    </template>
                </v-tooltip>
            </v-list-item>
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

<style scoped>

.todo-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>