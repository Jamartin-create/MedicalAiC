<template>
    <v-layout class="home-layout-container w-100 d-flex">
        <v-sheet class="layout-left bg-transparent d-flex flex-column">
            <v-sheet class="bg-transparent flex-1-1 ml-4 mr-2 mb-4">
                <LeftPanelTodo />
            </v-sheet>
            <v-sheet class="bg-transparent flex-1-1 ml-4 mr-2 mb-4">
                <LeftPanelAnalize />
            </v-sheet>
        </v-sheet>
        <v-sheet class="layout-center bg-transparent mx-2 mb-4">
            <CenterPanelNews />
        </v-sheet>
        <v-sheet class="layout-right bg-transparent ml-2 mr-4 mb-4">
            <RightPanelPlanList />
        </v-sheet>
    </v-layout>
</template>

<script setup lang="ts">
import LeftPanelTodo from './components/LeftPanelTodo.vue'
import CenterPanelNews from './components/CenterPanelNews.vue'
import LeftPanelAnalize from './components/LeftPanelAnalize.vue'
import RightPanelPlanList from './components/RightPanelPlanList.vue'
</script>

<style scoped lang="scss">
$left-panel: 300px;
$right-panel: 300px;

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
