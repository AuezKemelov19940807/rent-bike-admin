<script setup lang="ts">
const props = defineProps<{
    label: string
    options: string[]
    modelValue: string
    widthClass: 'w-1/2' | 'w-1/3'
    heightClass?: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const activeIndex = computed(() => props.options.indexOf(props.modelValue))

const selectOption = (option: string) => {
    emit('update:modelValue', option)
}
</script>

<template>
    <div class="flex flex-col">
        <span class="text-lg mb-2 block">{{ label }}</span>

        <div :class="heightClass" class="relative border border-gray rounded-full flex overflow-hidden">
            <!-- toggle switch -->
            <span class="absolute top-0 left-0 h-full bg-black rounded-full transition-transform duration-300 ease-out"
                :class="widthClass" :style="{ transform: `translateX(${activeIndex * 100}%)` }" />

            <!-- buttons -->
            <button v-for="option in options" :key="option" @click="selectOption(option)"
                class="relative z-10 cursor-pointer text-sm 2xl:text-base text-center transition-colors duration-300"
                :class="[widthClass, modelValue === option ? 'text-white' : 'text-black']">
                {{ option }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
