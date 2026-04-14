<script setup lang="ts">


const props = defineProps<{
    bikeId: string
    loading: boolean
    selectedBrand: string | null
}>()

const model = defineModel<string>()
const emit = defineEmits(['submit'])

const onSubmit = () => {
    emit('submit', {
        company: model.value
    })
}

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
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const modelValue = shallowRef<CalendarDate | null>(null)

const df = new DateFormatter('en-US', {
    dateStyle: "medium"
})

</script>

<template>
    <div>
        <BackBtn path="/bikes" class="mb-10" />
        <form class="flex flex-col  gap-y-6" @submit.prevent="onSubmit">
            <BaseGrid>
                <BaseInput v-model="model" placeholder="Название Компании" />
                <BikeBrandSelector :bike-id="bikeId" :selected-brand="selectedBrand" />
                <BikeTypeSelector :bike-id="bikeId" />
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
                                <UButton :class="{ 'text-gray-300': !isBusy }" class="cursor-pointer " color="neutral"
                                    icon="i-lucide-calendar" :disabled="!isBusy">
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
            <div class="w-full flex items-center justify-center">
                <button class="border cursor-pointer flex items-center justify-center  rounded-full w-30 h-14"
                    type="submit">
                    <span class="animate-spin" v-if="loading">
                        <img src="~/assets/img/progress-black.svg" alt="Loader">
                    </span>
                    <span v-else>
                        Сохранить
                    </span>
                </button>
            </div>

        </form>

    </div>
</template>

<style scoped lang="css"></style>