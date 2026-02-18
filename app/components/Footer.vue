<script setup lang="ts">
import instagramIcon from '~/assets/img/instagram.svg'
import telegramkIcon from '~/assets/img/telegram.svg'
import whatsappIcon from '~/assets/img/whatsapp.svg'
import loginIcon from '~/assets/img/login.svg'

const socialLinks = [
    { id: 1, href: 'https://www.instagram.com/', icon: instagramIcon, alt: 'Instagram' },
    { id: 2, href: 'https://web.telegram.org/', icon: telegramkIcon, alt: 'Telegram' },
    { id: 3, href: 'https://www.whatsapp.com/', icon: whatsappIcon, alt: 'WhatsApp' },
    { id: 4, href: '#', icon: loginIcon, alt: 'Login' },
];

</script>

<template>
    <footer class="pt-10 pb-6 border-t border-black ">
        <div class="container mx-auto px-5 lg:px-5 py-4">
            <div class="flex flex-col sm:flex-row gap-y-4 items-center justify-between">
                <Logo />
                <div class="flex flex-col items-center justify-center sm:items-start sm:justify-start gap-y-4">
                    <div class="flex items-center gap-x-2">
                        <span class="w-4 h-4 flex items-center justify-center">
                            <img src="~/assets/img/mail.svg" alt="Mail">
                        </span>
                        <a class="text-lg" href="mailto:CompanyBike@mail.com">CompanyBike@mail.com</a>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <span class="w-4 h-4 flex items-center justify-center">
                            <img src="~/assets/img/phone.svg" alt="Phone">
                        </span>
                        <a class="text-sm" href="tel:+77477777777">+7 747 7777 777</a>
                    </div>
                    <ul class="flex gap-x-4">
                        <li v-for="socialItem in socialLinks" :key="socialItem.id">
                            <a :href="socialItem.href" target="_blank" rel="noopener noreferrer">
                                <img :src="socialItem.icon" alt="Social Icon">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="text-center mt-4 sm:mt-0">© Company 2026</p>
        </div>
    </footer>
</template>

<style scoped lang="css"></style>