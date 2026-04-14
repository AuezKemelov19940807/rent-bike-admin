<script setup lang="ts">
const props = defineProps<{
    handleFileChange: (event: Event) => any
    fileName: string | null
    profileLogo: string
    preview: string | null
}>()

const displayName = computed(() => props.fileName || 'Выберите файл')

</script>

<template>
    <div class="flex flex-col gap-y-2 max-w-65 mb-6 w-full relative">
        <h4 class="text-lg font-semibold">Логотип</h4>
        <input id="logoUpload" ref="fileInput" class="hidden" type="file" accept="image/*" @change="handleFileChange" />
        <label for="logoUpload"
            class="border border-gray-300 py-2.5 px-4 rounded-lg cursor-pointer flex items-center justify-between overflow-hidden">
            <span class="text-gray-700 truncate flex-1">{{ displayName }}</span>
        </label>
        <div class="flex items-center justify-center mt-2">
            <img class="max-w-65 max-h-65 rounded" :src="preview || profileLogo" alt="Profile Logo" />
        </div>
    </div>
</template>

<style scoped lang="css"></style>