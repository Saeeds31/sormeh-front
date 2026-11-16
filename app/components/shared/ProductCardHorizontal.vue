<!-- components/shared/ProductCardHorizontal.vue -->
<template>
  <div
    class="min-w-0 bg-white border border-gray-200 rounded-2xl p-3 flex flex-col justify-between relative shadow-xs"
    dir="rtl"
  >
    <!-- لینک سراسری روی سطح کارت -->
    <NuxtLink
      :to="productLink"
      :aria-label="product.title || product.name || 'مشاهده محصول'"
      class="absolute inset-0 z-10 rounded-2xl"
    />

    <!-- ردیف بالا: عکس راست، دکمه علاقه‌مندی و عنوان چپ -->
    <div class="flex items-start justify-between gap-3">
      <!-- بج‌ها -->
      <div
        class="absolute top-6 right-0 flex flex-col gap-1 z-10 items-start pointer-events-none"
      >
        <span
          v-if="isNewProduct"
          class="bg-[#486332] text-white text-xs font-normal px-2 py-1 rounded-l-md leading-none"
        >
          جدید
        </span>

        <span
          v-if="isTrendProduct"
          class="bg-[#b3e655] text-gray-950 text-xs font-normal px-2 py-1 rounded-l-md leading-none"
        >
          ترند
        </span>

        <span
          v-if="hasDiscount && discountPercent > 0"
          class="bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-l-md leading-none"
        >
          ٪{{ formatPrice(discountPercent) }}
        </span>
      </div>
      <!-- باکس تصویر محصول -->
      <div
        class="w-40 sm:w-28 h-28 sm:h-28 shrink-0 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100"
      >
        <!-- نمایش تصویر دقیقاً مشابه اسلایدر دو ردیفه بدون ارجاع به فایل ناموجود -->
        <SharedAppImage
          v-if="productImageUrl"
          :src="productImageUrl"
          :alt="product.title || product.name || 'محصول'"
          format="webp"
          loading="lazy"
          class="w-full h-full"
          img-class="w-full h-full object-cover"
        />
      </div>

      <!-- عنوان و علاقه‌مندی -->
      <div class="flex-1 flex flex-col min-w-0">
        <div class="flex justify-end mb-2">
          <button
            type="button"
            class="relative z-20 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-xs transition-transform active:scale-90 cursor-pointer"
            :aria-label="
              isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'
            "
            @click.stop="handleFavorite"
          >
            <img
              :src="isFavorite ? '/icons/heart-red.svg' : '/icons/heart.svg'"
              alt=""
              class="w-4 h-4"
            />
          </button>
        </div>

        <span
          class="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-relaxed text-right hover:text-[#3F2356] transition-colors"
        >
          {{ product.title || product.name || "عنوان محصول" }}
        </span>
      </div>
    </div>

    <!-- ردیف پایین: قیمت و دکمه سبد خرید -->
    <div
      class="flex items-center justify-between gap-2 mt-3 bg-gray-100 p-2.5 rounded-lg"
    >
      <div class="flex flex-col items-start min-w-0">
        <template v-if="product.status !== 'unpublished' && !isOutOfStock">
          <span
            v-if="hasDiscount"
            class="text-sm text-gray-400 line-through leading-tight"
          >
            {{ formatPrice(originalPrice) }}
          </span>

          <span
            class="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap"
          >
            {{ formatPrice(finalPrice) }}
            <span class="text-xs font-normal text-gray-600">تومان</span>
          </span>
        </template>

        <span v-else class="text-sm font-bold text-red-600">ناموجود</span>
      </div>

      <!-- دکمه خرید -->
      <button
        v-if="purchaseMode === 'emit'"
        type="button"
        :disabled="isOutOfStock || adding"
        class="relative z-20 btn !text-sm !px-2 disabled:opacity-50"
        @click.stop="handleAddToCart"
      >
        {{ adding ? "..." : "افزودن به سبد خرید" }}
      </button>

      <span v-else class="btn !text-sm !px-2">مشاهده </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useWishlist } from "@/composables/useWishlist";
import { useAuth } from "@/composables/useAuth";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  purchaseMode: {
    type: String,
    default: "navigate",
  },
  favoriteMode: {
    type: String,
    default: "internal",
  },
});

const emit = defineEmits([
  "add-to-cart",
  "toggle-favorite",
  "favorite-removed",
]);

const adding = ref(false);
const { loginModal } = useAuth();
const { isInWishlist, toggleWishlist } = useWishlist();

const nuxtApp = useNuxtApp();
const $getImageUrl = nuxtApp?.$getImageUrl;

const productLink = computed(() => {
  return props.product?.id !== null && props.product?.id !== undefined
    ? `/product/${props.product.id}`
    : "#";
});

const productImageUrl = computed(() => {
  const p = props.product;
  if (!p) return "";

  const image =
    p.main_image || p.image || (Array.isArray(p.images) ? p.images[0] : null);

  if (!image) return "";

  if (
    typeof image === "string" &&
    (image.startsWith("http://") || image.startsWith("https://"))
  ) {
    return image;
  }

  if ($getImageUrl) {
    return $getImageUrl(image);
  }

  return typeof image === "string" ? `/storage/${image}` : "";
});

const originalPrice = computed(() => Number(props.product?.price || 0));

const finalPrice = computed(() => {
  return Number(
    props.product?.final_price ??
      props.product?.sale_price ??
      props.product?.price ??
      0,
  );
});

const hasDiscount = computed(() => {
  return originalPrice.value > finalPrice.value;
});

const discountPercent = computed(() => {
  const provided = Number(props.product?.real_discount);
  if (provided > 0 && provided <= 100) return provided;

  const original = originalPrice.value;
  if (!hasDiscount.value || original === 0) return 0;

  const calculated = Math.round(
    ((original - finalPrice.value) / original) * 100,
  );
  return Math.max(0, Math.min(100, calculated));
});

const isOutOfStock = computed(() => {
  return (
    props.product?.stock === 0 ||
    props.product?.in_stock === false ||
    props.product?.status === "unpublished"
  );
});

const isNewProduct = computed(() => {
  const p = props.product;
  return Boolean(
    p?.is_new ||
    p?.new ||
    p?.badge === "new" ||
    p?.is_new_arrival ||
    p?.categories?.some(
      (c) => c.slug === "new" || c.id === "new" || c.name?.includes("جدید"),
    ),
  );
});

const isTrendProduct = computed(() => {
  const p = props.product;
  return Boolean(
    p?.is_trend ||
    p?.trend ||
    p?.badge === "trending" ||
    p?.is_trending ||
    p?.categories?.some(
      (c) => c.slug === "trend" || c.id === "trend" || c.name?.includes("ترند"),
    ),
  );
});

const isFavorite = computed(() => {
  if (props.product?.id === null || props.product?.id === undefined)
    return false;
  return isInWishlist(props.product.id);
});

const handleFavorite = async () => {
  if (props.product?.id === null || props.product?.id === undefined) return;

  if (props.favoriteMode === "emit") {
    emit("toggle-favorite", props.product.id);
    return;
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  if (!token) {
    if (loginModal) loginModal.value = true;
    return;
  }

  const wasAdded = await toggleWishlist(props.product.id);
  if (!wasAdded) {
    emit("favorite-removed", props.product.id);
  }
};

const handleAddToCart = () => {
  if (isOutOfStock.value || adding.value) return;
  adding.value = true;
  emit("add-to-cart", props.product);
  setTimeout(() => {
    adding.value = false;
  }, 500);
};

const formatPrice = (val) => {
  return Number(val || 0).toLocaleString("fa-IR");
};
</script>
