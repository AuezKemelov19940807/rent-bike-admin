<script setup lang="ts">
const props = defineProps<{
    showPassword: boolean
    toggleShowPassword: () => void
}>()

</script>

<template>
    <button type="button" class="cursor-pointer absolute top-1/2 -translate-y-1/2 right-5 h-full"
        @click="toggleShowPassword">
        <span v-if="!showPassword">
            <img src="~/assets/img/visibility_off.svg" alt="Visibility Off Icon">
        </span>
        <span v-else>
            <img src="~/assets/img/visibility.svg" alt="Visibility Icon">
        </span>
    </button>
</template>

<style scoped lang="css"></style>