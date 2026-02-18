<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()
const props = defineProps<{
    totalPages: number;
    currentPage: number;
}>()


const emit = defineEmits<{
    (e: 'page-changed', page: number): void
}>()

const pagination = computed(() => {
    const pages: (number | 'dots')[] = []
    const total = props.totalPages
    const current = props.currentPage

    // если страниц ≤ 4 — показываем все
    if (total <= 4) {
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
        return pages
    }


    let start = Math.max(1, current - 1)
    let end = start + 2


    if (end >= total) {
        end = total
        start = total - 2
    }


    for (let i = start; i <= end; i++) {
        pages.push(i)
    }


    if (end < total - 1) {
        pages.push('dots')
    }

    if (end < total) {
        pages.push(total)
    }

    return pages
})
const { scrollToAnchor } = useAnchorScroll()

const changePage = (page: number) => {
    emit('page-changed', page)
    if (width.value < 768) {
        scrollToAnchor('catalog')
    }


}

</script>

<template>
    <div class="flex items-center justify-center mt-12">
        <div class="flex items-center gap-x-2">
            <template v-for="(item, index) in pagination" :key="index">
                <span v-if="item === 'dots'" class="w-2 h-2 bg-black rounded-full"></span>
                <span v-else @click="changePage(item)"
                    class="flex select-none text-lg font-semibold items-center justify-center w-8 h-8 rounded-full border cursor-pointer transition-colors"
                    :class="item === currentPage
                        ? 'bg-black text-white border-black'
                        : 'border-black hover:bg-black hover:text-white'">
                    {{ item }}
                </span>
            </template>
        </div>
    </div>
</template>

<style scoped lang="css"></style>