export default defineNuxtRouteMiddleware((to) => {
  // Пропускаем страницу логина
  if (to.path === "/login") return;

  // Берём токен из cookie
  const token = useCookie("token").value;

  // Если токена нет — редирект на логин
  if (!token) {
    return navigateTo("/login");
  }
});
