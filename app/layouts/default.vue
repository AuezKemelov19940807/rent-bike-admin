<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <div class="h-full flex flex-col">
        <Header />
        <main class="flex-1">
            <div class="container mx-auto px-4 lg:px-5 h-full">
                <div class="flex h-full">
                    <div
                        class="basis-1/3 hidden  lg:flex border-r border-gray-300 h-full pr-2 lg:px-6 pb-6 pt-6 flex-col">
                        <ul class="flex w-full flex-col items-center gap-y-6 flex-1">
                            <NuxtLink v-for="(menuItem, index) in menu" :key="menuItem.id" :to="menuItem.link"
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
                                    <img :src="$localePath(route.path) === menuItem.link ? menuItem.iconWhite : menuItem.icon"
                                        alt="Menu Icon">
                                </span>
                            </NuxtLink>
                        </ul>
                    </div>
                    <div class="lg:basis-2/3 w-full pt-6 lg:pl-10 pb-6">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<style scoped lang="css"></style>