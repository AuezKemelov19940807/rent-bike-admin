<script setup lang="ts">
import type { IBrandProps } from '~/utils/types/brand';
import type { ITypeProps } from '~/utils/types/type';

const isAdding = ref(false)

const openIsAdding = () => {
    isAdding.value = true
}

const config = useRuntimeConfig();
const { data: brands, error } = await useFetch<IBrandProps[]>("/bikes/catalog", {
    baseURL: config.public.apiBase,
});

const { data: types, error: typeError } = await useFetch<ITypeProps[]>("/bikes/types", {
    baseURL: config.public.apiBase,
});


const closeIsAdding = () => {
    isAdding.value = false
}

// pagination
const perPage = 8
const currentPage = ref<number>(1)

// totalPages
const totalPages = computed(() =>
    Math.ceil(items.length / perPage)
)

// change page
const goToPage = (page: number) => {
    currentPage.value = page
}

</script>

<template>
    <!-- <div v-if="!isAdding">

        <div class="flex items-center justify-between relative">
            <button class="border rounded-full flex px-4 py-3.5 max-w-87.5 w-full justify-between cursor-pointer"
                @click="isAdding = true">
                <span>
                    Добавить мотоцикл
                </span>
                <span>
                    <img src="~/assets/img/add.svg" alt="Add Icon">
                </span>
            </button>
            <Filter v-if="brands && types" :brands="brands" :types="types" />
        </div>

        <div class="pt-6">
            <Items :current-page="currentPage" :per-page="perPage" :openIsAdding="openIsAdding" />
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="goToPage" />
        </div>
    </div>

    <div v-else>
        <button
            class="border  max-w-32.5 rounded-full flex px-4 py-3.5 items-center w-full justify-between cursor-pointer"
            @click="closeIsAdding">
            <span>
                <img src="~/assets/img/arrow-back.svg" alt="Add Icon">
            </span>
            <span>
                Назад
            </span>
        </button>
        <div class="pt-6" v-if="brands && types">
            <AddMotorcycleForm :closeIsAdding="closeIsAdding" :brands="brands" :types="types" />
        </div>
    </div> -->
</template>

<style scoped lang="css"></style>