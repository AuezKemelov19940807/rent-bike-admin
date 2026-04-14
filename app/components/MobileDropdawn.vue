<script setup lang="ts">

const { locale, locales, setLocale } = useI18n()

const props = defineProps<{
    burgerMenu: boolean
    closeBurgerMenu: () => any

}>()




</script>

<template>
    <Transition>
        <div v-if="burgerMenu" class="absolute bg-white z-20 py-6 px-4 w-full left-0 top-0 flex flex-col lg:hidden">
            <div class="flex flex-col items-center justify-center  gap-y-6 w-full">
                <!-- city -->
                <ul class="flex w-full flex-col mt-8 items-center justify-center gap-y-6">
                    <NuxtLink
                        class="border border-black px-4 py-3 rounded-full flex items-center justify-between w-full"
                        v-for="menuItem in menu" :key="menuItem.id" :to="menuItem.link" @click="closeBurgerMenu">
                        <span class="uppercase text-lg font-semibold">
                            {{ menuItem.name }}
                        </span>
                        <span>
                            <img :src="menuItem.icon" alt="Menu Icon">
                        </span>
                    </NuxtLink>
                    <LogOutBtn />
                </ul>
                <!-- lang -->
                <ul class="flex gap-x-12 px-4 py-2 bg-white shadow-card rounded-lg w-fit">
                    <li v-for="localeItem in locales" :key="localeItem.code"
                        @click="setLocale(localeItem.code); closeBurgerMenu()">
                        <span :class="{ 'text-[#0A1C3A99] opacity-60': localeItem.code !== locale }"
                            class="uppercase text-2xl font-semibold transition-all duration-300">
                            {{ localeItem.code }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="css"></style>