import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss() as any],
  },
  i18n: {
    defaultLocale: "en",

    locales: [
      { code: "ru", iso: "ru-RU", name: "Русский", file: "ru.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    langDir: "locales/",
  },
  modules: ["@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/ui", "nuxt-anchorscroll"],
});