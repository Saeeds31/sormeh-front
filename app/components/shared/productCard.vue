<!-- app/components/shared/productCard.vue -->
<template>
  <NuxtLink
    :to="productUrl"
    @click="saveLocation"
    class="w-full rounded-2xl bg-white border border-gray-200 p-3 flex flex-col justify-between relative hover:shadow-xl hover:border-gray-300 transition-all duration-300 group overflow-hidden"
  >
    <div
      class="absolute top-7 -right-1 flex flex-col items-end gap-1.5 z-10 select-none"
    >
      <span
        v-if="hasDiscount && discountPercentage > 0"
        class="bg-[#E63963] text-white text-sm font-bold px-5 py-1.5 rounded-lg shadow-xs"
      >
        {{ discountPercentage }}%
      </span>
      <span
        v-if="isNewProduct"
        class="bg-[#486332] text-white text-sm font-medium px-5 py-1.5 rounded-l-lg shadow-xs"
      >
        جدید
      </span>
      <span
        v-if="isTrending"
        class="bg-[#b3e655] text-gray-900 text-sm font-bold px-5 py-1.5 rounded-l-lg shadow-xs"
      >
        ترند
      </span>
    </div>

    <button
      type="button"
      @click.stop.prevent="toggleFavorite"
      class="absolute top-6 left-5 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white/95 backdrop-blur-xs shadow-xs transition-all active:scale-90 z-10 hover:border-gray-300 hover:bg-white"
    >
      <img
        v-if="isFavoriteComputed"
        src="/icons/heart-red.svg"
        alt="علاقه‌مندی"
        class="w-4 h-4"
      />
      <img
        v-else
        src="/icons/heart.svg"
        alt="علاقه‌مندی"
        class="w-4 h-4 opacity-70 group-hover:opacity-100"
      />
    </button>

    <div
      class="w-full h-48 md:h-72 flex items-center justify-center overflow-hidden relative rounded-lg border mb-4"
    >
      <SharedAppImage
        v-if="imageSrc"
        :src="imageSrc"
        :alt="product?.title || 'محصول'"
        format="webp"
        loading="lazy"
        img-class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div class="text-right min-h-[56px] flex flex-col justify-start">
      <h2
        class="text-xs md:text-sm font-bold text-gray-900 line-clamp-2 leading-relaxed group-hover:text-purple-900 transition-colors"
      >
        {{ product?.title || product?.name || "عنوان محصول" }}
      </h2>
      <span
        v-if="product?.en_title || product?.subtitle"
        class="text-xs text-gray-400 font-normal line-clamp-1 mt-0.5 dir-ltr text-right"
      >
        {{ product?.en_title || product?.subtitle }}
      </span>
    </div>

    <div class="w-full border-t border-dashed border-gray-200 my-2"></div>

    <div class="flex flex-row-reverse items-center justify-between gap-2 pt-1">
      <div
        v-if="product?.status !== 'unpublished'"
        class="flex flex-col text-left"
      >
        <div class="flex items-baseline gap-1">
          <span class="font-bold text-sm md:text-base text-gray-900">
            {{ formatPrice(finalPrice) }}
          </span>
          <span class="text-xs text-gray-500 font-normal">تومان</span>
        </div>
        <div
          v-if="hasDiscount"
          class="text-xs text-gray-400 line-through decoration-red-500/80"
        >
          {{ formatPrice(originalPrice) }} تومان
        </div>
      </div>

      <div v-else class="text-right">
        <span class="text-xs md:text-sm font-bold text-red-600">ناموجود</span>
      </div>
      <button type="button" class="btn !text-sm !px-2">مشاهده وخرید</button>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useWishlist } from "@/composables/useWishlist";
import { useAuth } from "@/composables/useAuth";

const props = defineProps({
  product: { type: Object, required: true },
  isFavorite: { type: Boolean, default: false },
  saveLoc: { type: Boolean, default: false },
  activeTab: { type: String, default: "1" },
  trendingIds: { type: Array, default: () => [] },
  newIds: { type: Array, default: () => [] },
});

const emit = defineEmits(["favorite-removed"]);
const { $getImageUrl } = useNuxtApp();
const { loginModal } = useAuth();
const { isInWishlist, toggleWishlist, fetchWishlist } = useWishlist();

onMounted(() => {
  if (fetchWishlist) fetchWishlist();
});

const productUrl = computed(() =>
  props.product?.id ? `/product/${props.product.id}` : "#",
);

const saveLocation = () => {
  if (props.saveLoc && typeof window !== "undefined") {
    localStorage.setItem("activeTab", props.activeTab);
    localStorage.setItem("lastPosition", window.scrollY);
  }
};

const isFavoriteComputed = computed(
  () => props.isFavorite || isInWishlist(props.product?.id),
);

const toggleFavorite = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  if (!token) {
    if (loginModal) loginModal.value = true;
    return;
  }
  const wasAdded = await toggleWishlist(props.product?.id);
  if (!wasAdded) emit("favorite-removed", props.product?.id);
};

const originalPrice = computed(() => Number(props.product?.price || 0));
const finalPrice = computed(() =>
  Number(
    props.product?.final_price ??
      props.product?.sale_price ??
      props.product?.price ??
      0,
  ),
);
const hasDiscount = computed(() => originalPrice.value > finalPrice.value);

const discountPercentage = computed(() => {
  if (props.product?.real_discount) {
    const val = Number(props.product.real_discount);
    if (val > 0 && val <= 100) return val;
  }

  if (!hasDiscount.value || originalPrice.value === 0) return 0;

  const calculated = Math.round(
    ((originalPrice.value - finalPrice.value) / originalPrice.value) * 100,
  );

  if (calculated > 100) return 100;
  if (calculated < 0) return 0;

  return calculated;
});

const isTrending = computed(() => {
  // ۱. بررسی آرایه ارسالی از والد (در صورت وجود)
  if (
    props.trendingIds?.length &&
    props.trendingIds.includes(props.product?.id)
  ) {
    return true;
  }
  // ۲. بررسی ویژگی‌های خود آبجکت محصول به شکل مستقیم و خودکار
  return Boolean(
    props.product?.is_trend ||
    props.product?.trend ||
    props.product?.badge === "trending" ||
    props.product?.is_trending ||
    (Array.isArray(props.product?.categories) &&
      props.product.categories.some(
        (c) =>
          c?.slug === "trend" || c?.id === "trend" || c?.name?.includes("ترند"),
      )),
  );
});

const isNewProduct = computed(() => {
  if (props.newIds?.length && props.newIds.includes(props.product?.id)) {
    return true;
  }
  return Boolean(
    props.product?.is_new ||
    props.product?.new ||
    props.product?.badge === "new" ||
    props.product?.is_new_arrival ||
    (Array.isArray(props.product?.categories) &&
      props.product.categories.some(
        (c) =>
          c?.slug === "new" || c?.id === "new" || c?.name?.includes("جدید"),
      )),
  );
});

const imageSrc = computed(() => {
  const img =
    props.product?.main_image ||
    props.product?.image ||
    (Array.isArray(props.product?.images) ? props.product.images[0] : null);
  if (!img) return "";
  if (
    typeof img === "string" &&
    (img.startsWith("http://") || img.startsWith("https://"))
  )
    return img;
  return $getImageUrl ? $getImageUrl(img) : `/storage/${img}`;
});

const formatPrice = (val) =>
  !val && val !== 0 ? "۰" : Number(val).toLocaleString("fa-IR");
</script>
