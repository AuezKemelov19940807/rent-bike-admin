<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
// burger menu
const burgerMenu = ref<boolean>(false);

// buger ref 
const burgerDropdownRef = ref<HTMLElement | null>(null);

// toggle burger menu
const toggleBurgerMenu = () => {
    burgerMenu.value = !burgerMenu.value;
};

// On Click Outside
onClickOutside(burgerDropdownRef, () => {
    burgerMenu.value = false
})

const closeBurgerMenu = () => burgerMenu.value = false

</script>

<template>
    <header class="py-2 border-b border-gray">
        <!-- Bg -->
        <Transition name="fade">
            <div class="fixed lg:hidden inset-0 transition-all duration-300 z-10 bg-black/50" v-if="burgerMenu"></div>
        </Transition>

        <div class="container mx-auto px-4 lg:px-5">
            <div class="flex justify-between items-center">
                <logo />
                <!-- burger -->
                <div ref="burgerDropdownRef">
                    <Burger :burger-menu="burgerMenu" :toggle-burger-menu="toggleBurgerMenu" />

                    <MobileDropdawn :burger-menu="burgerMenu" :close-burger-menu="closeBurgerMenu" />
                </div>
                <!-- Lang -->
                <div class="hidden lg:flex gap-x-4">
                    <Lang />
                </div>
            </div>
        </div>
    </header>

</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>