<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login, loading, errorMessage } = useAuth()
</script>

<template>
    <AuthForm mode="login" :onSubmit="login" :loading="loading" :errorMessage="errorMessage" />
</template>

<style scoped lang="css"></style>