<template>
    <div v-if="show" class="overlay">
        <div class="spinner"></div>
        <div class="text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        text: String
    }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(75, 85, 99, 0.5); /* bg-gray-800 bg-opacity-50 */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* gap-2 */
    z-index: 10000; /* z-50 */
}

.spinner {
    border: 8px solid white; /* border-t-4 border-b-4 border-white */
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-radius: 9999px; /* rounded-full */
    width: 40px; /* w-10 */
    height: 40px; /* h-10 */
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.text {
    color: white; /* text-white */
}
</style>
