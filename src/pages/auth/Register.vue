<template>
    <div class="register-page d-flex justify-center">
        <v-card class="w-50 pa-6">
            <RegisterForm />
        </v-card>
    </div>
</template>

<script setup lang="ts">
import RegisterForm from './components/RegisterForm.vue';


</script>

<style scoped>
.register-page {
    width: 600px;
}
</style>