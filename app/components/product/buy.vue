<!-- <template>
  <div class="space-y-6 mt-4">
    <div class="flex gap-4">
      <button v-if="props.inStock" @click="handleAddToCart" :disabled="isAddingToCart"
        class="btn px-10 h-12 w-[90%] flex items-center justify-center gap-2 text-sm sm:text-base transition" :class="{
          'opacity-60 cursor-wait': isAddingToCart,
          'bg-green-600 hover:bg-green-700 text-white':
            !isAddingToCart,
        }">
        <ShoppingCart v-if="!isAddingToCart" :size="22" />
        <Loader v-else :size="22" class="animate-spin" />
        <span>
          {{
            isAddingToCart
              ? "در حال افزودن..."
              : "افزودن به سبد خرید"
          }}
        </span>
      </button>


      <template v-else>
        <button disabled
          class="btn px-4 h-12 w-[20%] flex items-center justify-center gap-2 text-sm sm:text-base transition !bg-red-400 hover:!bg-red-700 !text-white cursor-not-allowed">
          <span>ناموجود</span>
        </button>
        <StockAlertButton :product-id="props.productId" :is-in-stock="props.inStock"
          @request-updated="handleStockAlertUpdated" />
      </template>

      <button @click="toggleWishlist" :class="[
        'w-[48px]  cursor-pointer rounded-lg flex justify-center items-center transition-transform active:scale-90',
        isInWishlist ? 'bg-secondary' : 'bg-secondary-fade',
      ]">
        <IconFavLineWhite />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ShoppingCart as IconShoppingCart } from "lucide-vue-next";
import { useApi } from "@/composables/api/useApi";
import { ShoppingCart, Loader, Check } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import StockAlertButton from "@/components/product/StockAlertButton.vue";
import { useCartStore } from "~/store/cart";
const cartStore = useCartStore();

const props = defineProps({
  price: Number,
  oldPrice: Number,
  inStock: Boolean,
  variantId: Number,
  variants: Array,
  quantity: {
    type: Number,
    default: 1,
  },
  productId: Number,
  productTitle: String,
  productImage: String,

  weight: {
    type: String,
    default: "",
  },
  isInWishlist: {
    type: Boolean,
    default: false,
  },

});

const emit = defineEmits([
  "wishlist-updated",
  "show-weight-error",
  "cart-updated",
]);

const { addToCart, addToWishlist, removeFromWishlist } = useApi();
const isAddingToCart = ref(false);

const handleAddToCart = async () => {
  if (!props.variantId) {
    toast.error("لطفا یکی از ویژگی ها را انتخاب کنید");
    emit("show-weight-error");
    return;
  }

  isAddingToCart.value = true;
  let selectedVariant = props.variants.find(vari => vari.id == props.variantId)
  if (!selectedVariant) return;
  selectedVariant.attributes = [];
  selectedVariant.values.forEach(vals => {
    selectedVariant.attributes.push({ name: vals.attribute, value: vals.value });
  });
  try {
    const productData = {
      id: props.productId,
      product_id: props.productId,
      name: props.productTitle,
      title: props.productTitle,
      variant: selectedVariant,
      price_original: selectedVariant.price,
      price_final: selectedVariant.final_price,
      line_original_total: selectedVariant.price * props.quantity,
      line_final_total: selectedVariant.final_price * props.quantity,
      line_discount: (selectedVariant.price - selectedVariant.final_price) * props.quantity,
      image: props.productImage,
      weight: props.weight,
    };

    const result = await addToCart(
      props.variantId,
      props.quantity,
      productData,
    );
    emit("cart-updated");
  } catch (error) {
    console.log(error);
    cartStore.addToCartMessage = error.response.data.message || "خطا در افزودن به سبد خرید";
    setTimeout(() => {
      cartStore.addToCartMessage = ""
    }, 5000);
    toast.error(error.response.data.message || "خطا در افزودن به سبد خرید");

  } finally {
    isAddingToCart.value = false;
  }
};

const toggleWishlist = async () => {

  if (!props.productId) {
    console.warn("⚠️ No product ID!");
    return;
  }

  try {
    if (props.isInWishlist) {
      await removeFromWishlist(props.productId);
    } else {
      await addToWishlist(props.productId);
    }
    emit("wishlist-updated");
  } catch (error) {
    console.error("❌ Wishlist toggle error:", error);
    toast.error("خطا در تغییر وضعیت علاقه‌مندی");
  }
};

</script> -->

<!-- app/components/product/buy.vue -->
<template>
  <div
    class="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col justify-between h-full"
    dir="rtl"
  >
    <!-- ========================================== -->
    <!-- ۱. بخش دسکتاپ (کل محتوا به صورت کارت معمولی) -->
    <!-- ========================================== -->
    <div class="hidden md:flex flex-col justify-between h-full">
      <!-- بنر پرداخت -->
      <div
        class="mb-2 flex !flex-wrap rounded-xl bg-[#BAF2FF] p-2 items-center gap-2"
      >
        <SharedAppImage
          src="/images/snapppay.svg"
          alt="لوگو"
          img-class="w-10 h-auto"
        />
        <div class="text-sm font-bold text-gray-800">
          خرید در ۴ قسط از اسنپ‌پی!
        </div>
      </div>
      <div
        class="mb-4 flex !flex-wrap rounded-xl bg-[#B8ED6B] p-2 items-center gap-2"
      >
        <SharedAppImage
          src="/images/torob-pay.svg"
          alt="لوگو"
          img-class="w-10 h-auto"
        />
        <div class="text-sm font-bold text-gray-800">
          خرید در ۴ قسط از ترب پی!
        </div>
      </div>

      <!-- قیمت هر واحد -->
      <div v-if="hasPrice" class="space-y-3">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <span class="text-sm text-gray-500">قیمت :</span>
          <div class="flex flex-col justify-center items-end space-y-2.5">
            <div
              v-if="hasDiscount"
              class="text-sm text-gray-400 gap-3 line-through decoration-red-400"
            >
              <span
                v-if="hasDiscount"
                class="rounded-lg bg-red-500 p-[2px] gap-1 ml-1 text-xs font-bold text-white"
              >
                {{ discountPercent }}٪
              </span>
              {{ formatPrice(totalOldPrice) }} تومان
            </div>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="text-3xl font-bold text-purple-900">
                {{ formatPrice(totalPrice) }}
              </span>
              <span class="pb-0.5 text-sm text-gray-600">تومان</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasPrice" class="mt-5 border-t border-gray-100"></div>

      <!-- انتخاب تعداد -->
      <div v-if="inStock" class="space-y-2 flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700"> تعداد : </label>

        <div class="flex items-center justify-between gap-3">
          <div
            class="flex h-11 items-center overflow-hidden rounded-xl border border-gray-200"
          >
            <button
              type="button"
              class="flex h-full w-11 items-center justify-center text-xl text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="selectedQuantity <= 1 || isAddingToCart"
              aria-label="کاهش تعداد"
              @click="decreaseQuantity"
            >
              −
            </button>

            <span class="min-w-10 px-2 text-center font-bold tabular-nums">
              {{ selectedQuantity.toLocaleString("fa-IR") }}
            </span>

            <button
              type="button"
              class="flex h-full w-11 items-center justify-center text-xl text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="isAddingToCart"
              aria-label="افزایش تعداد"
              @click="increaseQuantity"
            >
              +
            </button>
          </div>

          <span
            v-if="hasPrice && selectedQuantity > 1"
            class="text-left text-sm text-gray-600"
          >
            جمع:
            <strong class="text-gray-900">
              {{ formatPrice(totalPrice) }}
            </strong>
            تومان
          </span>
        </div>
      </div>

      <!-- عملیات خرید / اطلاع‌رسانی موجودی -->
      <div class="mt-5">
        <button
          v-if="inStock"
          type="button"
          class="btn flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 text-sm text-white transition hover:bg-green-700 disabled:cursor-wait disabled:opacity-60 sm:text-base"
          :disabled="isAddingToCart"
          @click="handleAddToCart"
        >
          <ShoppingCart v-if="!isAddingToCart" :size="20" />
          <Loader v-else :size="20" class="animate-spin" />

          <span>
            {{ isAddingToCart ? "در حال افزودن..." : "افزودن به سبد خرید" }}
          </span>
        </button>

        <div v-else class="flex flex-wrap items-center gap-2">
          <span
            class="flex h-12 items-center rounded-xl bg-red-50 px-4 text-sm font-medium text-red-600"
          >
            ناموجود
          </span>

          <StockAlertButton
            :product-id="productId"
            :is-in-stock="inStock"
            @request-updated="handleStockAlertUpdated"
          />
        </div>
      </div>

      <!-- اطلاعات پایین: کد کالا و دسته‌بندی‌ها -->
      <div
        class="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-500"
      >
        <div class="flex items-center gap-2">
          <IconStar5 /><span class="pt-2">
            ۴.۸ <span class="text-[10px] gap-2">(25 دیدگاه)</span></span
          >
        </div>
        <!-- کد کالا -->
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-700">کد کالا:</span>
          <span class="font-bold text-gray-800 tracking-wider" dir="ltr">
            {{ displayProductCode }}
          </span>
        </div>

        <!-- دسته‌بندی‌ها -->
        <div
          v-if="categoryLabels.length"
          class="flex items-center flex-wrap gap-2"
        >
          <span class="font-medium text-gray-700">دسته‌بندی:</span>
          <span
            v-for="(category, index) in categoryLabels"
            :key="`${category}-${index}`"
            class="text-gray-600"
          >
            {{ category
            }}<span v-if="index < categoryLabels.length - 1">،</span>
          </span>
        </div>
      </div>
    </div>

    <!-- ۲. بخش موبایل (تعداد و مشخصات بالا، نوار فیکس پایین) -->
    <div class="flex md:hidden flex-col gap-5">
      <div v-if="inStock" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"> تعداد : </label>

        <div class="flex items-center justify-between gap-3">
          <div
            class="flex h-11 items-center overflow-hidden rounded-xl border border-gray-200"
          >
            <button
              type="button"
              class="flex h-full w-11 items-center justify-center text-xl text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="selectedQuantity <= 1 || isAddingToCart"
              aria-label="کاهش تعداد"
              @click="decreaseQuantity"
            >
              −
            </button>

            <span class="min-w-10 px-2 text-center font-bold tabular-nums">
              {{ selectedQuantity.toLocaleString("fa-IR") }}
            </span>

            <button
              type="button"
              class="flex h-full w-11 items-center justify-center text-xl text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="isAddingToCart"
              aria-label="افزایش تعداد"
              @click="increaseQuantity"
            >
              +
            </button>
          </div>

          <span
            v-if="hasPrice && selectedQuantity > 1"
            class="text-left text-sm text-gray-600"
          >
            جمع:
            <strong class="text-gray-900">
              {{ formatPrice(Number(price) * selectedQuantity) }}
            </strong>
            تومان
          </span>
        </div>
      </div>

      <!-- اگر ناموجود باشد در موبایل نمایش داده شود -->
      <div v-if="!inStock">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="flex h-12 items-center rounded-xl bg-red-50 px-4 text-sm font-medium text-red-600"
          >
            ناموجود
          </span>
          <StockAlertButton
            :product-id="productId"
            :is-in-stock="inStock"
            @request-updated="handleStockAlertUpdated"
          />
        </div>
      </div>

      <!-- اطلاعات پایین: کد کالا و دسته‌بندی‌ها در موبایل -->
      <div
        class="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-500"
      >
        <div class="flex items-center gap-2">
          <IconStar5 /><span class="pt-2">
            ۴.۸ <span class="text-[10px] gap-2">(25 دیدگاه)</span></span
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-700">کد کالا:</span>
          <span class="font-bold text-gray-800 tracking-wider" dir="ltr">
            {{ displayProductCode }}
          </span>
        </div>
        <div
          v-if="categoryLabels.length"
          class="flex items-center flex-wrap gap-2"
        >
          <span class="font-medium text-gray-700">دسته‌بندی:</span>
          <span
            v-for="(category, index) in categoryLabels"
            :key="`${category}-${index}`"
            class="text-gray-600"
          >
            {{ category
            }}<span v-if="index < categoryLabels.length - 1">،</span>
          </span>
        </div>
      </div>
    </div>

    <!-- نوار ثابت پایین صفحه مخصوص موبایل (قیمت + اسنپ‌پی + دکمه خرید) -->
    <div
      class="mobile-sticky-bar md:hidden fixed -bottom-4 right-0 left-0 z-30 flex flex-col"
      dir="rtl"
    >
      <!-- بنر اسنپ‌پی در نوار موبایل -->
      <div class="bg-[#E0F7FA] px-3 py-2 flex items-center gap-1.5">
        <SharedAppImage
          src="/images/snapppay.svg"
          alt="لوگو"
          img-class="w-7 h-5 h-auto"
        />
        <div class="text-xs font-bold text-gray-800">
          خرید در ۴ قسط از اسنپ‌پی!
        </div>
      </div>
      <div class="bg-[#B8ED6B] px-3 py-2 flex items-center gap-1.5">
        <SharedAppImage
          src="/images/torob-pay.svg"
          alt="لوگو"
          img-class="w-7 h-5 h-auto"
        />
        <div class="text-xs font-bold text-gray-800">
          خرید در ۴ قسط از ترب پی!
        </div>
      </div>

      <!-- قیمت و دکمه خرید در یک ردیف -->
      <div class="flex items-center bg-gray-100 p-3 justify-between gap-3">
        <div v-if="inStock" class="flex-1 max-w-[220px]">
          <button
            type="button"
            class="btn flex h-11 w-full items-center justify-center gap-2 max-md:text-xs transition disabled:cursor-wait disabled:opacity-60"
            :disabled="isAddingToCart"
            @click="handleAddToCart"
          >
            <!-- <ShoppingCart v-if="!isAddingToCart" :size="16" />
            <Loader v-else :size="16" class="animate-spin" /> -->
            <span>
              {{ isAddingToCart ? "در حال افزودن..." : "افزودن به سبد خرید" }}
            </span>
          </button>
        </div>
        <!-- قیمت -->
        <div v-if="hasPrice" class="flex flex-col">
          <div v-if="hasDiscount" class="flex items-center gap-1.5">
            <span class="text-xs text-gray-400 line-through">
              {{ formatPrice(totalOldPrice) }}
            </span>
            <span
              class="rounded bg-red-500 px-1.5 py-0.2 text-[10px] font-bold text-white"
            >
              {{ discountPercent }}٪
            </span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-base font-bold text-gray-900">
              {{ formatPrice(totalPrice) }}
            </span>
            <span class="text-xs text-gray-600">تومان</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { ShoppingCart, Loader } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import { useAuth } from "~/composables/useAuth";
import { useApi } from "@/composables/api/useApi";
import StockAlertButton from "@/components/product/StockAlertButton.vue";
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();
const { openModal } = useAuth();

const props = defineProps({
  price: Number,
  oldPrice: Number,
  inStock: Boolean,
  variantId: Number,
  variants: {
    type: Array,
    default: () => [],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  productId: Number,
  productTitle: String,
  productImage: String,
  sku: {
    type: String,
    default: "",
  },
  weight: {
    type: String,
    default: "",
  },
  isInWishlist: {
    type: Boolean,
    default: false,
  },

  categories: {
    type: Array,
    default: () => [],
  },

  showSnappPay: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "wishlist-updated",
  "show-weight-error",
  "cart-updated",
  "update:quantity",
  "stock-alert-updated",
]);

const { addToCart, addToWishlist, removeFromWishlist } = useApi();
const isAddingToCart = ref(false);

const normalizeQuantity = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(1, Math.floor(number)) : 1;
};

const selectedQuantity = ref(normalizeQuantity(props.quantity));
const totalPrice = computed(() => Number(props.price) * selectedQuantity.value);
const totalOldPrice = computed(
  () => Number(props.oldPrice) * selectedQuantity.value,
);

watch(
  () => props.quantity,
  (value) => {
    selectedQuantity.value = normalizeQuantity(value);
  },
);

const changeQuantity = (value) => {
  selectedQuantity.value = normalizeQuantity(value);
  emit("update:quantity", selectedQuantity.value);
};

const increaseQuantity = () => changeQuantity(selectedQuantity.value + 1);
const decreaseQuantity = () => changeQuantity(selectedQuantity.value - 1);

const hasPrice = computed(
  () => props.price != null && Number.isFinite(Number(props.price)),
);

const hasDiscount = computed(
  () =>
    hasPrice.value &&
    props.oldPrice != null &&
    Number.isFinite(Number(props.oldPrice)) &&
    Number(props.oldPrice) > Number(props.price),
);

const discountPercent = computed(() => {
  if (!hasDiscount.value || Number(props.oldPrice) <= 0) return 0;

  return Math.round(
    ((Number(props.oldPrice) - Number(props.price)) / Number(props.oldPrice)) *
      100,
  );
});

const formatPrice = (value) => Number(value).toLocaleString("fa-IR");

const displayProductCode = computed(() => {
  if (props.sku && String(props.sku).trim() !== "") {
    return props.sku;
  }
  return props.productId ? String(props.productId) : "---";
});

const categoryLabels = computed(() =>
  props.categories
    .map((category) => {
      if (typeof category === "string") return category;
      return category?.name ?? category?.title ?? null;
    })
    .filter(Boolean),
);

const handleStockAlertUpdated = (...args) => {
  emit("stock-alert-updated", ...args);
};

const handleAddToCart = async () => {
  if (isAddingToCart.value) return;

  if (!props.variantId) {
    toast.error("لطفا یکی از ویژگی ها را انتخاب کنید");
    emit("show-weight-error");
    return;
  }

  const variant = props.variants.find((item) => item.id == props.variantId);

  if (!variant) {
    toast.error("لطفا یکی از ویژگی ها را انتخاب کنید");
    emit("show-weight-error");
    return;
  }

  const selectedVariant = {
    ...variant,
    attributes: Array.isArray(variant.values)
      ? variant.values.map((item) => ({
          name: item.attribute,
          value: item.value,
        }))
      : (variant.attributes ?? []),
  };

  isAddingToCart.value = true;

  try {
    const productData = {
      id: props.productId,
      product_id: props.productId,
      name: props.productTitle,
      title: props.productTitle,
      variant: selectedVariant,
      price_original: selectedVariant.price,
      price_final: selectedVariant.final_price,
      line_original_total: selectedVariant.price * selectedQuantity.value,
      line_final_total: selectedVariant.final_price * selectedQuantity.value,
      line_discount:
        (selectedVariant.price - selectedVariant.final_price) *
        selectedQuantity.value,
      image: props.productImage,
      weight: props.weight,
    };

    const isAuthenticated =
      process.client && Boolean(localStorage.getItem("auth-token"));

    if (isAuthenticated) {
      await addToCart(props.variantId, selectedQuantity.value, productData);
    } else {
      cartStore.addItem({
        ...productData,
        variant_id: props.variantId,
        quantity: selectedQuantity.value,
      });
    }

    emit("cart-updated");
  } catch (error) {
    console.error(error);

    const message =
      error?.response?.data?.message || "خطا در افزودن به سبد خرید";

    cartStore.addToCartMessage = message;

    setTimeout(() => {
      cartStore.addToCartMessage = "";
    }, 5000);

    toast.error(message);
  } finally {
    isAddingToCart.value = false;
  }
};

const toggleWishlist = async () => {
  if (!props.productId) {
    console.warn("⚠️ No product ID!");
    return;
  }

  const isAuthenticated =
    process.client && Boolean(localStorage.getItem("auth-token"));

  if (!isAuthenticated) {
    openModal();
    return;
  }

  try {
    if (props.isInWishlist) {
      await removeFromWishlist(props.productId);
    } else {
      await addToWishlist(props.productId);
    }

    emit("wishlist-updated");
  } catch (error) {
    console.error("❌ Wishlist toggle error:", error);

    if (error?.response?.status === 401) {
      openModal();
      return;
    }

    toast.error("خطا در تغییر وضعیت علاقه‌مندی");
  }
};

defineExpose({ toggleWishlist });
</script>

<style scoped>
@media (max-width: 767px) {
  .mobile-sticky-bar {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
</style>
