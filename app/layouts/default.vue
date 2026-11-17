<!-- <template>
  <div>
    <SharedLoadingOverlay
      :show="loadingStore.isGlobalLoading"
      :message="loadingStore.loadingMessage"
    />

    <SharedHeader />
    <main>
      <slot />
    </main>

    <CartSidebar
      :show="showCartSidebar"
      :cart-items="cartItems"
      @close="closeSidebar"
      @open="openSidebar"
      @cart-updated="loadCartData"
    />
    <div :class="{ 'hidden md:block': isProductPage }">
      <sharedFooter />
    </div>
    <SharedMobileBottomNav v-if="!isProductPage" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useLoadingStore } from "~/store/loading";
import { useCategoryStore } from "~/store/menu";
import { storeToRefs } from "pinia";
import { useApi } from "@/composables/api/useApi";

const loadingStore = useLoadingStore();
const categoryStore = useCategoryStore();

const showCartSidebar = ref(false);
const cartItems = ref([]);

const openSidebar = () => {
  showCartSidebar.value = true;
};
const closeSidebar = () => {
  showCartSidebar.value = false;
};

const loadCartData = async () => {
  if (!process.client) return;

  const token = localStorage.getItem("auth-token");

  if (token) {
    try {
      const { getCart } = useApi();
      const response = await getCart();
      cartItems.value = response.items || [];
    } catch (err) {
      console.error("❌ Error loading cart (API):", err);
      cartItems.value = [];
    }
  } else {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      try {
        const cartData = JSON.parse(guestCart);
        cartItems.value = cartData.items || [];
      } catch (err) {
        console.error("❌ Error loading cart (localStorage):", err);
        cartItems.value = [];
      }
    } else {
      cartItems.value = [];
    }
  }
};

onMounted(() => {
  loadCartData();

  if (typeof window !== "undefined") {
    // هم برای همگام‌سازی داده‌ها و هم برای باز کردن سایدبار
    window.addEventListener("storage", loadCartData);
    window.addEventListener("cart-updated", loadCartData);
    window.addEventListener("open-cart-sidebar", openSidebar);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("storage", loadCartData);
    window.removeEventListener("cart-updated", loadCartData);
    window.removeEventListener("open-cart-sidebar", openSidebar);
  }
});

try {
  await categoryStore.fetchMenuData();
} catch (error) {
  console.error(
    "Critical: Failed to pre-fetch menu data in default layout.",
    error,
  );
}
</script> -->

<!-- /app/layouts/default.vue -->
<template>
  <div>
    <SharedLoadingOverlay
      :show="loadingStore.isGlobalLoading"
      :message="loadingStore.loadingMessage"
    />

    <!-- هدر با قابلیت تشخیص صفحه محصول یا صفحات خرید -->
    <SharedHeader
      :product-mode="isProductPage"
      :checkout-mode="isCheckoutPage"
    />

    <main>
      <slot />
    </main>

    <CartSidebar
      :show="showCartSidebar"
      :cart-items="cartItems"
      @close="closeSidebar"
      @open="openSidebar"
      @cart-updated="loadCartData"
    />

    <!-- فوتر در موبایلِ صفحات محصول و فرایند خرید مخفی می‌شود -->
    <div
      :class="{
        'hidden md:block': isProductPage || isCheckoutPage || isCategoryPage,
      }"
    >
      <SharedFooter />
    </div>

    <!-- نوبار پایین موبایل در صفحات محصول و فرایند خرید حذف می‌شود -->
    <SharedMobileBottomNav v-if="!isProductPage && !isCheckoutPage" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useLoadingStore } from "~/store/loading";
import { useCategoryStore } from "~/store/menu";
import { useApi } from "@/composables/api/useApi";

const route = useRoute();
const loadingStore = useLoadingStore();
const categoryStore = useCategoryStore();

// تشخیص صفحه محصول
const isProductPage = computed(() => /^\/product\//.test(route.path));

// تشخیص صفحات سبد خرید و مراحل تسویه‌حساب
const isCheckoutPage = computed(() =>
  ["/cart", "/shipping", "/payment"].some((path) =>
    route.path.startsWith(path),
  ),
);

const isCategoryPage = computed(() => route.path === "/categories");

const showCartSidebar = ref(false);
const cartItems = ref([]);

const openSidebar = () => {
  showCartSidebar.value = true;
};
const closeSidebar = () => {
  showCartSidebar.value = false;
};

const loadCartData = async () => {
  if (!process.client) return;
  const token = localStorage.getItem("auth-token");
  const { getCart } = useApi();
  try {
    if (token) {
      const response = await getCart();
      cartItems.value = response.items || [];
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "{}");
      cartItems.value = guestCart.items || [];
    }
  } catch (err) {
    cartItems.value = [];
  }
};

onMounted(() => {
  loadCartData();
  window.addEventListener("cart-updated", loadCartData);
  window.addEventListener("open-cart-sidebar", openSidebar);
});

onBeforeUnmount(() => {
  window.removeEventListener("cart-updated", loadCartData);
  window.removeEventListener("open-cart-sidebar", openSidebar);
});

try {
  await categoryStore.fetchMenuData();
} catch (error) {
  console.error("Menu fetch error", error);
}
</script>
