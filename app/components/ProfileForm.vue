<script setup lang="ts">
const props = defineProps<{
    phone: string;
    whats: string;
    telegram: string;
}>();

const emit = defineEmits([
    "update:phone",
    "update:whats",
    "update:telegram"
]);
</script>

<template>
    <div class="w-full flex flex-col gap-y-6">
        <label class="flex flex-col gap-y-2 w-full">
            <span class="text-lg font-semibold">Телефон</span>
            <input class="w-full border py-2.5 px-4 rounded-lg" type="tel" :value="phone"
                @input="emit('update:phone', ($event.target as HTMLInputElement).value)" </label>

            <label class="flex flex-col gap-y-2 w-full">
                <span class="text-lg font-semibold">WhatsApp</span>
                <input class="w-full border py-2.5 px-4 rounded-lg" type="text" :value="whats"
                    @input="emit('update:whats', ($event.target as HTMLInputElement).value)" </label>

                <label class="flex flex-col gap-y-2 w-full">
                    <span class="text-lg font-semibold">Telegram</span>
                    <input class="w-full border py-2.5 px-4 rounded-lg" type="text" :value="telegram"
                        @input="emit('update:telegram', ($event.target as HTMLInputElement).value)" </label>
    </div>
</template>