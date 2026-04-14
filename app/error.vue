<script setup lang="ts">
const props = defineProps<{
    error: any
}>()

</script>

<template>
    <div class="flex items-center gap-y-5 flex-col justify-center w-full h-full">
        <div>
            <img src="~/assets/img/error.webp" alt="Error Image">
        </div>
        <p class="text-3xl font-extrabold">
            Oops!
        </p>
        <p class="text-red-600">
            {{ error }}
        </p>
        <NuxtLinkLocale
            class="border border-black px-4 cursor-pointer py-3 gap-x-1 rounded-full flex items-center justify-between w-fit"
            to="/login">
            Login
        </NuxtLinkLocale>
    </div>
</template>

<style scoped lang="css"></style>