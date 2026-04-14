<script setup lang="ts">

const props = defineProps<{
    bikeId: string
    selectedBrand: string | null
}>()


const { selectedBrand } = useBikeSelection();



</script>

<template>
    <NuxtLinkLocale :to="`/bikes/${bikeId}/select-brand`" class="flex items-center h-12 justify-between relative after:w-full md:after:w-0.5 after:h-0.5
                after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
        <span class="text-lg" v-if="selectedBrand">
            {{ selectedBrand }}
        </span>
        <span class="text-lg" v-else>
            Марка, модель
        </span>
        <span>
            <img class="-rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Arrow" />
        </span>
    </NuxtLinkLocale>
</template>

<style scoped lang="css"></style>