<script setup lang="ts">
const props = defineProps<{
    bikeId: string
}>()

const { selectedType } = useBikeSelection();

</script>

<template>
    <NuxtLinkLocale :to="`/bikes/${bikeId}/select-type`" class="flex items-center h-12 justify-between relative">
        <span>
            {{ selectedType || "Тип байка" }}
        </span>
        <span>
            <img class="-rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Arrow" />
        </span>
    </NuxtLinkLocale>
</template>

<style scoped lang="css"></style>