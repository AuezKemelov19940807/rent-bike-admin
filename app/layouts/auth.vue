<template>
    <div class="min-h-screen flex flex-col">
        <NuxtLoadingIndicator />

        <div class="flex-1 flex items-center justify-center">
            <div class="fixed max-w-md w-full p-4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <slot />
            </div>
        </div>
    </div>
</template>