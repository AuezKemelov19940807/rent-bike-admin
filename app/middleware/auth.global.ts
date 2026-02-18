export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    if (to.path === "/login") return;

    const token = localStorage.getItem("token"); // ✅ исправили

    if (!token) {
      return navigateTo("/login");
    }
  }
});
