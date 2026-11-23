<!-- app/components/shared/MobileDoubleRowSlider.vue -->
<template>
  <div
    ref="sliderContainer"
    class="grid md:hidden grid-rows-2 grid-flow-col auto-cols-[calc(100%-52px)] sm:auto-cols-[340px] gap-3 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory py-1"
  >
    <div
      v-for="(product, index) in products"
      :key="'mobile-' + (product.id ?? index)"
      class="snap-start min-w-0 bg-white border border-gray-200 rounded-2xl p-2 flex flex-col justify-between relative shadow-xs"
    >
      <!--
        یک لینک روی سطح کارت: رفتار کلیک، مانند productCard دسکتاپ است.
        دکمه علاقه‌مندی و در حالت اختیاری دکمه خرید، بالای این لینک قرار می‌گیرند.
      -->
      <NuxtLink
        :to="getProductLink(product)"
        :aria-label="product.title || product.name || 'مشاهده محصول'"
        class="absolute inset-0 z-10 rounded-2xl"
        @click="saveLocation"
      />

      <!-- ردیف بالا: عکس راست، عنوان و علاقه‌مندی چپ -->
      <div class="flex items-start justify-between gap-3">
        <!-- بج‌ها: جایگاه و ظاهر اسلایدر فعلی حفظ شده است -->
        <div
          class="absolute top-6 right-0 flex flex-col gap-1 z-10 items-start pointer-events-none"
        >
          <span
            v-if="isNewProduct(product)"
            class="bg-[#486332] text-white text-xs font-normal px-2 py-1 rounded-l-md leading-none"
          >
            جدید
          </span>

          <span
            v-if="isTrendProduct(product)"
            class="bg-[#b3e655] text-gray-950 text-xs font-normal px-2 py-1 rounded-l-md leading-none"
          >
            ترند
          </span>

          <span
            v-if="hasDiscount(product) && getDiscountPercent(product) > 0"
            class="bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-l-md leading-none"
          >
            ٪{{ formatPrice(getDiscountPercent(product)) }}
          </span>
        </div>
        <div
          class="w-24 sm:w-16 h-28 sm:h-28 shrink-0 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100"
        >
          <SharedAppImage
            v-if="getProductImage(product)"
            :src="getProductImage(product)"
            :alt="product.title || product.name || 'محصول'"
            format="webp"
            loading="lazy"
            class="w-full h-full"
            img-class="w-full h-full object-cover"
          />
        </div>

        <!-- عنوان و دکمه علاقه‌مندی -->
        <div class="flex-1 flex flex-col min-w-0">
          <div class="flex justify-end mb-2">
            <button
              type="button"
              class="relative z-20 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-xs transition-transform active:scale-90 cursor-pointer"
              :aria-label="
                isFavorite(product)
                  ? 'حذف از علاقه‌مندی‌ها'
                  : 'افزودن به علاقه‌مندی‌ها'
              "
              @click.stop="handleFavorite(product)"
            >
              <img
                :src="
                  isFavorite(product)
                    ? '/icons/heart-red.svg'
                    : '/icons/heart.svg'
                "
                alt=""
                class="w-4 h-4"
              />
            </button>
          </div>

          <span
            class="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-relaxed text-right hover:text-[#3F2356] transition-colors"
          >
            {{ product.title || product.name || "عنوان محصول" }}
          </span>
        </div>
      </div>

      <!-- ردیف پایین: ساختار و استایل اسلایدر قبلی -->
      <div
        class="flex items-center justify-between gap-2 mt-3 pt-2.5 bg-gray-100 p-2 rounded-lg"
      >
        <div class="flex items-center gap-2 min-w-0">
          <template v-if="product.status !== 'unpublished'">
            <span
              class="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap"
            >
              {{ formatPrice(getFinalPrice(product)) }}
              <span class="text-xs font-normal text-gray-600"> تومان </span>
            </span>

            <span
              v-if="hasDiscount(product)"
              class="text-sm pt-1.5 text-gray-400 line-through leading-tight whitespace-nowrap"
            >
              {{ formatPrice(getOriginalPrice(product)) }}
            </span>
          </template>

          <span v-else class="text-sm font-bold text-red-600"> ناموجود </span>
        </div>

        <!-- حالت پیش‌فرض: مثل دسکتاپ، کلیک این قسمت صفحه محصول را باز می‌کند -->
        <span v-if="purchaseMode === 'navigate'" class="btn !text-sm !px-2">
          مشاهده
        </span>

        <!-- فقط برای بخش‌هایی که والد واقعاً هندلر افزودن به سبد دارد -->
        <button
          v-else
          type="button"
          :disabled="addingId === product.id"
          class="relative z-20 btn !text-sm !px-2 disabled:opacity-50"
          @click.stop="emit('add-to-cart', product)"
        >
          {{ addingId === product.id ? "..." : "افزودن به سبد خرید" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWishlist } from "@/composables/useWishlist";
import { useAuth } from "@/composables/useAuth";

type ProductId = string | number;

interface ProductCategory {
  id?: ProductId;
  slug?: string;
  name?: string;
}

interface Product {
  id?: ProductId | null;
  slug?: string | null;

  title?: string;
  name?: string;
  status?: string;

  main_image?: unknown;
  image?: unknown;
  images?: unknown[];

  price?: number | string | null;
  final_price?: number | string | null;
  sale_price?: number | string | null;
  real_discount?: number | string | null;

  is_new?: boolean;
  new?: boolean;
  is_new_arrival?: boolean;
  is_trend?: boolean;
  trend?: boolean;
  is_trending?: boolean;
  badge?: string;
  categories?: ProductCategory[];
}

interface Props {
  products: Product[];
  addingId?: ProductId | null;
  trendingIds?: ProductId[];
  newIds?: ProductId[];
  wishlistIds?: ProductId[];

  saveLoc?: boolean;
  activeTab?: string;

  // پیش‌فرض‌ها دقیقاً از رفتار productCard پیروی می‌کنند.
  purchaseMode?: "navigate" | "emit";
  favoriteMode?: "internal" | "emit";
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  addingId: null,
  trendingIds: () => [],
  newIds: () => [],
  wishlistIds: () => [],
  saveLoc: false,
  activeTab: "1",
  purchaseMode: "navigate",
  favoriteMode: "internal",
});

const emit = defineEmits<{
  (e: "add-to-cart", product: Product): void;
  (e: "toggle-favorite", productId: ProductId): void;
  (e: "favorite-removed", productId: ProductId): void;
}>();

const sliderContainer = ref<HTMLElement | null>(null);
const scrollProductsLeft = () => {
  const container = sliderContainer.value;

  if (!container) return;

  const amount = Math.max(container.clientWidth * 0.85, 240);

  container.scrollBy({
    left: -amount,
    behavior: "smooth",
  });
};

const scrollProductsRight = () => {
  const container = sliderContainer.value;

  if (!container) return;

  const amount = Math.max(container.clientWidth * 0.85, 240);

  container.scrollBy({
    left: amount,
    behavior: "smooth",
  });
};

defineExpose({
  scrollProductsLeft,
  scrollProductsRight,
});

const { loginModal } = useAuth();
const { isInWishlist, toggleWishlist, fetchWishlist } = useWishlist();

const { $getImageUrl } = useNuxtApp() as ReturnType<typeof useNuxtApp> & {
  $getImageUrl?: (image: unknown) => string;
};

onMounted(() => {
  if (props.favoriteMode === "internal" && fetchWishlist) {
    fetchWishlist();
  }
});

const includesId = (ids: ProductId[], id: ProductId | null | undefined) => {
  if (id === null || id === undefined) return false;

  return ids.some((item) => String(item) === String(id));
};

const getProductLink = (product: Product): string => {
  if (product.slug?.trim()) return `/product/${product.slug}`;

  return product.id != null ? `/product/${product.id}` : "#";
};

const saveLocation = () => {
  if (!props.saveLoc || typeof window === "undefined") return;

  localStorage.setItem("activeTab", props.activeTab);
  localStorage.setItem("lastPosition", String(window.scrollY));
};

/*
 * دقیقاً همان ترتیب انتخاب و ساخت URL تصویر در productCard.vue:
 * main_image → image → اولین عضو images → $getImageUrl
 */
const getProductImage = (product: Product): string => {
  const image =
    product.main_image ||
    product.image ||
    (Array.isArray(product.images) ? product.images[0] : null);

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
};

const getOriginalPrice = (product: Product): number => {
  return Number(product.price || 0);
};

const getFinalPrice = (product: Product): number => {
  return Number(
    product.final_price ?? product.sale_price ?? product.price ?? 0,
  );
};

const hasDiscount = (product: Product): boolean => {
  return getOriginalPrice(product) > getFinalPrice(product);
};

const getDiscountPercent = (product: Product): number => {
  const provided = Number(product.real_discount);

  if (provided > 0 && provided <= 100) {
    return provided;
  }

  const original = getOriginalPrice(product);
  if (!hasDiscount(product) || original === 0) return 0;

  const calculated = Math.round(
    ((original - getFinalPrice(product)) / original) * 100,
  );

  return Math.max(0, Math.min(100, calculated));
};

const isNewProduct = (product: Product): boolean => {
  if (includesId(props.newIds, product.id)) return true;

  return Boolean(
    product.is_new ||
    product.new ||
    product.badge === "new" ||
    product.is_new_arrival ||
    product.categories?.some(
      (category) =>
        category.slug === "new" ||
        category.id === "new" ||
        category.name?.includes("جدید"),
    ),
  );
};

const isTrendProduct = (product: Product): boolean => {
  if (includesId(props.trendingIds, product.id)) return true;

  return Boolean(
    product.is_trend ||
    product.trend ||
    product.badge === "trending" ||
    product.is_trending ||
    product.categories?.some(
      (category) =>
        category.slug === "trend" ||
        category.id === "trend" ||
        category.name?.includes("ترند"),
    ),
  );
};

const isFavorite = (product: Product): boolean => {
  if (product.id === null || product.id === undefined) return false;

  // در حالت واگذاری به والد، منبع وضعیت همان آرایه ارسالی والد است.
  if (props.favoriteMode === "emit") {
    return includesId(props.wishlistIds, product.id);
  }

  // در حالت پیش‌فرض، منبع وضعیت همان productCard دسکتاپ است.
  return isInWishlist(product.id);
};

const handleFavorite = async (product: Product) => {
  if (product.id === null || product.id === undefined) return;

  if (props.favoriteMode === "emit") {
    emit("toggle-favorite", product.id);
    return;
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  if (!token) {
    if (loginModal) loginModal.value = true;
    return;
  }

  const wasAdded = await toggleWishlist(product.id);

  if (!wasAdded) {
    emit("favorite-removed", product.id);
  }
};

const formatPrice = (value: number): string => {
  return Number(value).toLocaleString("fa-IR");
};
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
