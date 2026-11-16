<!-- app/pages/product/[id].vue -->
<script setup>
import { useApi } from "@/composables/api/useApi";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useProductStore } from "~/store/product.js";
const route = useRoute();
const { getProduct, getWishlist } = useApi();
const productId = computed(() => route.params.id);
const productStore = useProductStore();
const wishlistData = ref(null);
const commentsData = ref(null);
const buyBoxRef = ref(null);
const handleMiddleWishlistClick = () => {
  buyBoxRef.value?.toggleWishlist();
};
const {
  data: productData,
  error: productError,
  refresh,
} = useAsyncData(
  () => `product-detail-${productId.value}`,
  async () => {
    const id = productId.value;
    if (!id) return null;
    if (productStore.product[id]) return productStore.product[id];
    const res = await getProduct(id);
    productStore.product[id] = res.data;
    return res;
  },
  {
    watch: [() => productId.value],
    immediate: true,
    dedupe: "defer",
  },
);

const productPayload = computed(
  () => productStore.product[productId.value] ?? {},
);
const productCore = computed(() => productPayload.value.product ?? {});
const specifications = computed(
  () => productPayload.value.specifications ?? [],
);
const attributeOrder = computed(
  () => productPayload.value.attributes_order ?? [],
);
const attributes = computed(() => productPayload.value.attributes ?? []);
const attributeMap = computed(() => {
  return attributes.value.reduce((acc, attr) => {
    acc[attr.id] = attr;
    return acc;
  }, {});
});

const primaryAttribute = computed(
  () =>
    attributeMap.value[attributeOrder.value?.[0]] ??
    attributes.value?.[0] ??
    null,
);
const secondaryAttribute = computed(
  () =>
    attributeMap.value[attributeOrder.value?.[1]] ??
    attributes.value?.[1] ??
    null,
);

const attributeLabels = {
  1: "رنگ",
  2: "سایز",
};

const variantAttributes = computed(() => ({
  primary: primaryAttribute.value,
  secondary: secondaryAttribute.value,
  primaryLabel:
    attributeLabels[primaryAttribute.value?.id] ??
    (primaryAttribute.value ? primaryAttribute.value.title : "ویژگی ۱"),
  secondaryLabel:
    attributeLabels[secondaryAttribute.value?.id] ??
    (secondaryAttribute.value ? primaryAttribute.value.title : "ویژگی ۲"),
}));

const nestedMap = computed(() => productPayload.value.nested_map ?? {});
const variants = computed(() => productPayload.value.variants ?? []);

const refreshWishlist = async () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("auth-token");
  if (!token) return; // اگر لاگین نیست، اصلاً درخواست نزن

  try {
    const response = await getWishlist();
    wishlistData.value = response;
  } catch (error) {
    console.error("خطا در رفرش wishlist:", error);
  }
};

onMounted(() => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  if (token) {
    refreshWishlist();
  }
});

const selectedVariantId = ref(null);
const selectedQuantity = ref(1);
const selectedPrimaryId = ref(null);
const selectedSecondaryId = ref(null);

const showWeightError = ref(false);
const cartItems = ref([]);

const isInWishlist = computed(() => {
  const wishlistItems = wishlistData.value?.data || wishlistData.value?.items;

  if (!Array.isArray(wishlistItems)) {
    if (productData.value?.data?.wishlist !== undefined) {
      return Boolean(productData.value.data.wishlist);
    }

    return false;
  }

  const currentProductId = Number(productId.value);

  return wishlistItems.some((item) => {
    const wishlistProductId =
      item?.product_id ?? item?.product?.id ?? item?.product?.product_id;

    return Number(wishlistProductId) === currentProductId;
  });
});

const isCompletelyOutOfStock = computed(() => {
  const list = variants.value;
  if (!list?.length) return true;
  return !list.some(
    (variant) => variant.is_available === true && variant.stock > 0,
  );
});

const product = computed(() => {
  const core = productCore.value;
  if (!core?.id) return null;

  if (variants.value?.length === 1) {
    selectedVariantId.value = variants.value[0].id;
  }

  const images = [
    core.main_image,
    ...(core.images?.map((image) => image.path) ?? []),
  ].filter(Boolean);

  return {
    id: core.id,
    title: core.title,
    video: core.video,
    description: core.description,
    price: core.price,
    final_price: core.final_price,

    discount_start_at: core.discount_start_at ?? null,
    discount_end_at: core.discount_end_at ?? null,

    categories: Array.isArray(core.categories)
      ? core.categories
      : core.category
        ? [core.category]
        : [],

    inStock: !isCompletelyOutOfStock.value,
    images,
    thumbnails: images,
    attributes: attributes.value,
    variants: variants.value,
    nested_map: nestedMap.value,
  };
});

const currentPrice = computed(() => {
  if (!selectedVariantId.value || !product.value?.variants) {
    return product.value?.final_price || 0;
  }

  const selectedVariant = product.value.variants.find(
    (v) => v.id === selectedVariantId.value,
  );
  return selectedVariant?.final_price || product.value?.final_price || 0;
});

const oldPrice = computed(() => {
  if (!selectedVariantId.value || !product.value?.variants) {
    return product.value?.price || 0;
  }

  const selectedVariant = product.value.variants.find(
    (v) => v.id === selectedVariantId.value,
  );
  return selectedVariant?.price || product.value?.price || 0;
});

const handleQuantityChange = (quantity) => {
  selectedQuantity.value = quantity;
};

const handleWishlistUpdated = async () => {
  await refreshWishlist();
};

const handleShowWeightError = () => {
  showWeightError.value = true;
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
      console.error("❌ Error loading cart from API:", err);
      cartItems.value = [];
    }
  } else {
    const guestCart = localStorage.getItem("guest-cart");
    if (guestCart) {
      try {
        const cartData = JSON.parse(guestCart);
        cartItems.value = cartData.items || [];
      } catch (err) {
        console.error("❌ Error loading cart from localStorage:", err);
        cartItems.value = [];
      }
    } else {
      cartItems.value = [];
    }
  }
};

const handleCartUpdated = async () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("open-cart-sidebar"));
  }
};

watch(isInWishlist, (newValue) => {}, { immediate: true });
const activeVariant = computed(() => {
  const list = variants.value || [];
  if (!list.length) return null;

  // ۱. اگر کاربر تنوعی را انتخاب کرده
  if (selectedVariantId.value) {
    const found = list.find((v) => v.id === selectedVariantId.value);
    if (found) return found;
  }

  // ۲. اگر هنوز انتخاب نکرده، اولین تنوعی که تاریخ پایان تخفیف دارد
  const variantWithDiscount = list.find((v) => v.discount_end_at);
  if (variantWithDiscount) return variantWithDiscount;

  // ۳. در غیر این صورت اولین تنوع موجود
  return list[0];
});

const activeDiscountEndAt = computed(() => {
  return (
    activeVariant.value?.discount_end_at ||
    productCore.value?.discount_end_at ||
    product.value?.discount_end_at ||
    null
  );
});

const activeDiscountStartAt = computed(() => {
  return (
    activeVariant.value?.discount_start_at ||
    productCore.value?.discount_start_at ||
    product.value?.discount_start_at ||
    null
  );
});
</script>

<template>
  <main class="space-y-10 pb-32 md:pb-16 max-md:pt-3">
    <SharedBreadCrumb
      style="
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
      "
      class="container hidden md:block"
      :items="[
        { label: 'محصولات', href: '/products' },
        { label: product?.title || 'محصول', href: `/product/${productId}` },
      ]"
    />
    <div v-if="product" class="flex flex-col gap-10 lg:gap-14 mt-4 md:mt-12">
      <section
        class="container grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1.15fr)] lg:gap-[22px]"
      >
        <div class="min-w-0 h-full">
          <ProductImage
            :images="product.images"
            :video="product.video"
            :thumbnails="product.thumbnails"
          />
        </div>

        <div class="min-w-0 flex flex-col gap-5 h-full">
          <div id="info" class="space-y-6">
            <ProductTitle
              :title="product.title"
              :in-stock="product.inStock"
              :is-in-wishlist="isInWishlist"
              :discount-start-at="activeDiscountStartAt"
              :discount-end-at="activeDiscountEndAt"
              @toggle-wishlist="handleMiddleWishlistClick"
            />

            <ProductVariant
              v-model:selectedVariant="selectedVariantId"
              v-model:quantity="selectedQuantity"
              v-model:selectedPrimaryId="selectedPrimaryId"
              v-model:selectedSecondaryId="selectedSecondaryId"
              :primary-attribute="variantAttributes.primary"
              :secondary-attribute="variantAttributes.secondary"
              :primary-label="variantAttributes.primaryLabel"
              :secondary-label="variantAttributes.secondaryLabel"
              :nested-map="nestedMap"
              :variants="variants"
              :show-error="showWeightError"
            />
          </div>
        </div>

        <div class="min-w-0 h-full">
          <ProductBuy
            ref="buyBoxRef"
            v-model:quantity="selectedQuantity"
            :price="currentPrice"
            :old-price="oldPrice"
            :in-stock="product.inStock"
            :variant-id="selectedVariantId"
            :variants="variants"
            :quantity="selectedQuantity"
            :product-id="product.id"
            :product-title="product.title"
            :product-image="product.images[0]"
            :is-in-wishlist="isInWishlist"
            :categories="product.categories"
            @wishlist-updated="handleWishlistUpdated"
            @show-weight-error="handleShowWeightError"
            @cart-updated="handleCartUpdated"
          />
        </div>
      </section>

      <HomeFeatures />

      <ProductTabs
        class="mt-12 lg:mt-14"
        :specifications="specifications"
        :description="product.description"
        :productId="productId"
      />
    </div>

    <div v-else class="text-center py-16 container">
      <SharedLoadingSpinner size="xl" />
    </div>
  </main>
</template>
