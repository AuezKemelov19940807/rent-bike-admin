<script setup lang="ts">
import Error from '~/error.vue';
const config = useRuntimeConfig();
import type { IBrandProps } from '~/utils/types/brand';
const router = useRouter();

const { data: brands, error, pending } = await useFetch<IBrandProps[]>("/bikes/catalog", {
    baseURL: config.public.apiBase,
});
const route = useRoute()
const bikeId = route.params.id as string;
const { setBrand } = useBikeSelection(bikeId);


const selectBrand = (brand: IBrandProps) => {
    setBrand(brand.name);

}



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

        <div v-else-if="brands">
            <h2 class="text-2xl text-center font-semibold mb-2">Марка</h2>
            <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                <NuxtLinkLocale
                    class="flex items-center justify-between cursor-pointer border-b md:border-none last:border-none pb-2 border-[#CACACA]"
                    v-for="brand in brands" :key="brand.id"
                    :to="`/bikes/${bikeId}/select-brand/models-${brand.name.toLowerCase()}`"
                    @click="selectBrand(brand)">
                    <div>
                        {{ brand.name }}
                    </div>
                    <div class="w-6 h-6 flex items-center justify-center">
                        <span
                            class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0 transition-transform duration-300 ease-in-out">
                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow" class="w-full h-full object-contain" />
                        </span>
                    </div>
                </NuxtLinkLocale>
            </div>

        </div>
        <div v-else>
            No brands available.
        </div>
    </div>

</template>

<style scoped lang="css">
@media(min-width:768px) {
    .companies-grid {
        position: relative;
    }


    .companies-grid::before,
    .companies-grid::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #d1d5db;
        /* Tailwind gray-300 */
    }

    .companies-grid::before {
        left: calc(100% / 3 - 4px);

    }

    .companies-grid::after {
        left: calc(100% / 3 * 2 + 4px);

    }
}
</style>