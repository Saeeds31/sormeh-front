<template>
  <Teleport to="#teleports">
    <div
      :class="[
        panel ? 'lg:hidden' : 'md:hidden',
        { 'fixed inset-0 z-[45] isolate': isOpen },
      ]"
    >
      <section
        v-if="isOpen"
        id="mobile-profile-menu"
        dir="rtl"
        aria-labelledby="mobile-profile-menu-title"
        class="profile-menu absolute inset-0 overflow-y-auto overscroll-contain bg-white p-4"
      >
        <div class="mb-4 flex items-center justify-between border-b pb-4">
          <h2 id="mobile-profile-menu-title" class="text-lg font-bold">
            حساب کاربری
          </h2>

          <button
            ref="closeButton"
            type="button"
            aria-label="بستن منوی حساب کاربری"
            class="p-2 text-gray-500 hover:text-black"
            @click="dismiss"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <Suspense>
          <PanelUserSidebar mobile-menu @navigate="close" />
          <template #fallback>
            <p class="p-4 text-sm text-gray-500" role="status">
              در حال آماده‌سازی منو…
            </p>
          </template>
        </Suspense>
      </section>

      <SharedMobileBottomNav
        :panel="panel"
        :profile-menu-open="isOpen"
        @open-profile-menu="toggle"
        @navigate="close"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  panel: Boolean,
});

const router = useRouter();
const isOpen = ref(false);
const closeButton = ref(null);

let desktopQuery;
let removeRouteHook;
let restoreScroll;
let opener;

function lockScroll() {
  if (restoreScroll) return;

  const root = document.documentElement;
  const body = document.body;
  const x = window.scrollX;
  const y = window.scrollY;
  const rootOverflow = root.style.overflow;

  const previous = {
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    width: body.style.width,
    overflow: body.style.overflow,
  };

  root.style.overflow = "hidden";
  Object.assign(body.style, {
    position: "fixed",
    top: `${-y}px`,
    left: `${-x}px`,
    width: "100%",
    overflow: "hidden",
  });

  restoreScroll = () => {
    Object.assign(body.style, previous);
    root.style.overflow = rootOverflow;
    window.scrollTo({ left: x, top: y, behavior: "instant" });
  };
}

function unlockScroll() {
  const restore = restoreScroll;
  restoreScroll = undefined;
  restore?.();
}

async function open() {
  if (!desktopQuery || desktopQuery.matches || isOpen.value) return;

  opener = document.activeElement;
  isOpen.value = true;

  await nextTick();
  if (isOpen.value) closeButton.value?.focus({ preventScroll: true });
}

function close() {
  isOpen.value = false;
  opener = undefined;
}

function dismiss() {
  const button = opener;
  close();
  button?.focus?.({ preventScroll: true });
}

function toggle() {
  if (isOpen.value) dismiss();
  else open();
}

function handleBreakpointChange(event) {
  if (event.matches) close();
}

function handleKeydown(event) {
  if (isOpen.value && event.key === "Escape") {
    event.preventDefault();
    dismiss();
  }
}

watch(
  isOpen,
  (value) => {
    if (value) lockScroll();
    else unlockScroll();
  },
  { flush: "sync" },
);

onMounted(() => {
  desktopQuery = window.matchMedia(
    props.panel ? "(min-width: 64rem)" : "(min-width: 48rem)",
  );

  desktopQuery.addEventListener("change", handleBreakpointChange);
  window.addEventListener("keydown", handleKeydown);

  removeRouteHook = router.afterEach((to, from, failure) => {
    if (!failure && to.fullPath !== from.fullPath) close();
  });
});

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener("change", handleBreakpointChange);
  window.removeEventListener("keydown", handleKeydown);
  removeRouteHook?.();
  unlockScroll();
});

defineExpose({ open });
</script>

<style scoped>
.profile-menu {
  /* ۷۰px ارتفاع نوبار + ۱۶px فاصله، علاوه بر فاصلهٔ نوبار از پایین */
  padding-bottom: calc(86px + max(12px, env(safe-area-inset-bottom, 0px)));
}
</style>
