<script setup lang="ts">
const props = defineProps<{
    activeSection: string;
}>()


</script>

<template>
    <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0" @click="activeSection = 'main'">
        <div class="md:flex hidden items-center cursor-pointer gap-x-2 absolute left-6" @click="activeSection = 'main'">
            <span>
                <img class="rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Back Icon">
            </span>
            <span class="text-sm">
                Назад
            </span>
        </div>
        <h2 class="text-2xl text-center font-semibold mb-2">Марка</h2>

        <span class="md:hidden">
            <img src="~/assets/img/close.svg" alt="Close Icon">
        </span>
    </div>
</template>

<style scoped lang="css"></style>