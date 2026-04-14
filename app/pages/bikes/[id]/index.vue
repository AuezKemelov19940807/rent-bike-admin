<script setup lang="ts">
import type { Bike } from '~/utils/types/bike';





// const loadingEdit = ref(false)

// const engineVolume = ref<number | null>(null)
// const yearInput = ref<number | null>(null)
// //Daily Rental Price
// const dailyRentalPrice = ref<number | null>(null);
// //Monthly Rental Price
// const monthlyRentalPrice = ref<number | null>(null);
// //Weekly Rental Price
// const weeklyRentalPrice = ref<number | null>(null);
// // price
// const salePrice = ref<number | null>(null)

// const photos = ref<File[]>([]) // новые файлы
// const existingPhotos = ref<string[]>([]) // старые с бэка

// const mainPhoto = ref<File | null>(null)
// const existingMainPhoto = ref<string | null>(null)

// const handleFiles = (event: Event) => {
//     const input = event.target as HTMLInputElement
//     if (!input.files) return

//     Array.from(input.files).forEach(file => {
//         photos.value.push(file)

//         if (!mainPhoto.value && !existingMainPhoto.value) {
//             mainPhoto.value = file
//         }
//     })
// }

// const removePhoto = (photo: File | string) => {
//     if (typeof photo === "string") {
//         existingPhotos.value = existingPhotos.value.filter(p => p !== photo)

//         if (existingMainPhoto.value === photo) {
//             existingMainPhoto.value = null
//         }
//     } else {
//         photos.value = photos.value.filter(p => p !== photo)

//         if (mainPhoto.value === photo) {
//             mainPhoto.value = photos.value[0] || null
//         }
//     }
// }

// const setMainPhoto = (photo: File | string) => {
//     if (typeof photo === "string") {
//         existingMainPhoto.value = photo
//         mainPhoto.value = null
//     } else {
//         mainPhoto.value = photo
//         existingMainPhoto.value = null
//     }
// }

// const getPreview = (file: File | string) => {
//     return typeof file === "string"
//         ? file
//         : URL.createObjectURL(file)
// }

// const isMain = (photo: File | string) => {
//     return photo === mainPhoto.value || photo === existingMainPhoto.value
// }


// watch(bike, (val) => {
//     if (!val) return
//     engineVolume.value = val.engine_capacity_cc
//     company.value = val.company
//     yearInput.value = val.year
//     dailyRentalPrice.value = val.daily_rental_price
//     monthlyRentalPrice.value = val.monthly_rental_price
//     weeklyRentalPrice.value = val.weekly_rental_price
//     salePrice.value = val.sale_price
//     existingPhotos.value = val.photos || []
//     existingMainPhoto.value = val.main_photo || null


// }, { immediate: true })

// const { request, loading } = useApi();
// const token = useCookie("auth_token");
// const router = useRouter()
// const toast = useToast();

// const { data: brands, error } = await useFetch<IBrandProps[]>("/bikes/catalog", {
//     baseURL: config.public.apiBase,
// });

// const { data: types, error: typeError } = await useFetch<ITypeProps[]>("/bikes/types", {
//     baseURL: config.public.apiBase,
// });

// const urlToFile = async (url: string, filename?: string): Promise<File> => {
//     const res = await fetch(url)
//     const blob = await res.blob()
//     const name = filename || url.split('/').pop() || 'image.png'
//     return new File([blob], name, { type: blob.type })
// }












// const editMoto = async () => {

//     const formData = new FormData()
//     loadingEdit.value = true

//     if (!mainPhoto.value && !existingMainPhoto.value) {
//         alert("Выбери главное фото");
//         return;
//     }

//     if (!photos.value.length && !existingPhotos.value.length) {
//         alert("Добавь хотя бы одно фото");
//         return;
//     }

//     formData.append("company", company.value)
//     formData.append("engine_capacity_cc", String(engineVolume.value || 0));
//     formData.append("year", String(yearInput.value || 0));
//     formData.append("daily_rental_price", String(dailyRentalPrice.value || 0));
//     formData.append("weekly_rental_price", String(weeklyRentalPrice.value || 0));
//     formData.append("monthly_rental_price", String(monthlyRentalPrice.value || 0));
//     formData.append("sale_price", String(salePrice.value || 0));

//     // 🔹 главный файл
//     if (mainPhoto.value) {
//         // пользователь выбрал новый файл
//         formData.append("main_photo", mainPhoto.value)
//     } else if (existingMainPhoto.value) {
//         // конвертируем URL в File
//         const mainFile = await urlToFile(existingMainPhoto.value, "main_photo.png")
//         formData.append("main_photo", mainFile)
//     } else {
//         alert("Выбери главное фото")
//         loadingEdit.value = false
//         return
//     }


//     // 🔹 дополнительные фото
//     const allPhotos: File[] = []

//     // новые
//     photos.value.forEach(file => allPhotos.push(file))

//     // старые URL
//     for (const url of existingPhotos.value) {
//         // избегаем дубли главного фото
//         if (url === existingMainPhoto.value) continue
//         const file = await urlToFile(url)
//         allPhotos.push(file)
//     }

//     // добавляем в formData
//     allPhotos.forEach(file => formData.append("photos[]", file))


//     try {
//         await request({
//             url: `/bikes/${route.params.id}`,
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${token.value}`,
//             },
//             body: formData,
//             success: {
//                 title: "Updated!",
//                 message: "Bike успешно обновлён",
//             },

//         })
//         loadingEdit.value = false
//         router.push("/bikes")

//     } catch (e: any) {
//         toast.error({
//             title: "Ошибка",
//             message: e?.data?.message || "Не удалось обновить",
//         })
//     }
// }



const config = useRuntimeConfig();
const route = useRoute()
const bikeId = route.params.id as string;

const { selectedBrand, selectedModel, selectedType } = useBikeSelection(bikeId)
const { data: bike } = await useFetch<Bike>(`/bikes/${route.params.id}`, {
    baseURL: config.public.apiBase,
    lazy: true,


});

const company = ref<string>("")
const dailyRentalPrice = ref<number | null>(null)
const weeklyRentalPrice = ref<number | null>(null)
const monthlyRentalPrice = ref<number | null>(null)
const salePrice = ref<number | null>(null)
const transmissions = [
    { value: 'manual', label: 'manual' },
    { value: 'automatic', label: 'automatic' },
    { value: 'cvt', label: 'cvt' }
];


// active transmission
const activeTransmission = ref<any>(transmissions[0]?.label);
const year = ref<number | null>(null)
const engineVolume = ref<number | null>(null)

const { request, loading } = useApi();
const token = useCookie("auth_token");


const categories: string[] = ['A', 'A1', 'M'];
// active category
const activeCategory = ref<typeof categories[number]>('A');
// выбранные модели
const statuses = [
    { value: 'available', label: 'available' },
    { value: 'rented', label: 'rented' },
    { value: 'maintenance', label: 'maintenance' }
];

// active status
const activeStatus = ref<any>(statuses[0]?.label);

const isBusy = computed(() => activeStatus.value === 'rented');
import { CalendarDate, DateFormatter, getLocalTimeZone, parseAbsolute } from '@internationalized/date'

const modelValue = shallowRef<any | null>(null)



// новые фото
const photos = ref<File[]>([])

// главное фото (новое)
const mainPhoto = ref<File | null>(null)

// главное старое (только UI)
const existingMainPhoto = ref<string | null>(null)


const existingPhotos = ref<string[]>([])       // UI (может быть URL)
const existingPhotoKeys = ref<string[]>([])     // backend (ТОЛЬКО KEY)

const df = new DateFormatter('en-US', {
    dateStyle: "medium"
})

const getPhotoKey = (path: string) => {
    if (!path) return ''

    // если уже key
    if (!path.startsWith('http')) return path

    // если URL → достаём путь после domain
    const url = new URL(path)
    return url.pathname.replace(/^\/+/, '')
}



const allPhotos = computed(() => [
    ...existingPhotos.value.map(p => ({ type: 'existing', value: p })),
    ...photos.value.map(p => ({ type: 'new', value: p }))
])



// const isMainPhoto = (photo: any) => {
//     if (photo.type === 'existing') {
//         return existingMainPhoto.value === photo.value
//     }
//     return mainPhoto.value === photo.value
// }


const isMainPhoto = (photo: any) => {
    if (photo.type === 'existing') {
        return getPhotoKey(existingMainPhoto.value || '') === getPhotoKey(photo.value)
    }

    if (!mainPhoto.value) return false

    return (
        mainPhoto.value.name === photo.value.name &&
        mainPhoto.value.size === photo.value.size
    )
}




const removePhoto = (photo: any) => {
    if (photo.type === 'existing') {
        const key = getPhotoKey(photo.value)

        // удаляем из списков
        existingPhotos.value = existingPhotos.value.filter(p => p !== photo.value)
        existingPhotoKeys.value = existingPhotoKeys.value.filter(p => p !== key)

        const isMain = getPhotoKey(existingMainPhoto.value || '') === key

        // ❗ если удалили главное — назначаем новое
        if (isMain) {
            const next = existingPhotos.value[0] || null
            existingMainPhoto.value = next
        }

    } else {
        photos.value = photos.value.filter(p => p !== photo.value)

        // если удалили новое главное
        if (mainPhoto.value === photo.value) {
            mainPhoto.value = photos.value[0] || null
        }
    }
}



const setMainPhoto = (photo: any) => {


    if (photo.type === 'existing') {
        existingMainPhoto.value = photo.value
        mainPhoto.value = null
    } else {
        mainPhoto.value = photo.value
        existingMainPhoto.value = null
    }
}





const getImageUrl = (path: string) => {
    if (!path) return ''

    if (path.startsWith('http')) return path

    return `${config.public.apiBase}/${path}`
}

const getPreview = (photo: { type: string, value: any }) => {
    if (photo.type === 'new') {
        return URL.createObjectURL(photo.value)
    }

    return getImageUrl(photo.value)
}




const handleFiles = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    const files = Array.from(input.files)

    files.forEach(file => {
        photos.value.push(file)

        if (!mainPhoto.value && !existingMainPhoto.value) {
            mainPhoto.value = file
        }
    })
}







const edit = async () => {
    const formData = new FormData()
    loading.value = true
    const toast = useToast();
    const router = useRouter()
    formData.append("company", company.value)
    formData.append("brand", selectedBrand.value || "")
    formData.append("model", selectedModel.value || "")
    formData.append("bike_type", selectedType.value || "")
    formData.append("license_category", activeCategory.value || "")
    formData.append("status", activeStatus.value || "")
    formData.append("daily_rental_price", String(dailyRentalPrice.value || 0));
    formData.append("weekly_rental_price", String(weeklyRentalPrice.value || 0
    ));
    formData.append("monthly_rental_price", String(monthlyRentalPrice.value || 0
    ));
    formData.append("sale_price", String(salePrice.value || 0
    ));



    if (modelValue.value && activeStatus.value === 'rented') {
        const date = modelValue.value.toDate(getLocalTimeZone())
        formData.append("busy_until", date.toISOString())
    }

    formData.append("transmission", activeTransmission.value || "")
    formData.append("year", String(year.value || 0))
    formData.append("engine_capacity_cc", String(engineVolume.value || 0))

    // 📌 новые фото
    photos.value.forEach(file => {
        formData.append("photos[]", file)
    })

    // 📌 старые фото (KEYS ТОЛЬКО)
    existingPhotoKeys.value.forEach(key => {
        formData.append("existing_photos[]", key)
    })





    if (mainPhoto.value) {
        formData.append("main_photo", mainPhoto.value)
    }

    if (existingMainPhoto.value) {
        formData.append(
            "existing_main_photo",
            getPhotoKey(existingMainPhoto.value)
        )
    }




    try {
        await request({
            url: `/bikes/${route.params.id}`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            body: formData,
            success: {
                title: "Updated!",
                message: "Bike успешно обновлён",
            },

        })


        loading.value = false


        router.push("/bikes")

    } catch (e: any) {
        console.error(e)
        toast.error({
            title: "Ошибка",
            message: e?.data?.message || "Не удалось обновить",
        })
    }
}





watch(bike, (val) => {
    if (!val) return

    company.value = val.company

    if (!selectedBrand.value) {
        selectedBrand.value = val.brand
    }
    if (!selectedModel.value) {
        selectedModel.value = val.model
    }
    if (!selectedType.value) {
        selectedType.value = val.bike_type
    }

    if (val.license_category) {
        activeCategory.value = val.license_category
    }
    if (val.status) {
        activeStatus.value = val.status
    }

    if (val.daily_rental_price) {
        dailyRentalPrice.value = val.daily_rental_price
    }

    if (val.weekly_rental_price) {
        weeklyRentalPrice.value = val.weekly_rental_price
    }

    if (val.monthly_rental_price) {
        monthlyRentalPrice.value = val.monthly_rental_price
    }

    if (val.sale_price) {
        salePrice.value = val.sale_price
    }

    if (val.transmission) {
        activeTransmission.value = val.transmission
    }
    if (val.year) {
        year.value = val.year
    }

    if (val.engine_capacity_cc) {
        engineVolume.value = val.engine_capacity_cc
    }

    if (val.busy_until) {
        modelValue.value = parseAbsolute(val.busy_until, getLocalTimeZone())
    }

    // UI для картинок
    existingPhotos.value = (val.photos || []).map(p => p)

    // 🔥 ключи для backend (ВАЖНО)
    existingPhotoKeys.value = (val.photos || []).map(getPhotoKey)

    // main photo тоже ключ
    existingMainPhoto.value = val.main_photo
        ? val.main_photo
        : null

}, { immediate: true })




</script>

<template>
    <div v-if="bike">

        <div>
            <BackBtn path="/bikes" class="mb-10" />
            <form class="flex flex-col  gap-y-6" @submit.prevent="edit">
                <BaseGrid>
                    <BaseInput v-model="company" placeholder="Название Компании" />
                    <NuxtLinkLocale :to="`/bikes/${bikeId}/select-brand`" class="flex items-center h-12 justify-between relative after:w-full md:after:w-0.5 after:h-0.5
                after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                        <span class="text-lg" v-if="selectedBrand && selectedModel">
                            {{ selectedBrand }} {{ selectedModel }}
                        </span>
                        <span class="text-lg" v-else>
                            Марка, модель
                        </span>
                        <span>
                            <img class="-rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Arrow" />
                        </span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale :to="`/bikes/${bikeId}/select-type`"
                        class="flex items-center h-12 justify-between relative">
                        <span>
                            {{ selectedType || "Тип байка" }}
                        </span>
                        <span>
                            <img class="-rotate-90" src="~/assets/img/arrow-bottom.svg" alt="Arrow" />
                        </span>
                    </NuxtLinkLocale>
                </BaseGrid>

                <BaseGrid>
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
                </BaseGrid>


                <BaseGrid>
                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>Цена/сутки</span>
                        </p>
                        <BaseInput v-model="dailyRentalPrice" placeholder="Цена" type="number" />
                    </div>

                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>Цена/неделя</span>
                        </p>
                        <BaseInput v-model="weeklyRentalPrice" placeholder="Цена" type="number" />
                    </div>

                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>Цена/месяц</span>
                        </p>
                        <BaseInput v-model="monthlyRentalPrice" placeholder="Цена" type="number" />
                    </div>
                </BaseGrid>
                <BaseGrid>
                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>Цена/продажи</span>
                        </p>
                        <BaseInput v-model="salePrice" placeholder="Цена" type="number" />
                    </div>
                    <labeled-segmented-control label="Коробка передач" v-model="activeTransmission"
                        :options="transmissions.map((item) => item.label)" width-class="w-1/3" heightClass="h-12" />

                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>
                                Год выпуска
                            </span>
                        </p>
                        <BaseInput v-model="year" placeholder="Год выпуска" type="number" />
                    </div>
                </BaseGrid>
                <BaseGrid>

                    <div>
                        <p class="text-lg mb-2 inline-block">
                            <span>Объем двигателя</span>
                        </p>
                        <BaseInput v-model="engineVolume" placeholder="Объем двигателя" type="number" />
                    </div>
                </BaseGrid>
                <div class="space-y-4">

                    <label class="cursor-pointer px-4 py-2 bg-black text-white rounded-full inline-block">
                        + Добавить фото
                        <input type="file" multiple accept="image/*" class="hidden" @change="handleFiles" />
                    </label>


                    <div class="grid grid-cols-3">
                        <div v-for="(photo, index) in allPhotos" :key="photo.type + '-' + photo.value"
                            class="relative w-full h-full border overflow-hidden">

                            <img :src="getPreview(photo)" class="w-full h-full object-cover" />

                            <!-- ❌ удалить -->
                            <button type="button" @click="removePhoto(photo)"
                                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                ×
                            </button>

                            <!-- ⭐ главное -->
                            <span v-if="isMainPhoto(photo)"
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

                <div class="w-full flex items-center justify-center">
                    <button class="border cursor-pointer flex items-center justify-center w-48  rounded-full px-5 h-14"
                        type="submit">
                        <span class="animate-spin" v-if="loading">
                            <img src="~/assets/img/progress-black.svg" alt="Loader">
                        </span>
                        <span v-else>
                            Редактировать
                        </span>
                    </button>
                </div>

            </form>

        </div>
    </div>
</template>

<style scoped lang="css"></style>