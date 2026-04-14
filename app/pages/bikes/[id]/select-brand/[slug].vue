<script setup lang="ts">
import type { IBrandProps } from '~/utils/types/brand';
const config = useRuntimeConfig();
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
const brandName = slug ? slug.split('-').slice(1).join('-') : undefined;

const bikeId = route.params.id as string;




const { data: brands, error, pending } = await useFetch<IBrandProps[]>("/bikes/catalog", {
    baseURL: config.public.apiBase,
});
const brand = computed(() =>
    brands.value?.find((b: IBrandProps) => b.name.toLowerCase() === brandName)
);



// Bike Selection state
const { selectedBrand, selectedModel, setModel } = useBikeSelection(bikeId);

// Выбор модели
const chooseModel = (modelName: string) => {
    setModel(modelName);
};






</script>

<template>
    <BtnBack />

    <div class="flex flex-col h-full w-full ">
        <div v-if="pending">
            <Loader />
        </div>

        <div v-else-if="error">
            <Error :error="error" />
        </div>

        <div class="relative" v-else-if="brand">
            <h2 class="text-2xl text-center font-semibold mb-2">Модели {{ brand.name }} </h2>

            <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                <div v-for="model in brand.models" :key="model.id" @click="chooseModel(model.name)"
                    class="cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-2">

                            <span class="text-base">{{ model.name }}</span>
                        </div>

                        <span
                            class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                            :class="selectedModel === model.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                            <img v-if="selectedModel === model.name" src="~/assets/img/check.svg" alt="Check Icon"
                                class="">
                        </span>
                    </div>
                </div>
            </div>

            <div
                class="md:relative flex items-center justify-center sticky  bottom-4 left-0 w-full px-4 md:px-0 md:w-auto mt-10 z-50">
                <NuxtLinkLocale :to="`/bikes/${bikeId}`"
                    class="border bg-white w-full md:max-w-89.5 group flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black py-3 px-32 rounded-full">
                    <span class="font-semibold group-hover:text-white transition-all duration-300 tex-lg">Готово</span>
                </NuxtLinkLocale>
            </div>
        </div>

        <div v-else>
            No models available.
        </div>
    </div>


</template>

<style scoped lang="css"></style>