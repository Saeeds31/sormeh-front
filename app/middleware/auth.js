// export default defineNuxtRouteMiddleware((to) => {
//   if (process.server) {
//     return;
//   }

//   if (to.path === "/cart" || /^\/product\/[^/]+\/?$/.test(to.path)) {
//     return;
//   }
//   const token = localStorage.getItem("auth-token");

//   if (!token) {
//     nextTick(() => {
//       const loginModal = useState("loginModal");
//       loginModal.value = true;
//     });

//     return navigateTo("/");
//   }
// });

// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  if (to.path === "/cart" || /^\/product\/[^/]+\/?$/.test(to.path)) {
    return;
  }

  const token = localStorage.getItem("auth-token");

  if (!token) {
    // باز کردن مودال ورود
    const loginModal = useState("loginModal", () => false);
    loginModal.value = true;

    // متوقف کردن ورود به صفحه و هدایت سریع به صفحه اصلی
    return navigateTo("/", { replace: true });
  }
});
