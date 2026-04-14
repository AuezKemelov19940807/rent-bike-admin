<script setup lang="ts">
const props = defineProps<{
    loading: boolean
    mode: 'login' | 'register',
}>()

</script>

<template>
    <button type="submit"
        class="border w-full rounded-lg flex items-center justify-center cursor-pointer px-4 py-3 bg-black transition-all duration-300">
        <span v-if="loading" class="animate-spin">
            <img src="~/assets/img/progress.svg" alt="Progress Icon">
        </span>
        <span v-else class="text-lg font-semibold text-white">
            {{ mode === 'register' ? 'Register' : 'Login' }}
        </span>
    </button>
</template>

<style scoped lang="css"></style>