<template>
    <v-layout class="home-layout-container w-100 h-100 d-flex">
        <v-sheet class="layout-left bg-transparent d-flex flex-column">
            <v-sheet class="preset-bg-light flex-1-1 mx-2 my-2">
                Todo Check
            </v-sheet>
            <v-sheet class="preset-bg-light flex-1-1 mx-2 my-2">
                Analize
            </v-sheet>
        </v-sheet>
        <v-sheet class="layout-center preset-bg-light mx-2 my-2">
            News & Chat
        </v-sheet>
        <v-sheet class="layout-right preset-bg-light mx-2 my-2">
            PlanList
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$left-panel: 300px;
$right-panel: 300px;

.home-layout-container {
    .layout-left {
        width: $left-panel;
    }

    .layout-center {
        flex: 1;
    }

    .layout-right {
        width: $right-panel;
    }
}
</style>
