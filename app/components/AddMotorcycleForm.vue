<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import type { IBrandProps } from '~/utils/types/brand';
import type { ITypeProps } from '~/utils/types/type';
const { width } = useWindowSize()

const props = defineProps<{
    brands: IBrandProps[]
    types: ITypeProps[]
}>()


// type
const selectedType = ref<string | null>(null)
// brand
const selectedBrand = ref<typeof props.brands[number] | null>(null);
// statuses


const statuses = [
    { value: 'available', label: 'available' },
    { value: 'rented', label: 'rented' },
    { value: 'maintenance', label: 'maintenance' }
];

// active status
const activeStatus = ref<any>(statuses[0]?.label);
//Is Busy
const isBusy = computed(() => activeStatus.value === 'rented');
//Company Name
const company = ref<string | null>(null);
//Daily Rental Price
const dailyRentalPrice = ref<number | null>(null);
//Monthly Rental Price
const monthlyRentalPrice = ref<number | null>(null);
//Weekly Rental Price
const weeklyRentalPrice = ref<number | null>(null);
// price
const salePrice = ref<number | null>(null)
// Engine Volume
const engineVolume = ref<number | null>(null)
// categories


const categories: string[] = ['A', 'A1', 'M'];
// active category
const activeCategory = ref<typeof categories[number]>('A');
// выбранные модели
const selectedModel = ref<string | null>(null)
// transmissions


const transmissions = [
    { value: 'manual', label: 'manual' },
    { value: 'automatic', label: 'automatic' },
    { value: 'cvt', label: 'cvt' }
];


// active transmission
const activeTransmission = ref<any>(transmissions[0]?.label);

type Section = 'main' | 'company' | 'brand' | 'model' | 'type'

const activeSection = ref<Section>('main')

// toggle type
const toggleType = (name: string) => {
    selectedType.value = selectedType.value === name ? null : name
}

const selectedBrandName = ref<string | null>(null)
const yearInput = ref<number | null>(null)



const toggleBrand = (name: string) => {
    selectedBrandName.value = selectedBrandName.value === name ? null : name
}








const openedMobileBrandIDs = ref<number[]>([])

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

function toggleModel(model: { name: string, brandName: string }) {
    selectedBrandName.value = model.brandName
    selectedModel.value = selectedModel.value === model.name ? null : model.name
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

import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
const df = new DateFormatter('en-US', {
    dateStyle: "medium"
})

const modelValue = shallowRef<CalendarDate | null>(null)



const photos = ref<File[]>([])
const mainPhoto = ref<File | null>(null)

const handleFiles = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    Array.from(input.files).forEach(file => {
        photos.value.push(file)

        if (!mainPhoto.value) {
            mainPhoto.value = file
        }
    })
}

const removePhoto = (file: File) => {
    photos.value = photos.value.filter(p => p !== file)

    if (mainPhoto.value === file) {
        mainPhoto.value = photos.value[0] || null
    }
}

const setMainPhoto = (file: File) => {
    mainPhoto.value = file
}


const token = useCookie("auth_token");
const { request, loading } = useApi();


const AddMoto = async () => {
    const router = useRouter()
    const toast = useToast();
    // Проверки обязательных полей
    if (!mainPhoto.value) {
        alert("Выбери главное фото");
        return;
    }

    if (!photos.value.length) {
        alert("Добавь хотя бы одно фото");
        return;
    }

    const formData = new FormData();

    // Основные поля байка
    formData.append("bike_type", selectedType.value || "");
    formData.append("brand", selectedBrand.value?.name || "");
    formData.append("model", selectedModel.value || "");
    formData.append("company", company.value || "");
    formData.append("status", activeStatus.value || "");


    if (isBusy.value && modelValue.value) {
        const date = modelValue.value.toDate(getLocalTimeZone());
        formData.append("busy_until", date.toISOString());
    }

    formData.append("year", String(yearInput.value || 0));
    formData.append("daily_rental_price", String(dailyRentalPrice.value || 0));
    formData.append("weekly_rental_price", String(weeklyRentalPrice.value || 0));
    formData.append("monthly_rental_price", String(monthlyRentalPrice.value || 0));
    formData.append("sale_price", String(salePrice.value || 0));
    formData.append("transmission", activeTransmission.value || "");
    formData.append("engine_capacity_cc", String(engineVolume.value || 0));
    formData.append("license_category", activeCategory.value || "");


    formData.append("main_photo", mainPhoto.value);


    photos.value.forEach(file => {
        formData.append("photos[]", file);
    });


    try {
        // Отправка
        await request<any>({
            url: "/bikes",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            body: formData,
            success: { title: "Add Moto!", message: "Saved successfully" },
        });
        router.push("/bikes")
    } catch (e: any) {
        toast.error({
            title: "Ошибка",
            message: e?.data?.message || "Не удалось создать байк",
        })

    }



};

const getPreview = (file: File) => {
    return URL.createObjectURL(file)
}



</script>

<template>
    <div
        class="md:relative absolute left-0 md:left-auto overflow-scroll md:overflow-auto top-0 md:top-auto w-full p-4  bg-white z-50 ">
        <div class="w-full flex flex-col">
            <div class="flex-1" v-if="activeSection === 'main'">
                <!-- Mobile Version Close Dropdown  -->
                <div class=" flex mb-4 items-center justify-between md:hidden">
                    <p class="text-2xl font-semibold">Добавить мотоцикл</p>
                    <NuxtLinkLocale to="/bikes">
                        <img src="~/assets/img/close.svg" alt="Close Icon">
                    </NuxtLinkLocale>
                </div>
                <div class="flex flex-col gap-y-6">
                    <div class="grid md:grid-cols-3 items-center gap-y-6 gap-x-6">
                        <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                            <input type="text" v-model="company" placeholder="Название Компании"
                                class="w-full h-full px-4 rounded-l-full outline-none" />
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


                                    <span v-if="selectedBrandName || selectedModel" class="shrink-0 hidden md:block"
                                        @click.stop="
                                            selectedBrandName = null;
                                        selectedModel = null;
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
                                                    :class="selectedBrandName === brand.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedBrandName === brand.name"
                                                        src="~/assets/img/check.svg" alt="Check Icon" class="">
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
                                        <template v-if="selectedType">
                                            {{ selectedType }}

                                        </template>
                                        <template v-else>
                                            Тип байка
                                        </template>
                                    </span>
                                    <span class="shrink-0 hidden md:block" v-if="selectedType"
                                        @click.stop="selectedType = null">
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
                                                    :class="selectedType === type.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                                    <img v-if="selectedType === type.name" src="~/assets/img/check.svg"
                                                        alt="Check Icon" class="">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                        </div>
                    </div>
                    <div class="grid xl:grid-cols-3 gap-y-6 gap-x-1 lg:gap-x-6">
                        <LabeledSegmentedControl label="Категория прав" v-model="activeCategory" :options="categories"
                            width-class="w-1/3" heightClass="h-10" />
                        <labeled-segmented-control label="Статус" v-model="activeStatus"
                            :options="statuses.map((item) => item.label)" width-class="w-1/3" heightClass="h-10" />

                        <div class="flex flex-col gap-y-6">
                            <div>
                                <span :class="{ 'text-gray-300': !isBusy }" class="text-lg inline-block">Занят до</span>
                                <div class="mt-2 relative">
                                    <UPopover>
                                        <UButton :class="{ 'text-gray-300': !isBusy }" class="cursor-pointer "
                                            color="neutral" icon="i-lucide-calendar" :disabled="!isBusy">
                                            <span class="">
                                                {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) :
                                                    'Select a date' }}
                                            </span>
                                        </UButton>

                                        <template #content>
                                            <UCalendar v-model="modelValue" size="xs" color="info" class="p-2" />
                                        </template>
                                    </UPopover>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">

                        <div class="  flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Цена/сутки</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Цена" v-model="dailyRentalPrice"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div class="  flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Цена/неделя</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Цена" v-model="weeklyRentalPrice"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div class="  flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Цена/месяц</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Цена" v-model="monthlyRentalPrice"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                        <div class="  flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Цена/продажи</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Цена" v-model="salePrice"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <labeled-segmented-control label="Коробка передач" v-model="activeTransmission"
                            :options="transmissions.map((item) => item.label)" width-class="w-1/3" heightClass="h-12" />
                        <div class="flex flex-col gap-y-6">
                            <div class="">
                                <span class="text-lg mb-2 inline-block">Год выпуска</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" v-model="yearInput" placeholder="Год"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-6">
                            <!-- category -->
                            <div>
                                <span class="text-lg mb-2 inline-block">Объем двигателя</span>
                                <div class="relative border border-gray rounded-full h-12 flex overflow-hidden">
                                    <input type="number" placeholder="Объем" v-model="engineVolume"
                                        class="w-full h-full px-4 rounded-l-full outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">

                        <label class="cursor-pointer px-4 py-2 bg-black  text-white rounded-full inline-block">
                            Загрузить фото
                            <input type="file" multiple accept="image/*" class="hidden" @change="handleFiles" />
                        </label>


                        <div class="grid  grid-cols-3 ">
                            <div v-for="(photo, index) in photos" :key="photo.name + photo.size"
                                class="relative w-full  h-full border overflow-hidden">
                                <img :src="getPreview(photo)" alt="photo" class="w-full h-full object-cover" />

                                <button @click="removePhoto(photo)"
                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    ×
                                </button>

                                <!-- Главное фото -->
                                <span v-if="mainPhoto === photo"
                                    class="absolute bottom-1 left-1 bg-yellow-500 text-white text-xs px-1 rounded">
                                    Главное
                                </span>

                                <button v-else @click="setMainPhoto(photo)"
                                    class="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                                    Сделать главным
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-6">
                    <button @click="AddMoto"
                        class="border w-full flex items-center justify-center md:max-w-89.5 group cursor-pointer transition-all duration-300  py-3  rounded-full">
                        <span v-if="loading">
                            <img class="animate-spin" src="~/assets/img/progress-black.svg" alt="Progress Icon">
                        </span>
                        <span class="font-semibold  transition-all duration-300 tex-lg" v-else>
                            Добавить
                        </span>
                    </button>
                </div>
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
                                    :class="selectedType === type.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedType === type.name" src="~/assets/img/check.svg" alt="Check Icon"
                                        class="">
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
                            <!-- Mobile Version -->
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
                                    :class="selectedModel === model.name ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                    <img v-if="selectedModel === model.name" src="~/assets/img/check.svg"
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


.grid-custom {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    /* по умолчанию 3 колонки */
}
</style>