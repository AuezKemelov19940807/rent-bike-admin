import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
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

  toast: {
    settings: {
      rtl: true, // Right-to-left support
      position: "topRight", // Default position
      timeout: 2000, // Default timeout
      closeOnEscape: true, // Close on ESC key
      closeOnClick: true, // Close on click
      pauseOnHover: true, // Pause on hover
      // ... and many more options
    },
  },

  modules: [
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/ui",
    "nuxt-anchorscroll",
    "nuxt-toast",
  ],
});
