<script setup lang="ts">
const preview = ref<string | null>(null)
const fileName = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const displayName = computed(() => fileName.value || 'Выберите файл')

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        preview.value = URL.createObjectURL(file)
        fileName.value = file.name
    }
}

const clearFile = () => {
    preview.value = null
    fileName.value = null

    if (fileInput.value) {
        fileInput.value.value = '' // сброс input
    }
}
</script>

<template>
    <div class="flex flex-col w-full lg:flex-row  gap-x-10">
        <div class="flex flex-col gap-y-2 max-w-65 mb-6 w-full relative">
            <h4 class="text-lg font-semibold">Логотип</h4>

            <!-- Скрытый input -->
            <input id="logoUpload" ref="fileInput" class="hidden" type="file" accept="image/*"
                @change="handleFileChange" />

            <!-- Label-триггер с текстом -->
            <label for="logoUpload"
                class="border border-gray-300 py-2.5 px-4 rounded-lg cursor-pointer flex items-center justify-between overflow-hidden">
                <span class="text-gray-700 truncate flex-1">{{ displayName }}</span>
            </label>

            <!-- Кнопка удаления (вне label, чтобы не срабатывало открытие файла) -->
            <button v-if="preview" type="button"
                class="absolute right-1 top-12 w-5 h-5 flex items-center justify-center cursor-pointer z-10"
                @click="clearFile">
                <img src="~/assets/img/close.svg" alt="Delete" class="w-4 h-4" />
            </button>

            <!-- Превью картинки -->
            <div v-if="preview" class="flex items-center justify-center mt-2">
                <img class="max-w-65 max-h-65 rounded" :src="preview" alt="Profile Logo" />
            </div>
        </div>


        <div class="w-full flex flex-col gap-y-6">
            <label class="flex flex-col gap-y-2 w-full" for="Description">
                <span class="text-lg font-semibold">
                    Описание
                </span>
                <textarea class="w-full border h-30 resize-none border-gray-300 py-2.5 px-4 rounded-lg" type="text"
                    placeholder="Описание" />
            </label>
            <label class="flex flex-col gap-y-2 w-full" for="Phone">
                <span class="text-lg font-semibold">
                    Телефон
                </span>
                <input class="w-full border border-gray-300 py-2.5 px-4 rounded-lg" type="text"
                    placeholder="+ 7 747 7777 777" />
            </label>
            <label class="flex flex-col gap-y-2 w-full" for="WhatsApp">
                <span class="text-lg font-semibold">
                    WhatsApp
                </span>
                <input class="w-full border border-gray-300 py-2.5 px-4 rounded-lg" type="text"
                    placeholder="https://wa.me/username" />
            </label>
            <label class="flex flex-col gap-y-2 w-full" for="Telegram">
                <span class="text-lg font-semibold">
                    Telegram
                </span>
                <input class="w-full border border-gray-300 py-2.5 px-4 rounded-lg" type="text"
                    placeholder="https://t.me/username" />
            </label>
        </div>

    </div>
</template>

<style scoped lang="css"></style>