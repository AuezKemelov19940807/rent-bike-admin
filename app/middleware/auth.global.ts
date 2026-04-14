// export default defineNuxtRouteMiddleware((to) => {
//   if (to.path === "/login" || to.path === "/register") return;

//   const token = useCookie("auth_token");

//   if (!token.value) {
//     abortNavigation();
//     return navigateTo("/login");
//   }
// });

export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ["/login", "/register"];

  if (publicPages.includes(to.path)) return;

  const token = useCookie("auth_token");

  if (!token.value) {
    return navigateTo("/login");
  }
});
