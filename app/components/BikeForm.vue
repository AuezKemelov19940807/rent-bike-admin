<script setup lang="ts">
import type { IBrandProps } from '~/utils/types/brand';
import type { ITypeProps } from '~/utils/types/type';


const props = defineProps<{
    brands: IBrandProps[]
    types: ITypeProps[]
}>()


const company = ref("")





const selectedBrandName = ref<string | null>(null)
const selectedModel = ref<string | null>(null)
const selectedBrand = ref<typeof props.brands[number] | null>(null);
const openedMobileBrandIDs = ref<number[]>([])
type MobileSection = 'company' | 'brand' | 'type' | 'main';
type Section = 'main' | 'company' | 'brand' | 'model' | 'type'
const { width } = useWindowSize()
function toggleMobileSection(section: MobileSection) {
    if (openedMobileSections.value.includes(section)) {
        openedMobileSections.value = openedMobileSections.value.filter(s => s !== section)
    } else {
        openedMobileSections.value.push(section)
    }
}
const activeSection = ref<Section>('main')
function openSectionSmart(section: MobileSection) {
    if (width.value >= 768) {
        activeSection.value = section
    } else {
        toggleMobileSection(section)
    }
}
const openedMobileSections = ref<MobileSection[]>([]);

const toggleBrand = (name: string) => {
    selectedBrandName.value = selectedBrandName.value === name ? null : name
}

function openModelSection(brand: typeof props.brands[number]) {
    if (width.value >= 768) {
        selectedBrand.value = brand
        activeSection.value = 'model'
        return
    }

    const id = brand.id

    if (openedMobileBrandIDs.value.includes(id)) {
        openedMobileBrandIDs.value = openedMobileBrandIDs.value.filter(bid => bid !== id)
    } else {
        openedMobileBrandIDs.value.push(id)
    }
}

function onBrandClick(brand: any) {
    if (width.value >= 768) {
        // desktop — просто выбрать бренд
        toggleBrand(brand.name)
    } else {
        // mobile — открыть модели
        openModelSection(brand)
        selectedBrand.value = brand;
        selectedBrandName.value = brand.name;
    }
}

function toggleModel(model: { name: string, brandName: string }) {
    selectedBrandName.value = model.brandName
    selectedModel.value = selectedModel.value === model.name ? null : model.name
}

</script>

<template>

    <BackBtn class="mb-6" path="/bikes" />
    <div class="grid md:grid-cols-3 items-center gap-y-6 gap-x-6" v-if="activeSection === 'main'">
        <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
            <input type="text" v-model="company" placeholder="Название Компании"
                class="w-full h-full px-4 rounded-l-full outline-none" />
        </div>

        <div class="relative">
            <div
                class="flex pb-4 md:pb-0 md:h-12.5  justify-between items-center relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                <div class="flex w-full items-center justify-between gap-x-4  cursor-pointer"
                    @click="openSectionSmart('brand')">

                    <span class="flex items-center justify-between text-lg w-full md:hidden">
                        <span class="font-semibold">
                            Марка, модель
                        </span>
                        <img src="~/assets/img/arrow-bottom.svg" alt="Arrow" class="transition-transform duration-300"
                            :class="openedMobileSections.includes('brand')
                                ? 'rotate-0'
                                : '-rotate-90'" />
                    </span>

                    <span class="text-lg hidden md:block">
                        <p class="text-sm text-gray-500 md:hidden">Марка, модель</p>

                        <template v-if="selectedBrandName || selectedModel">
                            <span v-if="selectedBrandName">
                                {{ selectedBrandName + ' ' }}
                            </span>

                            <span v-if="selectedBrandName && selectedModel"> </span>

                            <span v-if="selectedModel" class="text-gray-500">
                                {{ selectedModel }}
                            </span>
                        </template>

                        <template v-else>
                            Марка, модель
                        </template>
                    </span>


                    <span v-if="selectedBrandName || selectedModel" class="shrink-0 hidden md:block" @click.stop="
                        selectedBrandName = null;
                    selectedModel = null;
                    ">
                        <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon" />
                    </span>

                    <span class=" md:flex items-center justify-center hidden" v-else @click="openSectionSmart('brand')">
                        <span class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow" class="w-full h-full object-contain" />
                        </span>
                    </span>

                </div>
                <span></span>

            </div>

            <Transition name="collapse">
                <div v-if="openedMobileSections.includes('brand')"
                    class="grid md:grid-cols-3 md:hidden gap-x-8 gap-y-4 companies-grid mt-4">
                    <div v-for="brand in brands" :key="brand.id">
                        <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                            @click="onBrandClick(brand)">
                            <div class="flex items-center gap-x-2">
                                <span
                                    class="w-6 h-6 shrink-0 hidden md:flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                    :class="selectedBrandName === brand.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedBrandName === brand.name" src="~/assets/img/check.svg"
                                        alt="Check Icon" class="">
                                </span>

                                <span class="text-lg">{{ brand.name }}</span>
                            </div>
                            <div class="w-6 h-6 flex items-center justify-center">
                                <span :class="openedMobileBrandIDs.includes(brand.id)
                                    ? 'rotate-0 md:-rotate-90'
                                    : '-rotate-90 md:-rotate-90'"
                                    class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0 transition-transform duration-300 ease-in-out"
                                    @click.stop="openModelSection(brand)">
                                    <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                        class="w-full h-full object-contain" />
                                </span>
                            </div>

                        </div>

                        <Transition name="collapse">
                            <div v-show="openedMobileBrandIDs.includes(brand.id)"
                                class="block mt-4 pl-4  md:hidden overflow-hidden">
                                <div class="">

                                    <div>

                                        <div class="flex flex-col gap-y-4">
                                            <div v-for="model in brand.models" :key="model.id"
                                                class="cursor-pointer pb-4 border-gray-400 border-b">
                                                <div class="flex items-center justify-between"
                                                    @click="toggleModel({ name: model.name, brandName: brand.name })">
                                                    <div class="flex items-center gap-x-2">
                                                        <span class="text-base">{{ model.name
                                                            }}</span>
                                                    </div>
                                                    <span
                                                        class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                                        :class="selectedModel === model.name
                                                            ? 'bg-black border-black'
                                                            : 'bg-white border-[#CACACA]'">
                                                        <img v-if="selectedModel === model.name"
                                                            src="~/assets/img/check.svg" alt="Check Icon" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </Transition>

                    </div>
                </div>
            </Transition>

        </div>
    </div>

    <div class="flex-1 flex-col flex" v-if="activeSection === 'brand'">
        <div class="flex-1">
            <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                @click="activeSection = 'main'">
                <div class="md:flex hidden items-center cursor-pointer gap-x-2 absolute left-6"
                    @click="activeSection = 'main'">
                    <span>
                        <img class="rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Back Icon">
                    </span>
                    <span class="text-sm">
                        Назад
                    </span>
                </div>
                <h2 class="text-2xl text-center font-semibold mb-2">Марка</h2>

                <span class="md:hidden">
                    <img src="~/assets/img/close.svg" alt="Close Icon">
                </span>
            </div>
            <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                <div v-for="brand in brands" :key="brand.id">
                    <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                        @click.stop="openModelSection(brand)">
                        <div class="flex items-center gap-x-2">
                            <span class="text-lg">{{ brand.name }}</span>
                        </div>
                        <div class="w-6 h-6 flex items-center justify-center">
                            <span :class="openedMobileBrandIDs.includes(brand.id)
                                ? 'rotate-0 md:-rotate-90'
                                : '-rotate-90 md:-rotate-90'"
                                class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0 transition-transform duration-300 ease-in-out"
                                @click.stop="openModelSection(brand)">
                                <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                    class="w-full h-full object-contain" />
                            </span>
                        </div>

                    </div>

                    <Transition name="collapse">
                        <div v-show="openedMobileBrandIDs.includes(brand.id)"
                            class="block mt-4 pl-4  md:hidden overflow-hidden">
                            <div>

                                <div>

                                    <div class="flex flex-col gap-y-4">
                                        <div v-for="model in brand.models" :key="model.id"
                                            class="cursor-pointer pb-4 border-gray-400 border-b">
                                            <div class="flex items-center justify-between"
                                                @click="toggleModel({ name: model.name, brandName: brand.name })">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-base">{{ model.name }}</span>
                                                </div>
                                                <span
                                                    class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                                    :class="selectedModel === model.name
                                                        ? 'bg-black border-black'
                                                        : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedModel === model.name"
                                                        src="~/assets/img/check.svg" alt="Check Icon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <FilterBtnView text="Готово" @click="openSectionSmart('main')" />
    </div>

    <div class="hidden md:flex flex-1  flex-col" v-if="activeSection === 'model' && selectedBrand">
        <div class="flex-1 h-full ">
            <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                @click="activeSection = 'brand'">
                <div class="md:flex hidden items-center cursor-pointer gap-x-2 absolute left-6"
                    @click="activeSection = 'main'">
                    <span>
                        <img class="rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Back Icon">
                    </span>
                    <span class="text-sm">
                        Назад
                    </span>
                </div>
                <h2 class="text-2xl text-center font-semibold mb-2">Модели {{ selectedBrand.name }}</h2>

                <span class="md:hidden">
                    <img src="~/assets/img/close.svg" alt="Close Icon">
                </span>
            </div>
            <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                <div v-for="model in selectedBrand.models" :key="model.id"
                    class="cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]">
                    <div class="flex items-center justify-between"
                        @click="toggleModel({ name: model.name, brandName: selectedBrand.name })">
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
        </div>
        <FilterBtnView class="" text="Готово" @click="openSectionSmart('main')" />
    </div>
</template>

<style scoped lang="css"></style>