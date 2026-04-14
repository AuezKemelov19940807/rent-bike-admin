<script setup lang="ts">
const props = defineProps<{
    title: string
}>()

</script>

<template>
    <label class="flex flex-col gap-y-1">
        <span class="font-semibold">Email</span>
        <slot />
    </label>
</template>

<style scoped lang="css"></style>