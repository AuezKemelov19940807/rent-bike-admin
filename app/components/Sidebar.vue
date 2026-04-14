<script setup lang="ts">


</script>

<template>
    <div class="w-full flex flex-col h-full">
        <ul class="w-full flex flex-col gap-y-6">
            <MenuItem v-for="(menuItem, index) in menu" :key="menuItem.id" :menu-item="menuItem" :index="index" />
        </ul>
        <div class="flex-1"></div>
        <LogOutBtn />
    </div>
</template>

<style scoped lang="css"></style>