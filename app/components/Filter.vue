<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const props = defineProps<{
    closeIsAdding: () => any
}>()


// filter volume range
const value = ref<[number, number]>([100, 400]);
const filterWrapperRef = ref<HTMLElement | null>(null)
// volume label
const volumeLabel = computed(() => {
    return `${value.value[0]} – ${value.value[1]}`
});

// categories
const categories: string[] = ['A', 'A1', 'M'];
// active category
const activeCategory = ref<typeof categories[number]>('A');


// statuses
const statuses: string[] = ['Свободен', 'Занят', 'Сервис'];
// active status
const activeStatus = ref<typeof statuses[number]>('Свободен');


// transmissions
const transmissions: string[] = ['МКПП', 'АКПП', 'CVT'];
// active transmission
const activeTransmission = ref<typeof transmissions[number]>('МКПП');

type Section = 'main' | 'company' | 'brand' | 'model' | 'type'

const activeSection = ref<Section>('main')

function scrollToTop() {
    if (width.value < 768) {
        window.scrollTo({
            top: filterWrapperRef.value?.offsetTop || 0,
            behavior: 'smooth',
        });
    }
}




// companies
const selectedCompanies = ref<string[]>([]);

// toggle company
const toggleCompany = (name: string) => {
    if (selectedCompanies.value.includes(name)) {
        selectedCompanies.value = selectedCompanies.value.filter(c => c !== name);
    } else {
        selectedCompanies.value.push(name);
    }
}

// types
const selectedTypes = ref<string[]>([]);
// toggle type
const toggleType = (name: string) => {
    if (selectedTypes.value.includes(name)) {
        selectedTypes.value = selectedTypes.value.filter(c => c !== name);
    } else {
        selectedTypes.value.push(name);
    }
}

const selectedBrands = ref<string[]>([]);

const toggleBrand = (name: string) => {
    if (selectedBrands.value.includes(name)) {
        selectedBrands.value = selectedBrands.value.filter(b => b !== name);
    } else {
        selectedBrands.value.push(name);
    }
}

const selectedBrand = ref<typeof brands[number] | null>(null);

// выбранные модели
const selectedModels = ref<string[]>([]);

function openBrandSection() {
    activeSection.value = 'brand';
}

const openedMobileBrandIDs = ref<number[]>([])

function openModelSection(brand: typeof brands[number]) {
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

function toggleModel(model: { name: string, brandName: string }) {
    // добавляем бренд, если ещё нет
    if (!selectedBrands.value.includes(model.brandName)) {
        selectedBrands.value.push(model.brandName)
    }

    // переключаем модель
    const idx = selectedModels.value.indexOf(model.name)
    if (idx !== -1) {
        selectedModels.value.splice(idx, 1)
    } else {
        selectedModels.value.push(model.name)
    }
}


// filter button
const filterButton = ref<boolean>(false);
// toggle filter button
const toggleFilterButton = () => {
    filterButton.value = !filterButton.value;
}


onClickOutside(filterWrapperRef, () => {
    filterButton.value = false
})


function onBrandClick(brand: any) {
    if (width.value >= 768) {
        // desktop — просто выбрать бренд
        toggleBrand(brand.name)
    } else {
        // mobile — открыть модели
        openModelSection(brand)
    }
}

const selectedBrandsWithModelsDetailed = computed(() => {
    return selectedBrands.value.map(brandName => {
        const brand = brands.find(b => b.name === brandName)
        if (!brand) return { brandName, modelsCount: 0 } // <-- теперь объект всегда

        const modelsOfBrand = selectedModels.value.filter(modelName =>
            brand.models.some(m => m.name === modelName)
        )

        return { brandName, modelsCount: modelsOfBrand.length }
    })
})

const displayedBrandsCompact = computed(() => {
    const maxVisible = 3; // сколько брендов показывать явно
    const totalBrands = selectedBrandsWithModelsDetailed.value.length;

    const visibleBrands = selectedBrandsWithModelsDetailed.value.slice(0, maxVisible);
    const hiddenCount = totalBrands - maxVisible;

    return { visibleBrands, hiddenCount: hiddenCount > 0 ? hiddenCount : 0 };
});


type MobileSection = 'company' | 'brand' | 'type' | 'main';

const openedMobileSections = ref<MobileSection[]>([]);

function toggleMobileSection(section: MobileSection) {
    if (openedMobileSections.value.includes(section)) {
        openedMobileSections.value = openedMobileSections.value.filter(s => s !== section)
    } else {
        openedMobileSections.value.push(section)
    }
}

function openSectionSmart(section: MobileSection) {
    if (width.value >= 768) {
        activeSection.value = section
    } else {
        toggleMobileSection(section)
    }
}

const isMobile = computed(() => width.value < 768)

function toggleAllModelsOfBrand(brand: typeof brands[number]) {
    const allModelsSelected = brand.models.every(model =>
        selectedModels.value.includes(model.name)
    )

    if (allModelsSelected) {
        // снять все модели бренда
        selectedModels.value = selectedModels.value.filter(
            modelName => !brand.models.some(m => m.name === modelName)
        )
        // если больше нет выбранных моделей этого бренда — удалить бренд
        if (!selectedModels.value.some(modelName =>
            brand.models.some(m => m.name === modelName)
        )) {
            selectedBrands.value = selectedBrands.value.filter(b => b !== brand.name)
        }
    } else {
        // добавить все модели бренда
        brand.models.forEach(model => {
            if (!selectedModels.value.includes(model.name)) {
                selectedModels.value.push(model.name)
            }
        })
        // добавить бренд, если ещё нет
        if (!selectedBrands.value.includes(brand.name)) {
            selectedBrands.value.push(brand.name)
        }
    }
}

const allModelsSelected = (brand: any) => {
    return brand.models.every((model: any) =>
        selectedModels.value.includes(model.name)
    )
}

</script>

<template>
    <div
        class="md:relative absolute left-0 md:left-auto overflow-scroll md:overflow-auto top-0 md:top-auto w-full p-4  bg-white z-50 ">
        <div class="w-full flex flex-col">
            <div class="flex-1" v-if="activeSection === 'main'">
                <div class=" flex mb-4 items-center justify-between md:hidden" @click="toggleFilterButton">
                    <p class="text-2xl font-semibold">Добавить мотоцикл</p>
                    <span @click="closeIsAdding">
                        <img src="~/assets/img/close.svg" alt="Close Icon">
                    </span>
                </div>
                <div class="flex flex-col gap-y-6">
                    <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                        <!-- Company && category && range  -->
                        <div class="relative">
                            <div
                                class="flex pb-4 md:pb-0 md:h-12.5 cursor-pointer  justify-between items-center relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                                <div class="flex w-full items-center justify-between gap-x-4"
                                    @click="openSectionSmart('company')">
                                    <!-- mobile version -->
                                    <span class="flex items-center justify-between text-lg w-full md:hidden">
                                        <span class="font-semibold">
                                            Компания
                                        </span>
                                        <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                            class="transition-transform duration-300" :class="openedMobileSections.includes('company')
                                                ? 'rotate-0'
                                                : '-rotate-90'" />
                                    </span>
                                    <span class="text-lg hidden md:block">
                                        <template v-if="selectedCompanies.length">
                                            <p class="text-sm text-gray-500 md:hidden">Компания</p>
                                            {{ selectedCompanies.slice(0, 2).join(', ') }}
                                            <span v-if="selectedCompanies.length > 2" class="text-sm text-gray-500">
                                                , +{{ selectedCompanies.length - 2 }} ещё
                                            </span>
                                        </template>
                                        <template v-else>
                                            Компания
                                        </template>
                                    </span>
                                    <span class="shrink-0 hidden md:block" v-if="selectedCompanies.length"
                                        @click.stop="selectedCompanies.length = 0">
                                        <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon">
                                    </span>
                                    <span class="w-6 h-6  items-center justify-center hidden md:flex" v-else
                                        @click="openSectionSmart('company')">
                                        <span class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain">
                                        </span>
                                    </span>

                                </div>
                            </div>
                            <Transition name="collapse">
                                <div v-if="openedMobileSections.includes('company')" class="md:hidden mt-4">
                                    <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                                        <div v-for="company in companies" :key="company.id">
                                            <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                                @click="toggleCompany(company.name)">
                                                <span class="text-lg"> {{ company.name }} </span>
                                                <span
                                                    class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                                    :class="selectedCompanies.includes(company.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedCompanies.includes(company.name)"
                                                        src="~/assets/img/check.svg" alt="Check Icon" class="">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                        </div>
                        <!-- Brand && status && year -->
                        <div class="relative">
                            <div
                                class="flex pb-4 md:pb-0 md:h-12.5  justify-between items-center relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                                <div class="flex w-full items-center justify-between gap-x-4  cursor-pointer"
                                    @click="openSectionSmart('brand')">

                                    <!-- mobile version -->
                                    <span class="flex items-center justify-between text-lg w-full md:hidden">
                                        <span class="font-semibold">
                                            Марка, модель
                                        </span>
                                        <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                            class="transition-transform duration-300" :class="openedMobileSections.includes('brand')
                                                ? 'rotate-0'
                                                : '-rotate-90'" />
                                    </span>

                                    <span class="text-lg hidden md:block">
                                        <p class="text-sm text-gray-500 md:hidden">Марка, модель</p>

                                        <template v-if="selectedBrands.length || selectedModels.length">
                                            <template v-for="(item, index) in displayedBrandsCompact.visibleBrands"
                                                :key="item.brandName">
                                                {{ item.brandName }}
                                                <span v-if="item.modelsCount > 0" class="text-gray-400 text-[12px]">
                                                    +{{ item.modelsCount }} {{ item.modelsCount === 1 ? 'модель' :
                                                        'модели' }}
                                                </span>
                                                <span v-if="index < displayedBrandsCompact.visibleBrands.length - 1">,
                                                </span>
                                            </template>

                                            <span v-if="displayedBrandsCompact.hiddenCount > 0"
                                                class="text-gray-400 text-[12px]">
                                                +{{ displayedBrandsCompact.hiddenCount }} ещё
                                            </span>
                                        </template>
                                        <template v-else>
                                            Марка, модель
                                        </template>
                                    </span>


                                    <span v-if="selectedBrands.length || selectedModels.length"
                                        class="shrink-0 hidden md:block" @click.stop="
                                            selectedBrands.length = 0;
                                        selectedModels.length = 0;
                                        ">
                                        <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon" />
                                    </span>

                                    <span class=" md:flex items-center justify-center hidden" v-else
                                        @click="openSectionSmart('brand')">
                                        <span class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain" />
                                        </span>
                                    </span>

                                </div>
                                <span></span>

                            </div>
                            <!-- Mobile Version -->
                            <Transition name="collapse">
                                <div v-if="openedMobileSections.includes('brand')"
                                    class="grid md:grid-cols-3 md:hidden gap-x-8 gap-y-4 companies-grid mt-4">
                                    <div v-for="brand in brands" :key="brand.id">
                                        <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                            @click="onBrandClick(brand)">
                                            <div class="flex items-center gap-x-2">
                                                <span
                                                    class="w-6 h-6 shrink-0 hidden md:flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                                    :class="selectedBrands.includes(brand.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedBrands.includes(brand.name)"
                                                        src="~/assets/img/check.svg" alt="Check Icon" class="">
                                                </span>
                                                <span>
                                                    <img :src="brand.icon" :alt="brand.name"
                                                        class="w-5 h-5 flex flex-1 object-contain" />
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
                                                                        :class="selectedModels.includes(model.name)
                                                                            ? 'bg-black border-black'
                                                                            : 'bg-white border-[#CACACA]'">
                                                                        <img v-if="selectedModels.includes(model.name)"
                                                                            src="~/assets/img/check.svg"
                                                                            alt="Check Icon" />
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
                        <!-- Type && transmissions && price -->
                        <div class="relative">
                            <div
                                class="flex pb-4 md:pb-0 md:h-12.5 cursor-pointer  justify-between items-center relative after:w-full md:after:w-0  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute">
                                <div class="flex w-full items-center justify-between gap-x-4"
                                    @click="openSectionSmart('type')">
                                    <!-- Mobile Version -->
                                    <span class="flex items-center justify-between text-lg w-full md:hidden">
                                        <span class="font-semibold">
                                            Тип байка
                                        </span>
                                        <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                            class="transition-transform duration-300" :class="openedMobileSections.includes('type')
                                                ? 'rotate-0'
                                                : '-rotate-90'" />
                                    </span>
                                    <span class="text-lg hidden md:block">
                                        <template v-if="selectedTypes.length">
                                            {{ selectedTypes.slice(0, 2).join(', ') }}
                                            <span v-if="selectedTypes.length > 2" class="text-sm text-gray-500">
                                                , +{{ selectedTypes.length - 2 }} ещё
                                            </span>
                                        </template>
                                        <template v-else>
                                            Тип байка
                                        </template>
                                    </span>
                                    <span class="shrink-0 hidden md:block" v-if="selectedTypes.length"
                                        @click.stop="selectedTypes.length = 0">
                                        <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon">
                                    </span>
                                    <span class="w-6 h-6  items-center justify-center hidden md:flex" v-else
                                        @click="openSectionSmart('type')">
                                        <span class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain">
                                        </span>
                                    </span>

                                </div>
                            </div>
                            <Transition name="collapse">
                                <div v-if="openedMobileSections.includes('type')" class="md:hidden mt-4">
                                    <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                                        <div v-for="type in types" :key="type.id">
                                            <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                                @click="toggleType(type.name)">
                                                <span class="text-lg"> {{ type.name }} </span>
                                                <span
                                                    class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                                    :class="selectedTypes.includes(type.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedTypes.includes(type.name)"
                                                        src="~/assets/img/check.svg" alt="Check Icon" class="">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                        </div>
                    </div>
                    <div class="grid xl:grid-cols-3 gap-y-6 gap-x-1 lg:gap-x-6">
                        <LabeledSegmentedControl LabeledSegmentedControl label="Категория прав" v-model="activeCategory"
                            :options="categories" width-class="w-1/3" />
                        <labeled-segmented-control label="Статус" v-model="activeStatus" :options="statuses"
                            width-class="w-1/3" />
                        <labeled-segmented-control label="Коробка передач" v-model="activeTransmission"
                            :options="transmissions" width-class="w-1/3" />
                    </div>
                    <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                        <div class="flex flex-col gap-y-6">

                            <div class="">
                                <span class="text-lg mb-2 inline-block">Год выпуска</span>
                                <div class="mt-2 relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Год"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />


                                </div>
                            </div>
                        </div>
                        <div class="  flex flex-col gap-y-6">

                            <div class="">
                                <span class="text-lg mb-2 inline-block">Цена</span>
                                <div class="mt-2 relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Цена"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />


                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Занят до</span>
                                <div class="mt-2 relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="date" placeholder="Дата"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />


                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                        <div class="flex flex-col gap-y-6">
                            <!-- category -->

                            <div>
                                <span class="text-lg mb-2 inline-block">Объем двигателя</span>
                                <div class="flex flex-col items-center justify-center">

                                    <span class="text-3xl font-semibold">
                                        {{ volumeLabel }} см³
                                    </span>
                                    <!-- label -->
                                    <!-- range -->
                                    <USlider class="mt-10" :min="50" :max="1200" :step="25" v-model="value" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <FilterBtnView class="" text="Добавить" @click="closeIsAdding" />
            </div>
            <!-- componies selection-->
            <div class="flex flex-col flex-1" v-if="activeSection === 'company'">
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

                        <h2 class="text-2xl text-center font-semibold mb-2">Компания</h2>

                        <span class="md:hidden">
                            <img src="~/assets/img/close.svg" alt="Close Icon">
                        </span>
                    </div>

                    <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                        <div v-for="company in companies" :key="company.id">
                            <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                @click="toggleCompany(company.name)">
                                <span class="text-lg"> {{ company.name }} </span>
                                <span
                                    class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                    :class="selectedCompanies.includes(company.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedCompanies.includes(company.name)" src="~/assets/img/check.svg"
                                        alt="Check Icon" class="">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <FilterBtnView text="Готово" @click="openSectionSmart('main')" />
            </div>

            <!-- types selection -->
            <div class="flex-1 flex flex-col" v-if="activeSection === 'type'">
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
                        <h2 class="text-2xl text-center font-semibold mb-2">Тип байка</h2>

                        <span class="md:hidden">
                            <img src="~/assets/img/close.svg" alt="Close Icon">
                        </span>
                    </div>
                    <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                        <div v-for="type in types" :key="type.id">
                            <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                @click="toggleType(type.name)">
                                <span class="text-lg"> {{ type.name }} </span>
                                <span
                                    class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                    :class="selectedTypes.includes(type.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedTypes.includes(type.name)" src="~/assets/img/check.svg"
                                        alt="Check Icon" class="">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <FilterBtnView class="" text="Готово" @click="openSectionSmart('main')" />
            </div>
            <!-- brand -->
            <!-- brand selection -->
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
                                @click="onBrandClick(brand)">
                                <div class="flex items-center gap-x-2">
                                    <span
                                        class="w-6 h-6 shrink-0 hidden md:flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                        :class="selectedBrands.includes(brand.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                        <img v-if="selectedBrands.includes(brand.name)" src="~/assets/img/check.svg"
                                            alt="Check Icon" class="">
                                    </span>
                                    <span>
                                        <img :src="brand.icon" :alt="brand.name"
                                            class="w-5 h-5 flex flex-1 object-contain" />
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
                            <!-- Mobile Version -->
                            <Transition name="collapse">
                                <div v-show="openedMobileBrandIDs.includes(brand.id)"
                                    class="block mt-4 pl-4  md:hidden overflow-hidden">
                                    <div>
                                        <span class="pb-4 mb-4 block border-gray-400 border-b" @click="
                                            activeSection = 'main';
                                        toggleBrand(brand.name);
                                        ">Выбрать все</span>
                                        <div>
                                            <p class="text-gray-400 mb-4 block">Популярные модели
                                            </p>
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
                                                            :class="selectedModels.includes(model.name)
                                                                ? 'bg-black border-black'
                                                                : 'bg-white border-[#CACACA]'">
                                                            <img v-if="selectedModels.includes(model.name)"
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

            <!-- Model selection -->
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
                                    :class="selectedModels.includes(model.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedModels.includes(model.name)" src="~/assets/img/check.svg"
                                        alt="Check Icon" class="">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <FilterBtnView class="" text="Готово" @click="openSectionSmart('main')" />
            </div>
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




.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.collapse-enter-active,
.collapse-leave-active {
    transition: max-height 0.35s ease, opacity 0.25s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
    max-height: 500px;
    /* должно быть больше реальной высоты */
    opacity: 1;
}
</style>