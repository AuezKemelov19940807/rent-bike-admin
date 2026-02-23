export default defineNuxtRouteMiddleware((to) => {
  // Пропускаем страницу логина
  if (to.path === "/login") return;

  // Берём токен из cookie
  const token = useCookie("token");

  // Если токена нет — редирект на логин
  if (!token.value) {
    return navigateTo("/login");
  }
});
