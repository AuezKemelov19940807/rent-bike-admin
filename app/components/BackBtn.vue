<script setup lang="ts">


const props = defineProps<{
    path: string
}>()

</script>

<template>
    <NuxtLinkLocale :to="path"
        class="border  max-w-32.5 rounded-full flex px-4 py-3.5 items-center w-full justify-between cursor-pointer">
        <span>
            <img src="~/assets/img/arrow-back.svg" alt="Add Icon">
        </span>
        <span>
            Назад
        </span>
    </NuxtLinkLocale>
</template>

<style scoped lang="css"></style>