export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return;
  }

  if (to.path === "/cart" || /^\/product\/[^/]+\/?$/.test(to.path)) {
    return;
  }
  const token = localStorage.getItem("auth-token");

  if (!token) {
    nextTick(() => {
      const loginModal = useState("loginModal");
      loginModal.value = true;
    });

    return navigateTo("/");
  }
});
