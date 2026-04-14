<script setup lang="ts">

const props = defineProps<{
    mode: 'login' | 'register',
    onSubmit: (email: string, password: string) => void,
    loading: boolean,
    errorMessage: string
}>()
// Email
const email = ref<string>('')
// Password
const password = ref<string>('')
// Show Password
const showPassword = ref<boolean>(false)
// Toggle Show Password
const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
}
// Submit Form
const submit = () => {
    props.onSubmit(email.value, password.value)
}
</script>

<template>
    <form class="border w-full p-5 rounded-lg" @submit.prevent="submit">
        <!-- Header -->
        <AuthFormHeader :title="mode === 'register' ? 'Registration' : 'Login'" />
        <div class="w-full">
            <div class="flex flex-col gap-y-10">
                <!-- Email -->
                <AuthLabel title="Email">
                    <input class="border rounded-lg px-4 py-3 outline-none border-black" type="email"
                        placeholder="email" required v-model="email">
                </AuthLabel>
                <!-- Password -->
                <AuthLabel title="Password">
                    <div class="relative">
                        <input class="border rounded-lg px-4 py-3 outline-none w-full border-black" v-model="password"
                            :type="showPassword ? 'text' : 'password'" placeholder="password"
                            autocomplete="new-password" autocorrect="off" spellcheck="false" required>
                        <PasswordEye v-if="password" :toggle-show-password="toggleShowPassword"
                            :show-password="showPassword" />
                    </div>
                </AuthLabel>
            </div>
            <div class="mt-10 text-center">
                <template v-if="mode === 'register'">
                    Already have an account?
                    <NuxtLink to="/login" class="text-green-600 font-medium underline">
                        Log In
                    </NuxtLink>
                </template>

                <template v-else>
                    Don't have an account?
                    <NuxtLink to="/register" class="text-green-600 font-medium underline">
                        Register
                    </NuxtLink>
                </template>
            </div>

            <div class="mt-10">
                <!-- Button Submit -->
                <AuthButton :loading="loading" :mode="mode" />
            </div>

        </div>
    </form>
</template>