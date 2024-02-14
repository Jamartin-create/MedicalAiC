<template>
    <div class="auth-container">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>

</style>