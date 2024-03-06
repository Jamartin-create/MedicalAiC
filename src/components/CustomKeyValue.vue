<template>
    <!-- 用于展示键值对 -->
    <v-sheet class="k-v-wrp bg-transparent w-100 d-flex">
        <v-sheet
            class="k-v-label"
            :style="{
                width: labelWidthCompu,
                minWidth: labelWidthCompu
            }"
        >
            {{ label }}
        </v-sheet>
        <v-sheet class="k-v-value flex-1-1">
            <slot />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    label: string
    labelWidth?: string | number
}>()

// 默认宽度 100px
const labelWidthCompu = computed(() => {
    const widthType = typeof props.labelWidth
    if (widthType === 'string') return props.labelWidth
    if (widthType === 'number') return props.labelWidth + 'px'
    else return '80px'
})
</script>

<style scoped lang="scss">
.k-v-wrp {
    line-height: 30px;

    .k-v-label {
        font-size: 14px;
        color: var(--preset-text-color);
    }

    .k-v-value {
        font-size: 16px;
    }
}
</style>
