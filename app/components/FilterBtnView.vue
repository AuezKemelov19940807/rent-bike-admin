<script setup lang="ts">


const props = defineProps<{
    text: string
}>()

</script>

<template>
    <div class="flex items-center justify-center mt-6">
        <button
            class="border w-full md:max-w-89.5 group cursor-pointer transition-all duration-300 hover:bg-black py-3 px-32 rounded-full">
            <span class="font-semibold group-hover:text-white transition-all duration-300 tex-lg">
                {{ text }}
            </span>
        </button>
    </div>
</template>

<style scoped lang="css"></style>