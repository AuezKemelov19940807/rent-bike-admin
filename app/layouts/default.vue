<script setup lang="ts">
const sessionTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const modalSession = ref(false)
const token = useCookie("auth_token")

const { logOut } = useAuth()

// 🔹 Парсим JWT
function parseJwt(token?: string) {
    if (!token) return null

    const parts = token.split('.')

    if (parts.length < 2) return null

    const payload = parts[1]

    if (!payload) return null

    try {
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

// 🔹 Старт таймера по exp
function startSessionTimer() {
    if (!token.value) return

    const payload = parseJwt(token.value)
    if (!payload?.exp) return

    const now = Date.now()
    const expTime = payload.exp * 1000
    const timeout = expTime - now

    if (sessionTimer.value) {
        clearTimeout(sessionTimer.value)
    }

    if (timeout <= 0) {
        openModal()
        return
    }

    sessionTimer.value = setTimeout(() => {
        openModal()
    }, timeout)
}

// 🔹 Открыть модалку
function openModal() {
    modalSession.value = true
    document.body.classList.add('modal-open')
}

// 🔹 Закрыть модалку
function modalSessionClose() {
    modalSession.value = false
    document.body.classList.remove('modal-open')
}

// 🔹 Логаут
function handleAuth() {
    logOut()
    modalSession.value = false
    document.body.classList.remove('modal-open')
}

// 🔹 Блок действий вне модалки
function preventDefaultActions(event: Event) {
    const target = event.target as HTMLElement
    if (modalSession.value && target && !target.closest('.modalSessionClass')) {
        event.preventDefault()
        event.stopPropagation()
    }
}

onMounted(() => {
    // запускаем таймер по токену
    startSessionTimer()

    // блокируем действия
    document.addEventListener('click', preventDefaultActions, true)
    document.addEventListener('keydown', preventDefaultActions, true)
    document.addEventListener('scroll', preventDefaultActions, true)
})

onUnmounted(() => {
    if (sessionTimer.value) {
        clearTimeout(sessionTimer.value)
    }

    document.removeEventListener('click', preventDefaultActions, true)
    document.removeEventListener('keydown', preventDefaultActions, true)
    document.removeEventListener('scroll', preventDefaultActions, true)
})

</script>

<template>
    <div class="h-full flex flex-col">
        <NuxtLoadingIndicator />
        <Header />
        <main class="flex-1">
            <div class="container mx-auto px-4 lg:px-5 h-full">
                <div class="flex h-full">
                    <div
                        class="basis-1/3 hidden  lg:flex border-r border-gray-300 h-full pr-2 lg:px-6 pb-6 pt-6 flex-col">
                        <Sidebar />
                    </div>
                    <div class="lg:basis-2/3 w-full pt-6 lg:pl-10 pb-6">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>

    <!-- overlay -->
    <div v-if="token && modalSession" class="bg" />

    <!-- modal -->
    <div v-if="token && modalSession">
        <div class="modalSessionClass transition-all duration-300">
            <div class="rounded-md max-w-125 flex items-center justify-center bg-white p-6 rounded-12">
                <div class="flex flex-col gap-y-6 justify-center items-center h-full">

                    <p class="text-green-light text-xl font-bold text-center">
                        Время Вашей сессии завершилось...
                    </p>

                    <span class="max-w-30 max-h-30">
                        <img src="~/assets/img/session.svg" alt="" />
                    </span>

                    <p class="text-center text-xl text-gray-600">
                        Войдите снова, чтобы начать работать.
                    </p>

                    <button
                        class=" cursor-pointer py-4 rounded-12  border rounded-full bg-black text-white flex items-center justify-center w-75"
                        @click="handleAuth">
                        Войти
                    </button>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="css">
.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.2;
    z-index: 50;
    transition: all 0.3s ease;
}

.modalSessionClass {
    position: fixed;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    z-index: 51;
    overflow: hidden;
}
</style>