<script setup lang="ts">
import type { Bike } from '~/utils/types/bike';


const props = defineProps<{
    currentPage: number;
    perPage: number;
    bikes: Bike[]
    deleteMotoWithID: (id: number) => any
}>()


const paginatedItems = computed(() => {
    const start = (props.currentPage - 1) * props.perPage
    return props.bikes.slice(start, start + props.perPage)
})
</script>

<template>
    <div class="grid sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-y-10 xs:gap-y-6 gap-x-2.5 md:gap-x-5 lg:gap-x-6">
        <Item v-for="item in paginatedItems" :brand="item.brand" :image="item.main_photo" :model="item.model"
            :id="item.id" :status="item.status" :deleteMotoWithID="deleteMotoWithID" />
    </div>
</template>

<style scoped lang="css"></style>