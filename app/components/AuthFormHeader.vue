<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
    <div class="flex flex-col items-center mb-10">
        <AuthFormLogo />
        <h1 class="text-2xl text-center font-semibold">{{ title }}</h1>
    </div>
</template>

<style scoped lang="css"></style>