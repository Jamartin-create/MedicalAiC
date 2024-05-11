<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <v-sheet class="layout-left bg-transparent d-flex flex-column">
            <v-sheet class="bg-transparent h-50 ml-4 mr-2 mb-4">
                <LeftPanelTodo ref="leftPanelTodo" />
            </v-sheet>
            <v-sheet class="bg-transparent h-50 ml-4 mr-2 mb-4">
                <LeftPanelAnalize ref="leftPanelAna" />
            </v-sheet>
        </v-sheet>
        <v-sheet class="layout-center bg-transparent mx-2 mb-4">
            <CenterPanelNews />
        </v-sheet>
        <v-sheet class="layout-right bg-transparent ml-2 mr-4 mb-4">
            <RightPanelPlanList @refresh-left="handleRefresh" />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import LeftPanelTodo from './components/LeftPanelTodo.vue'
import CenterPanelNews from './components/CenterPanelNews.vue'
import LeftPanelAnalize from './components/LeftPanelAnalize.vue'
import RightPanelPlanList from './components/RightPanelPlanList.vue'
import { ref } from 'vue'

const leftPanelTodo = ref<InstanceType<typeof LeftPanelTodo>>()
const leftPanelAna = ref<InstanceType<typeof LeftPanelAnalize>>()

const handleRefresh = () => {
    leftPanelAna.value?.reload()
    leftPanelTodo.value?.reload()
}
</script>

<style scoped lang="scss">
$left-panel: 300px;
$right-panel: 300px;

@media screen and (max-width: 1100px) {
    .layout-left {
        display: none !important;
    }
}

@media screen and (max-width: 800px) {
    .layout-center {
        display: none;
    }

    .layout-right {
        width: 100% !important;
    }
}

.home-layout-container {
    height: calc(100vh - 110px);

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
