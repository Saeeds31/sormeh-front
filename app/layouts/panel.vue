<!-- app/layouts/panel.vue -->
<!-- <template>
  <div>
    <SharedLoadingOverlay
      :show="loadingStore.isGlobalLoading"
      :message="loadingStore.loadingMessage"
    />

    <div class="hidden lg:block">
      <SharedHeader />
    </div>

    <div
      class="container mx-auto my-4 grid grid-cols-1 gap-6 lg:my-10 lg:grid-cols-4"
    >
      <aside class="hidden lg:block lg:col-span-1">
        <PanelUserSidebar />
      </aside>

      <main class="min-w-0 space-y-6 lg:col-span-3">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 bg-white overflow-y-auto lg:hidden p-4 flex flex-col"
        >
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <span class="font-bold text-lg">حساب کاربری</span>
            <button
              type="button"
              class="p-2 text-gray-500 hover:text-black"
              @click="isMobileMenuOpen = false"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
          <PanelUserSidebar @navigate="isMobileMenuOpen = false" />
        </div>

        <div
          v-if="isMobileSubPage"
          class="lg:hidden flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-4 shadow-sm"
        >
          <button
            type="button"
            class="flex items-center gap-2 text-sm font-medium text-gray-700"
            @click="openMobileMenu"
          >
            <svg
              class="w-5 h-5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>بازگشت به حساب کاربری</span>
          </button>
        </div>

        <slot />
      </main>
    </div>

    <div class="h-24 lg:hidden" aria-hidden="true"></div>

    <div class="hidden lg:block">
      <SharedFooter />
    </div>

    <SharedMobileBottomNav
      class="lg:hidden"
      @open-profile-menu="openMobileMenu"
    />

    <AuthLoginModal />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useLoadingStore } from "~/store/loading";

const route = useRoute();
const loadingStore = useLoadingStore();

const isMobileMenuOpen = ref(false);

const isMobileSubPage = computed(() => {
  return route.path.startsWith("/panel/") && route.path !== "/panel";
});

const openMobileMenu = () => {
  isMobileMenuOpen.value = true;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
  },
);
</script> -->

<!-- app/layouts/panel.vue -->
<template>
  <div>
    <SharedLoadingOverlay
      :show="loadingStore.isGlobalLoading"
      :message="loadingStore.loadingMessage"
    />

    <div class="hidden lg:block">
      <SharedHeader />
    </div>

    <div
      class="container mx-auto my-4 grid grid-cols-1 gap-6 lg:my-10 lg:grid-cols-4"
    >
      <aside class="hidden lg:block lg:col-span-1">
        <PanelUserSidebar />
      </aside>

      <main class="min-w-0 space-y-6 lg:col-span-3">
        <div
          dir="rtl"
          class="grid min-h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center border-b border-gray-200 bg-white md:px-2 lg:hidden"
        >
          <button
            type="button"
            aria-label="بازگشت به منوی حساب کاربری"
            class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4b3073]"
            @click="openMobileMenu"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>

          <p class="truncate text-center text-sm font-semibold text-[#222222]">
            {{ mobilePageTitle }}
          </p>
        </div>

        <slot />
      </main>
    </div>

    <div class="h-24 lg:hidden" aria-hidden="true"></div>

    <div class="hidden lg:block">
      <SharedFooter />
    </div>

    <SharedMobileNavigation
      v-if="!isAnyModalOpen"
      ref="mobileNavigation"
      panel
    />

    <AuthLoginModal />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLoadingStore } from "~/store/loading";

const route = useRoute();
const loadingStore = useLoadingStore();
const mobileNavigation = ref(null);

const { isAnyModalOpen, closeModal } = usePanelModal();
watch(
  () => route.fullPath,
  () => {
    closeModal();
  },
);
const mobilePageTitles = {
  "/panel": "اطلاعات حساب کاربری",
  "/panel/orders": "سفارش‌های من",
  "/panel/sormeh": "سرمه کلاب",
  "/panel/wallet": "تراکنش‌های کیف پول",
  "/panel/addresses": "لیست آدرس‌ها",
  "/panel/favorites": "علاقه‌مندی‌ها",
};
const normalizedPath = computed(() => route.path.replace(/\/+$/, "") || "/");

const isPanelHome = computed(() => normalizedPath.value === "/panel");

const isPanelInternalPage = computed(() =>
  normalizedPath.value.startsWith("/panel/"),
);

const mobilePageTitle = computed(() => {
  const path = route.path.replace(/\/+$/, "");
  const sectionPath = path.split("/").slice(0, 3).join("/");

  return mobilePageTitles[sectionPath] ?? "حساب کاربری";
});

function openMobileMenu() {
  mobileNavigation.value?.open();
}
</script>
