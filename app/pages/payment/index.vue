<template>
  <div class="container space-y-6 md:space-y-10 pb-28 md:pb-10" dir="rtl">
    <!-- هدر دسکتاپ -->
    <div class="hidden md:block">
      <SharedBreadCrumb :items="[
        { label: 'سبد خرید', href: '/cart' },
        { label: 'انتخاب آدرس و روش ارسال', href: '/shipping' },
        { label: 'پرداخت', href: '/payment' },
      ]" />
    </div>

    <!-- هدر موبایل مطابق فیگما -->
    <div class="flex md:hidden items-center justify-between py-3 border-b border-gray-100">
      <NuxtLink to="/shipping" class="p-1 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-5 h-5 rotate-180">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </NuxtLink>
      <h1 class="text-base font-bold text-gray-800">شیوه و نحوه پرداخت</h1>
      <div class="w-5"></div>
    </div>

    <CartProgressSteps :current-step="3" />
    <div class="">
      <!-- تغییر lg:items-start به lg:items-stretch برای هم‌ارتفاع شدن ستون‌ها -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        <!-- ستون اول (چپ در دسکتاپ): تبدیل به فلکس برای تراز دکمه به پایین -->
        <div class="flex flex-col justify-between space-y-6">
          <div class="space-y-6">
            <div class="space-y-3">
              <h3 class="font-bold text-xs md:text-sm text-gray-800 text-right">
                انتخاب شیوه ی پرداخت
              </h3>

              <div class="bg-[#f7f7f9] border border-gray-200/80 rounded-2xl p-3 md:p-5 space-y-3">
                <!-- درگاه زیبال -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="selectedGateway === 'zibal'
                    ? 'border-gray-800 ring-1 ring-gray-800'
                    : 'border-gray-200'
                    ">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-blue-800 text-xs">
                      زیبال
                    </span>
                    <div class="text-right">
                      <span class="font-bold text-xs sm:text-sm text-gray-900 block">درگاه پرداخت زیبال</span>
                      <span class="text-xs text-gray-400">تمام کارت‌های عضو شتاب</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" name="gateway" value="zibal" v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>
                </label>

                <!-- درگاه پارسیان -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="selectedGateway === 'parsian'
                    ? 'border-gray-800 ring-1 ring-gray-800'
                    : 'border-gray-200'
                    ">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center font-bold text-red-600 text-xs">
                      پارسیان
                    </span>
                    <div class="text-right">
                      <span class="font-bold text-xs sm:text-sm text-gray-900 block">درگاه پرداخت پارسیان</span>
                      <span class="text-xs text-gray-400">تمام کارت‌های عضو شتاب</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" name="gateway" value="parsian" v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>
                </label>

                <!-- درگاه زرین پال -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="selectedGateway === 'zarinpal'
                    ? 'border-gray-800 ring-1 ring-gray-800'
                    : 'border-gray-200'
                    ">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center font-bold text-yellow-600 text-xs">
                      زرین
                    </span>
                    <div class="text-right">
                      <span class="font-bold text-xs sm:text-sm text-gray-900 block">درگاه پرداخت زرین‌پال</span>
                      <span class="text-xs text-gray-400">تمام کارت‌های عضو شتاب</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" name="gateway" value="zarinpal" v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>
                </label>

                <!-- کیف پول -->
                <label v-if="wallet && wallet.balance"
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="paymentMethod === 'wallet'
                    ? 'border-gray-800 ring-1 ring-gray-800'
                    : 'border-gray-200'
                    ">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center font-bold text-emerald-600 text-xs">
                      کیف
                    </span>
                    <div class="text-right">
                      <span class="font-bold text-xs sm:text-sm text-gray-900 block">پرداخت از کیف پول</span>
                      <span class="text-xs text-gray-400">موجودی:
                        {{ wallet.balance.toLocaleString("fa-IR") }} تومان</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="radio" name="paymentMethodType" value="wallet" :checked="paymentMethod === 'wallet'"
                      @change="paymentMethod = 'wallet'" class="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>
                </label>
              </div>

              <!-- توضیحات سفارش اختیاری -->
              <div class="flex flex-col gap-1.5 pt-2">
                <label class="text-xs font-bold text-gray-700">یادداشت سفارش (اختیاری):</label>
                <textarea v-model="user_note" rows="2"
                  class="resize-none w-full p-3 rounded-xl border border-gray-200 text-xs outline-none bg-white"
                  placeholder="اگر توضیحی در خصوص بسته‌بندی یا زمان تحویل دارید بنویسید..."></textarea>
              </div>
            </div>
          </div>

          <!-- دکمه «مرحله قبل»؛ در دسکتاپ به کفِ ستون می‌چسبد -->
          <div class="hidden md:block pt-4">
            <NuxtLink to="/shipping" class="btnborderBlack w-full block md:!py-4 text-center">
              مرحله قبل
            </NuxtLink>
          </div>
        </div>

        <!-- ستون دوم (راست در دسکتاپ): خلاصه سفارش و پرداخت نهایی -->
        <div class="flex flex-col justify-between space-y-6">
          <div class="space-y-6">
            <div class="space-y-3">
              <h3 class="font-bold text-xs md:text-sm text-gray-800 text-right">
                خلاصه سفارش
              </h3>
              <!-- ===== باکس باشگاه مشتریان ===== -->
              <div v-if="club"
                class="bg-gradient-to-l from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-3 text-xs space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-900 flex items-center gap-1">
                    <i class="bi bi-award-fill"></i>
                    سطح باشگاه: {{ clubLevelLabel }}
                  </span>
                  <span class="text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                    تخفیف {{ club.discount_percent }}٪
                  </span>
                </div>
                <div class="flex items-center justify-between text-amber-800">
                  <span>ارسال رایگان این ماه:</span>
                  <span class="font-bold">
                    {{ club.used_this_month }} از {{ club.allowed_per_month }} استفاده شده
                    ({{ club.remaining }} باقی‌مانده)
                  </span>
                </div>
              </div>
              <div v-if="isFetchingSummary" class="text-center py-4 bg-white rounded-2xl border border-gray-100">
                <SharedLoadingSpinner size="sm" />
              </div>

              <template v-else>
                <!-- آدرس انتخاب شده -->
                <div v-if="selectedAddress"
                  class="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xs text-right space-y-2">
                  <div class="flex items-center gap-1.5 text-gray-400 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>آدرس شما</span>
                  </div>
                  <p class="text-xs font-bold text-gray-800">
                    {{ selectedAddress.province?.name }} -
                    {{ selectedAddress.city?.name }}،
                    {{ selectedAddress.address_line }}
                  </p>
                  <p class="text-xs text-gray-500">
                    گیرنده: {{ selectedAddress.receiver_name }} ({{
                      selectedAddress.phone
                    }})
                  </p>
                </div>

                <!-- شیوه ارسال انتخاب شده -->
                <div v-if="selectedShippingMethod"
                  class="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xs text-right flex flex-col items-start gap-3">
                  <div class="space-y-2">
                    <div class="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                      <span>شیوه ارسال</span>
                    </div>
                    <p class="text-xs font-bold text-gray-800">
                      {{ selectedShippingMethod.name }}
                      <span v-if="isFreeShipping" class="text-emerald-600">
                        - رایگان (باشگاه)
                      </span>
                      <span v-else-if="shippingCost > 0">
                        - {{ shippingCost.toLocaleString("fa-IR") }} تومان
                      </span>
                      <span v-else>- رایگان</span>
                    </p>
                  </div>
                  <div
                    class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 p-1">
                    <img src="@/assets/images/shopping.png" class="w-full h-full object-contain" alt="ارسال"
                      onerror="this.style.display = 'none'" />
                  </div>
                </div>
                <div v-if="isFreeShipping" class="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                  <i class="bi bi-check-circle-fill"></i>
                  از سهمیه ارسال رایگان باشگاه استفاده شد
                </div>
              </template>
            </div>

            <!-- فاکتور قیمت -->
            <div class="bg-[#f0edf7]/70 border border-[#e1daf0] rounded-2xl p-4 space-y-3.5 text-xs">
              <div class="flex justify-between items-center text-gray-700">
                <span>قیمت کالاها</span>
                <span class="font-bold text-gray-900">{{ subtotal.toLocaleString("fa-IR") }} تومان</span>
              </div>
              <div class="flex justify-between items-center text-green-600">
                <span>تخفیف کالاها</span>
                <span class="font-bold">
                  {{
                    discount > 0 ? `-${discount.toLocaleString("fa-IR")}` : "۰"
                  }}
                  تومان
                </span>
              </div>
              <div v-if="apiCouponDiscount > 0" class="flex justify-between items-center text-green-600">
                <span>تخفیف کوپن ({{ couponCode }})</span>
                <span class="font-bold">-{{ apiCouponDiscount.toLocaleString("fa-IR") }} تومان</span>
              </div>
              <div v-if="clubDiscount > 0" class="flex justify-between items-center text-emerald-700">
                <span class="flex items-center gap-1">
                  <i class="bi bi-award"></i>
                  تخفیف باشگاه ({{ clubDiscountPercent }}٪)
                </span>
                <span class="font-bold">
                  -{{ clubDiscount.toLocaleString("fa-IR") }} تومان
                </span>
              </div>
              <div class="flex justify-between items-center text-gray-500">
                <span>هزینه ارسال:</span>
                <span class="text-gray-900 font-bold">
                  {{
                    shippingCost === 0
                      ? "رایگان"
                      : `${shippingCost.toLocaleString("fa-IR")} تومان`
                  }}
                </span>
              </div>
              <div class="border-t border-purple-200/60 pt-2.5">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-gray-900">جمع سبد خرید:</span>
                  <span class="font-bold text-purple-950 text-sm">{{ total.toLocaleString("fa-IR") }} تومان</span>
                </div>
              </div>
            </div>

            <!-- بنر زرد پاداش سکه -->
            <div
              class="bg-[#fff9e6] border border-[#fef08a] rounded-xl px-3 py-2.5 flex items-center justify-between text-sm text-amber-900">
              <span class="text-base">
                <Coin class="w-10" />
              </span>
              <span class="font-medium">با ثبت این سفارش، ۲۹۹ عدد سکه به شما تعلق می‌گیرد!</span>
              <span class="text-base">
                <CoinL class="w-10" />
              </span>
            </div>
          </div>

          <!-- دکمه «پرداخت نهایی»؛ در دسکتاپ هم‌تراز با دکمه سمت چپ -->
          <div class="hidden md:block pt-4">
            <button @click="handlePayment" :disabled="isProcessing" class="btn w-full md:!py-4 disabled:opacity-50">
              <span v-if="isProcessing">در حال پردازش و اتصال...</span>
              <span v-else>پرداخت نهایی</span>
            </button>
          </div>
        </div>
      </div>

      <!-- نوار چسبان (Sticky) پایین موبایل (بدون تغییر) -->
      <div
        class="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40 flex items-center justify-between shadow-lg">
        <button @click="handlePayment" :disabled="isProcessing" class="btn disabled:opacity-50 !px-10">
          <span v-if="isProcessing">در حال انتقال...</span>
          <span v-else>پرداخت</span>
        </button>
        <div class="flex flex-col text-left space-y-2">
          <span class="text-sm text-gray-500">جمع سبد خرید</span>
          <span class="text-base font-bold text-strong">
            {{ total.toLocaleString("fa-IR") }}
            <span class="text-xs font-normal">تومان</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/api/useApi";
import { toast } from "vue3-toastify";
import Coin from "~/components/icon/Coin.vue";
import CoinL from "~/components/icon/CoinL.vue";

definePageMeta({
  middleware: "auth",
});

const { getCheckoutSummary } = useApi();
const { $api } = useNuxtApp();

const paymentMethod = ref("online");
const selectedGateway = ref("zibal");
const cartData = ref(null);
const couponCode = ref("");
const isProcessing = ref(false);
const checkoutSummary = ref(null);
const isFetchingSummary = ref(false);
const shippingInfo = ref(null);
const reservationStorageKey = "selected-reservation";
const selectedReservation = ref(null);
const user_note = ref("");
const reservationType = ref("none");

const getSelectedReservation = () => {
  if (!process.client) return null;
  const saved = localStorage.getItem(reservationStorageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.removeItem(reservationStorageKey);
    return null;
  }
};

const fetchCheckoutSummary = async () => {
  if (
    !shippingInfo.value?.address_id ||
    !shippingInfo.value?.shipping_method_id
  ) {
    return;
  }

  isFetchingSummary.value = true;
  try {
    const response = await getCheckoutSummary({
      address_id: shippingInfo.value.address_id,
      shipping_id: shippingInfo.value.shipping_method_id,
      coupon_code: couponCode.value || "",
      reservation_order_id: selectedReservation.value?.order_id || null,
    });

    checkoutSummary.value = response.data || response;

    if (checkoutSummary.value?.coupon) {
      couponCode.value = checkoutSummary.value.coupon.code || "";
    }
  } catch (err) {
    console.error("❌ Failed to fetch checkout summary:", err);
  } finally {
    isFetchingSummary.value = false;
  }
};
// ===== club info از checkoutSummary =====
const club = computed(() => checkoutSummary.value?.club ?? null);
const clubDiscount = computed(() => checkoutSummary.value?.summary?.club_discount ?? 0);
const clubDiscountPercent = computed(() => checkoutSummary.value?.summary?.club_discount_percent ?? 0);

const clubLevelLabel = computed(() => {
  const level = club.value?.level;
  return { bronze: 'برنز', gold: 'گلد', platinum: 'پلاتینیوم' }[level] ?? level ?? '-';
});

// ===== بررسی اینکه ارسال رایگان انتخاب شده =====
const isFreeShipping = computed(() => {
  if (!shippingInfo.value?.using_free_shipping) return false;
  return club.value?.free_shipping_method_id === shippingInfo.value?.shipping_method_id;
});
onMounted(async () => {
  if (process.client) {
    selectedReservation.value = getSelectedReservation();

    const savedCart = localStorage.getItem("cart-summary");
    if (savedCart) {
      try {
        cartData.value = JSON.parse(savedCart);
        if (cartData.value.couponCode) {
          couponCode.value = cartData.value.couponCode;
        }
      } catch (err) {
        console.error("❌ Failed to parse cart data:", err);
      }
    }

    const savedShipping = localStorage.getItem("shipping-info");
    if (savedShipping) {
      try {
        shippingInfo.value = JSON.parse(savedShipping);
        if (
          shippingInfo.value?.address_id &&
          shippingInfo.value?.shipping_method_id
        ) {
          await fetchCheckoutSummary();
        } else {
          toast.error(
            "اطلاعات آدرس و روش ارسال یافت نشد. لطفاً به مرحله قبل بازگردید.",
          );
        }
      } catch (err) {
        toast.error("خطا در بارگذاری اطلاعات. لطفاً به مرحله قبل بازگردید.");
      }
    } else {
      toast.error(
        "اطلاعات آدرس و روش ارسال یافت نشد. لطفاً به مرحله قبل بازگردید.",
      );
    }
  }
});

const subtotal = computed(() => {
  if (checkoutSummary.value?.summary?.subtotal !== undefined) {
    return checkoutSummary.value.summary.subtotal;
  }
  return cartData.value?.totalPrice || 0;
});

const shippingCost = computed(() => {
  if (checkoutSummary.value?.summary?.shipping_cost !== undefined) {
    return checkoutSummary.value.summary.shipping_cost;
  }
  return 0;
});

const discount = computed(() => {
  if (checkoutSummary.value?.summary?.product_discount !== undefined) {
    return checkoutSummary.value.summary.product_discount;
  }
  return cartData.value?.discount || 0;
});

const apiCouponDiscount = computed(() => {
  if (checkoutSummary.value?.summary?.coupon_discount !== undefined) {
    return checkoutSummary.value.summary.coupon_discount;
  }
  return 0;
});

const total = computed(() => {
  if (checkoutSummary.value?.summary?.payable_amount !== undefined) {
    return checkoutSummary.value.summary.payable_amount;
  }
  return (
    subtotal.value +
    shippingCost.value -
    discount.value -
    apiCouponDiscount.value
  );
});

const selectedAddress = computed(() => {
  return checkoutSummary.value?.address || null;
});

const selectedShippingMethod = computed(() => {
  return checkoutSummary.value?.shipping_method || null;
});

const wallet = computed(() => {
  return checkoutSummary.value?.wallet || null;
});

async function handlePayment() {
  if (isProcessing.value) return;

  if (!selectedAddress.value) {
    toast.error("آدرس تحویل یافت نشد");
    return;
  }

  if (!selectedShippingMethod.value) {
    toast.error("روش ارسال یافت نشد");
    return;
  }

  isProcessing.value = true;

  try {
    const payload = {
      address_id: selectedAddress.value.id,
      gateway: selectedGateway.value,
      user_note: user_note.value,
      shipping_id: selectedShippingMethod.value.id,
      payment_method: paymentMethod.value === "wallet" ? "wallet" : "online",
      coupon_code: couponCode.value.trim() || "",
    };

    if (reservationType.value && reservationType.value !== "none") {
      payload.reservation_type = reservationType.value;
    }

    if (selectedReservation.value?.order_id) {
      payload.parent_order_id = selectedReservation.value.order_id;
    }

    const response = await $api.post("/front/order", payload);

    if (process.client) {
      localStorage.removeItem("selected-reservation");
      localStorage.removeItem("cart-summary");
    }

    if (response.data?.gateway_url) {
      toast.success(
        response.data?.message || "در حال انتقال به درگاه پرداخت...",
      );
      window.location.href = response.data.gateway_url;
    } else {
      toast.success(response.data?.message || "سفارش شما با موفقیت ثبت شد");
      navigateTo("/panel/orders");
    }
  } catch (err) {
    console.error("❌ Order error:", err);
    toast.error(err.response?.data?.message || "خطا در ثبت سفارش");
  } finally {
    isProcessing.value = false;
  }
}
</script>
