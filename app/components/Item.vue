<script setup lang="ts">
const props = defineProps<{
    image: string;
    model: string;
    icon: string;
    status: string;
    openIsAdding: () => any
}>()


const statusColor = computed(() => {
    switch (props.status) {
        case 'Занят':
            return 'bg-[#FF383C]'
        case 'Обслуживание':
            return 'bg-[#B9B9B9]'
        default:
            return 'bg-[#94FFAF]' // Свободен
    }
})

const tempDelete = () => {
    const isConfirmed = confirm(`Вы действительно хотите удалить ${props.model}?`)

    if (isConfirmed) {
        // тут будет реальное удаление
        console.log('Удаляем:', props.model)
    }
}

</script>

<template>
    <div class="overflow-hidden relative   transition-shadow duration-1000">
        <button
            class="w-10 h-10 rounded-full bg-white  flex items-center justify-center cursor-pointer z-10 absolute right-2 top-2"
            @click="tempDelete">
            <img class="w-6 h-6" src="~/assets/img/delete.svg" alt="Delete Icon">
        </button>
        <span class="bg-white z-10 absolute flex items-center gap-x-2 px-2 py-1 rounded-full top-2 left-2">
            <span class="text-sm">
                {{ status }}
            </span>
            <span class="w-2.5 h-2.5 rounded-full block" :class="statusColor" />
        </span>
        <p class="absolute -left-0.5 z-20 bg-white text-black px-2 py-2 font-semibold -bottom-0.5 rounded-tr-lg">
            {{ model }}
        </p>
        <div>
            <img class="object-cover rounded-lg w-full transition-all duration-1000 h-full " :src="image"
                alt="Item Image">
        </div>
        <div class="absolute right-2 bottom-2 flex items-center gap-x-2 ">

            <button class="w-10 h-10 rounded-full bg-white  flex items-center justify-center cursor-pointer"
                @click="openIsAdding">
                <img class="w-6 h-6" src="~/assets/img/edit.svg" alt="Delete Icon">
            </button>
        </div>
    </div>
</template>

<style scoped lang="css"></style>