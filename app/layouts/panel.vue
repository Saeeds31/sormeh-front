<!-- app/layouts/panel.vue -->
<template>
  <div>
    <SharedLoadingOverlay
      :show="loadingStore.isGlobalLoading"
      :message="loadingStore.loadingMessage"
    />

    <SharedHeader />

    <div
      class="container mx-auto my-4 grid grid-cols-1 gap-6 lg:my-10 lg:grid-cols-4"
    >
      <!-- منوی کناری فقط در دسکتاپ -->
      <aside class="hidden lg:block lg:col-span-1">
        <PanelUserSidebar />
      </aside>

      <!-- محتوای صفحه فقط یک‌بار رندر می‌شود -->
      <main class="min-w-0 space-y-6 lg:col-span-3">
        <slot />
      </main>
    </div>

    <!-- در داشبورد موبایل، فضای انتهایی برای نوبار ثابت -->
    <div class="h-24 lg:hidden" aria-hidden="true"></div>

    <div class="hidden lg:block">
      <SharedFooter />
    </div>

    <SharedMobileBottomNav class="lg:hidden" />

    <AuthLoginModal />
  </div>
</template>

<script setup>
import { useLoadingStore } from "~/store/loading";

const loadingStore = useLoadingStore();
</script>
