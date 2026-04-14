<script setup lang="ts">
import Error from '~/error.vue';
const {
    profile,
    error,
    pending,
    loading,

    phone,
    whats,
    telegram,

    preview,
    fileName,

    handleFileChange,
    edit,
    isChanged,
} = useProfile()
</script>

<template>
    <div class="flex flex-col h-full w-full lg:flex-row gap-x-10">
        <template v-if="profile">

            <div class="w-full">
                <div class="flex w-full flex-col sm:flex-row gap-x-5 md:gap-x-10">
                    <ProfileFileUpload class="flex-1" :handle-file-change="handleFileChange" :file-name="fileName"
                        :profile-logo="profile.logo" :preview="preview" />
                    <ProfileForm class="flex-1" v-model:phone="phone" v-model:whats="whats"
                        v-model:telegram="telegram" />
                </div>
                <ProfileSaveBtn v-if="isChanged" :edit="edit" :loading="loading" />
            </div>
        </template>
        <template v-if="pending">
            <div class="flex items-center gap-y-5 flex-col justify-center w-full h-full">
                <img class="animate-spin" src="~/assets/img/progress-black.svg" alt="Loading">
            </div>
        </template>
        <template v-else-if="error">
            <Error :error="error" />
        </template>
    </div>
</template>

<style scoped lang="css"></style>