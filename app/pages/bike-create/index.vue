<script setup lang="ts">
import type { IBrandProps } from '~/utils/types/brand';
import type { ITypeProps } from '~/utils/types/type';

const config = useRuntimeConfig();
const { data: brands, error } = await useFetch<IBrandProps[]>("/bikes/catalog", {
    baseURL: config.public.apiBase,
});

const { data: types, error: typeError } = await useFetch<ITypeProps[]>("/bikes/types", {
    baseURL: config.public.apiBase,
});
</script>

<template>
    <div>
        <BackBtn path="/bikes" />
        <div class="pt-6" v-if="brands && types">
            <AddMotorcycleForm :brands="brands" :types="types" />
        </div>
    </div>
</template>

<style scoped lang="css"></style>