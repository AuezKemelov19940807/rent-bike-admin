<script lang="ts" setup>
import type { Bike } from '~/utils/types/bike';
import type { IBrandProps } from '~/utils/types/brand';
import type { ITypeProps } from '~/utils/types/type';

const config = useRuntimeConfig();
const { data: brands } = await useFetch<IBrandProps[]>("/bikes/catalog", {
    baseURL: config.public.apiBase,
});

const { data: types } = await useFetch<ITypeProps[]>("/bikes/types", {
    baseURL: config.public.apiBase,
});


const { data: bikes, refresh } = await useFetch<Bike[]>("/bikes", {
    baseURL: config.public.apiBase,
    lazy: true,

});


const token = useCookie("auth_token");
const { request, loading } = useApi();

const deleteMotoWithID = async (id: number) => {
    const isConfirmed = confirm(`Вы действительно хотите удалить?`)
    if (!isConfirmed) return

    await request<any>({
        url: `bikes/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },

        success: {
            title: 'Bike Deleted!',
            message: `Мото успешно удалён.`,
        },

    });
    refresh()

}



// pagination
const perPage = 8
const currentPage = ref<number>(1)

// totalPages
const totalPages = computed(() =>
    Math.ceil(items.length / perPage)
)

// change page
const goToPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <div>
        <!-- Top  -->
        <div class="flex items-center justify-between relative">
            <AddBikeBtn />
            <Filter v-if="brands && types" :brands="brands" :types="types" />
        </div>
        <!-- Items -->


        <div class="pt-6" v-if="bikes">
            <Items :current-page="currentPage" :per-page="perPage" :bikes="bikes"
                :deleteMotoWithID="deleteMotoWithID" />
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="goToPage"
                v-if="bikes.length > 12" />
        </div>
    </div>
</template>

<style lang="css" scoped></style>