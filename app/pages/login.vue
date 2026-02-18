<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const email = ref('')
const password = ref('')

const router = useRouter()
const token = useCookie('token')


const login = () => {
    // простой временный логин
    if (email.value.trim() === 'admin@mail.com' && password.value.trim() === '123456') {
        // сохраняем токен в куки
        token.value = 'fake-jwt'

        // перенаправляем на главную
        router.push('/')
    } else {
        alert('Неверный логин или пароль')
    }
}

</script>

<template>
    <div class="border fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-5 mx-2 rounded-lg">
        <form class="" @submit.prevent="login">
            <NuxtLink class="flex items-center  mb-5 justify-center">
                <span>
                    <img src="~/assets/img/logo.svg" alt="">
                </span>
            </NuxtLink>
            <div class="flex flex-col gap-y-10">
                <label class="flex flex-col gap-y-2" for="">
                    <span class="text-lg  font-semibold">Login</span>
                    <input class="border rounded-lg px-4 py-3" type="email" v-model="email">
                </label>
                <label class="flex flex-col gap-y-2" for="">
                    <span class="text-lg font-semibold ">Password</span>
                    <input class="border rounded-lg px-4 py-3" type="password" v-model="password">

                </label>
                <button
                    class="border rounded-lg cursor-pointer px-4 py-3 bg-white group hover:bg-black transition-all duration-300"
                    type="submit">
                    <span class="text-lg font-semibold  text-black group-hover:text-white ">
                        Войти
                    </span>
                </button>
            </div>

        </form>
    </div>
</template>

<style scoped lang="css"></style>