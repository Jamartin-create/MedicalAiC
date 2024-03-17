<template>
    <v-sheet
        class="bg-transparent h-100 w-100 d-flex flex-column justify-center align-center"
    >
        <img
            style="width: 120px; height: 120px; object-fit: cover"
            src="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
        />
        <div>
            <slot />
        </div>
    </v-sheet>
</template>

<script setup lang="ts"></script>

<style scoped></style>
