<script setup lang="ts">
const props = defineProps<{
    id: number,
    image: string;
    brand: string
    model: string;
    status: string;
    deleteMotoWithID: (id: number) => any

}>()


const statusColor = computed(() => {
    switch (props.status) {
        case 'rented':
            return 'bg-[#FF383C]'
        case 'maintenance':
            return 'bg-[#B9B9B9]'
        default:
            return 'bg-[#94FFAF]' // Свободен
    }
})

</script>

<template>
    <div class="overflow-hidden relative h-full pb-[80%]   transition-shadow duration-1000">
        <button
            class="w-10 h-10 rounded-full bg-white  flex items-center justify-center cursor-pointer z-10 absolute right-2 top-2"
            @click="deleteMotoWithID(id)">
            <img class="w-6 h-6" src="~/assets/img/delete.svg" alt="Delete Icon">
        </button>
        <span class="bg-white z-10 absolute flex items-center gap-x-2 px-2 py-1 rounded-full top-2 left-2">
            <span class="text-sm">
                {{ $t(status) }}
            </span>
            <span class="w-2.5 h-2.5 rounded-full block" :class="statusColor" />
        </span>
        <p
            class="absolute -left-0.5 z-20 bg-white text-black px-2 max-w-60 py-2 font-semibold -bottom-0.5 rounded-tr-lg">
            <span>
                {{ brand }}
            </span>
            {{ model }}
        </p>
        <div class="w-full absolute left-0 top-0 h-full">
            <img class="object-cover rounded-lg w-full  transition-all duration-1000 h-full " :src="image"
                alt="Item Image">
        </div>
        <div class="absolute right-2 bottom-2 flex items-center gap-x-2 ">

            <NuxtLinkLocale class="w-10 h-10 rounded-full bg-white  flex items-center justify-center cursor-pointer"
                :to="`/bikes/${id}`">
                <img class="w-6 h-6" src="~/assets/img/edit.svg" alt="Delete Icon">
            </NuxtLinkLocale>
        </div>
    </div>
</template>

<style scoped lang="css"></style>