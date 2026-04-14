<script setup lang="ts">
const route = useRoute()
const props = defineProps<{
    index: number
    menuItem: MenuItem
}>()

</script>

<template>
    <NuxtLinkLocale :to="menuItem.link"
        class="border border-black px-4  transition-all duration-300 cursor-pointer py-3 gap-x-1 rounded-full flex items-center justify-between w-full"
        :class="[
            $localePath(route.path) === menuItem.link
                ? 'bg-black text-white border-black'
                : 'border-black text-black ',
            { 'mt-auto': index === menu.length - 1 }
        ]">
        <span class="uppercase lg:text-lg font-semibold">
            {{ menuItem.name }}
        </span>
        <span>
            <img :src="$localePath(route.path) === menuItem.link ? menuItem.iconWhite : menuItem.icon" alt="Menu Icon">
        </span>
    </NuxtLinkLocale>
</template>

<style scoped lang="css"></style>