<script setup lang="ts">
const props = defineProps<{
    burgerMenu: boolean
    toggleBurgerMenu: () => void
}>()

</script>

<template>
    <div class="pr-4 w-6 h-6 flex items-center justify-center" @click="toggleBurgerMenu" ref="burgerDropdownRef">
        <div :class="{ 'before:top-1/2 before:translate-y-1/2 before:-rotate-45 after:top-1/2 after:translate-y-1/2 after:rotate-45': burgerMenu }"
            class="z-50 before:transition-all before:duration-300 after:transition-all after:duration-300 block lg:hidden relative before:absolute before:w-4.5 before:h-0.5 before:bg-black before:top-0 before:left-0 before:rounded-full after:absolute after:w-4.5 after:h-0.5 after:bg-black after:bottom-0 after:rounded-full after:left-0  h-3">
            <span :class="{ 'opacity-0': burgerMenu }"
                class="absolute  top-1/2 -translate-y-1/2 w-4.5 rounded-full h-0.5 bg-black block transition-all duration-300"></span>
        </div>
    </div>
</template>

<style scoped lang="css"></style>