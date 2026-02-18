<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const { locale, locales, setLocale } = useI18n()
const langDropdown = ref<boolean>(false);
const langDropdownRef = ref<HTMLElement | null>(null)
const toggleLangDropdown = () => {
    langDropdown.value = !langDropdown.value;
};


onClickOutside(langDropdownRef, () => {
    langDropdown.value = false
})

</script>

<template>
    <div class="relative">
        <div class="flex items-center cursor-pointer select-none" @click="toggleLangDropdown" ref="langDropdownRef">
            <span class="uppercase text-lg"> {{ locale }} </span>
            <span class="w-6 h-6 flex items-center justify-center transition-all duration-300"
                :class="langDropdown ? 'rotate-180' : ''">
                <img src="~/assets/img/arrow-bottom.svg" alt="Arrow Bottom">
            </span>
        </div>
        <Transition>
            <div class="absolute -left-3.5 mt-6 px-4 py-2 bg-white shadow-card rounded-lg 
        before:absolute
        before:left-1/2 
        before:-translate-x-1/2
        before:-top-2
        before:w-0 
        before:h-0
        before:border-l-8 
        before:border-l-transparent
        before:border-r-8 
        before:border-r-transparent
        before:border-b-8 
        before:border-b-white
        " v-if="langDropdown">
                <ul class="flex flex-col gap-y-2">
                    <li class="cursor-pointer" v-for="localeItem in locales" :key="localeItem.code">
                        <span class="uppercase select-none text-lg"
                            :class="{ 'text-[#0A1C3A99] opacity-60 ': localeItem.code !== locale }"
                            @click="setLocale(localeItem.code)">
                            {{ localeItem.code }}
                        </span>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>