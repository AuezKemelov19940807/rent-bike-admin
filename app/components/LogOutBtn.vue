<script setup lang="ts">
import loginIcon from "@/assets/img/login.svg";
const { logOut } = useAuth()
</script>

<template>
    <button
        class="border border-black px-4 cursor-pointer py-3 gap-x-1 rounded-full flex items-center justify-between w-full"
        @click="logOut">
        <span class="uppercase lg:text-lg font-semibold">
            Выйти
        </span>
        <span>
            <img :src="loginIcon" alt="Login Icon">
        </span>
    </button>
</template>

<style scoped lang="css"></style>