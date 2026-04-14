<script setup lang="ts">
import type { ITypeProps } from '~/utils/types/type';
const config = useRuntimeConfig();
const route = useRoute()
const bikeId = route.params.id as string;
const { data: types, error: typeError } = await useFetch<ITypeProps[]>("/bikes/types", {
    baseURL: config.public.apiBase,
});

const { selectedType, setType } = useBikeSelection(bikeId);


const chooseType = (typeName: string) => {
    setType(typeName);
};

</script>

<template>
    <BackBtn path="/bikes" class="mb-10" />
    <div class="flex-1 flex flex-col">
        <div class="flex-1">
            <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0">
                <div class="md:flex hidden items-center cursor-pointer gap-x-2 absolute left-6">
                    <span>
                        <img class="rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Back Icon">
                    </span>
                    <span class="text-sm">
                        Назад
                    </span>
                </div>
                <h2 class="text-2xl text-center font-semibold mb-2">Тип байка</h2>

                <span class="md:hidden">
                    <img src="~/assets/img/close.svg" alt="Close Icon">
                </span>
            </div>
            <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                <div v-for="type in types" :key="type.id">
                    <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                        @click="chooseType(type.name)">
                        <span class="text-lg"> {{ type.name }} </span>
                        <span
                            class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                            :class="selectedType === type.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                            <img v-if="selectedType === type.name" src="~/assets/img/check.svg" alt="Check Icon"
                                class="">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="md:relative flex items-center justify-center sticky  bottom-4 left-0 w-full px-4 md:px-0 md:w-auto mt-10 z-50">
            <NuxtLinkLocale :to="`/bikes/${bikeId}`"
                class="border bg-white w-full md:max-w-89.5 group cursor-pointer transition-all duration-300 hover:bg-black py-3 px-32 rounded-full">
                <span class="font-semibold group-hover:text-white transition-all duration-300 tex-lg">
                    Готово
                </span>
            </NuxtLinkLocale>
        </div>

    </div>
</template>

<style scoped lang="css"></style>