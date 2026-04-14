<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { register, loading, errorMessage } = useAuth()
</script>

<template>
    <AuthForm mode="register" :onSubmit="register" :loading="loading" :errorMessage="errorMessage" />
</template>