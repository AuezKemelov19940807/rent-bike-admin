<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'
const props = defineProps<{
    isBusy: boolean
    modelValue: CalendarDate | null

}>()




const df = new DateFormatter('en-US', {
    dateStyle: "medium"
})


const emit = defineEmits<{
    (e: 'update:modelValue', value: CalendarDate | null): void
}>()


const onChange = (val: DateValue | DateValue[] | { start?: DateValue, end?: DateValue } | null | undefined) => {
    // если нет даты или выбран range / массив → null
    if (!val || Array.isArray(val) || ('start' in val && 'end' in val)) {
        emit('update:modelValue', null)
        return
    }

    // одиночная дата
    emit('update:modelValue', val as CalendarDate)
}




</script>

<template>
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
                        <UCalendar :model-value="modelValue" @update:model-value="onChange" size="xs" color="info"
                            class="p-2" />
                    </template>
                </UPopover>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css"></style>