<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card
                variant="flat"
                rounded="xl"
                :color="isHovering ? 'primary' : ''"
                class="preset-bg mb-3 cursor-pointer"
                v-bind="props"
                @click="emits('select', item)"
            >
                <v-sheet class="bg-transparent d-flex flex-column">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-text>
                        {{ getValue(item.curSituation) }} -
                        {{ formatTime(item.createdAt, 'yyyy-MM-dd hh:mm') }}
                    </v-card-text>
                </v-sheet>
            </v-card>
        </template>
    </v-hover>
</template>

<script setup lang="ts">
import useDataDir from '@/hooks/useDataDir'
import { formatTime } from '@/utils/tools'

type PropsT = {
    item: any
}
defineProps<PropsT>()

const emits = defineEmits(['select'])

const { getValue } = useDataDir('caseSituation')
</script>
