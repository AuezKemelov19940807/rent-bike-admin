<script setup lang="ts">
const props = defineProps<{
    edit: () => void
    loading: boolean
}>()


</script>

<template>
    <div class="flex items-center justify-center">
        <button @click="edit" :disabled="loading"
            class="w-[124.7px] flex items-center justify-center mt-10 cursor-pointer font-semibold border border-black bg-black text-white py-2.5 px-4 rounded-lg">
            <span v-if="loading">
                <img class="animate-spin" src="~/assets/img/progress.svg" alt="Progress Icon">
            </span>
            <span v-else>Сохранить</span>
        </button>
    </div>
</template>

<style scoped lang="css"></style>