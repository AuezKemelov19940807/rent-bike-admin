<script setup lang="ts">
const props = defineProps<{
    modelValue: string | number | null | undefined
    placeholder?: string
    type?: string
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()
</script>

<template>
    <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
        <input :type="type" :placeholder="placeholder" :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="w-full h-full px-4 rounded-l-full outline-none" />
    </div>
</template>

<style scoped lang="css"></style>