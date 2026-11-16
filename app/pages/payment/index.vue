<!-- app/pages/payment/index.vue -->
<!-- <template>
  <div class="container space-y-10">
    <SharedBreadCrumb
      :items="[
        { label: 'سبد خرید', href: '/cart' },
        { label: 'انتخاب آدرس و روش ارسال', href: '/shipping' },
        { label: 'پرداخت', href: '/payment' },
      ]"
    />
    <CartProgressSteps :current-step="3" />

    <div class="bg-primary rounded-inner shadow pad">
      <h2 class="text-xl font-bold mb-6 border-b pb-3">
        انتخاب شیوه پرداخت
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div class="flex flex-col gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-base lg:text-lg">انتخاب روش پرداخت</h3>

            <label
              class="border rounded-inner p-4 cursor-pointer flex items-start gap-3 hover:border-secondary transition-all duration-200"
              :class="{
                'border-secondary bg-secondary-fade':
                  paymentMethod === 'online',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                v-model="paymentMethod"
                class="mt-1 shrink-0"
              />
              <div class="flex-1">
                <div class="flex gap-2 items-center mb-1">
                  <IconPaymentWay />
                  <span class="font-bold text-sm lg:text-base"
                    >پرداخت اینترنتی</span
                  >
                </div>
                <span class="text-muted text-xs lg:text-sm"
                  >پرداخت با کلیه کارت‌های عضو شتاب</span
                >
              </div>
            </label>

            <label
              v-if="wallet && wallet.balance"
              class="border rounded-inner p-4 cursor-pointer flex items-start gap-3 hover:border-secondary transition-all duration-200"
              :class="{
                'border-secondary bg-secondary-fade':
                  paymentMethod === 'wallet',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                v-model="paymentMethod"
                class="mt-1 shrink-0"
              />
              <div class="flex-1">
                <div class="flex gap-2 items-center mb-1">
                  <IconPaymentWay />
                  <span class="font-bold text-sm lg:text-base"
                    >پرداخت از کیف پول</span
                  >
                </div>
                <span class="text-muted text-xs lg:text-sm"
                  >استفاده از موجودی کیف پول شما({{
                    wallet.balance.toLocaleString("fa-IR")
                  }}
                  تومان)</span
                >
              </div>
            </label>
            <label
              class="border rounded-inner p-4 cursor-pointer flex items-start gap-3 hover:border-secondary transition-all duration-200"
              :class="{
                'border-secondary bg-white': paymentMethod === 'card_transfer',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card_transfer"
                v-model="paymentMethod"
                class="mt-1 shrink-0"
              />
              <div class="flex-1">
                <div class="flex gap-2 items-center mb-1">
                  <IconPaymentWay />
                  <span
                    class="fa font-bold text-sm lg:text-base text-black transition-colors duration-200"
                  >
                    کارت به کارت
                  </span>
                </div>
                <span class="fa text-muted text-xs lg:text-sm"
                  >پرداخت از طریق کارت به کارت و آپلود رسید</span
                >
              </div>
            </label>
          </div>

          <div v-if="paymentMethod === 'online'" class="space-y-3">
            <h3 class="font-bold text-base lg:text-lg">انتخاب درگاه پرداخت</h3>
            <div class="flex gap-4 flex-wrap">
              <button
                type="button"
                aria-label="انتخاب درگاه پارسیان"
                :class="[
                  'relative rounded-xl h-[100px] w-[140px] p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105',
                  selected === 1
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-accent text-black border border-accent',
                ]"
                @click="selected = 1"
              >
                <span class="text-xs lg:text-sm font-medium mt-8"
                  >درگاه پارسیان</span
                >
              </button>
              <button
                type="button"
                aria-label="انتخاب درگاه زرین‌پال"
                :class="[
                  'relative rounded-xl h-[100px] w-[140px] p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105',
                  selected === 2
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-accent text-black border border-accent',
                ]"
                @click="selected = 2"
              >
                <span class="text-xs lg:text-sm font-medium mt-8"
                  >درگاه زرین‌پال</span
                >
              </button>
            </div>
            <div class="bg-red-200 text-black rounded-2xl p-3 px-5">
              بسته به حجم سفارشات شما عزیزان متعاقبا بسته های ارسالی تان بین 24
              تا 48 ساعت زمان برای بسته بندی و ارسال نیاز دارد
            </div>
            <div class="flex flex-col gap-2">
              <label for="">توضیحات سفارش:</label>
              <textarea
                name=""
                class="resize-none w-full p-3 rounded-xl border-1 border-gray-500"
                id=""
                v-model="user_note"
                placeholder="توضیحات خود را در خصوص سفارش وارد کنید"
              ></textarea>
            </div>
          </div>
          <div
            v-if="paymentMethod === 'card_transfer'"
            class="mt-4 p-4 bg-yellow-50 rounded-inner border border-yellow-300"
          >
            <p class="text-sm text-yellow-800">
              <span class="font-bold">راهنمای پرداخت کارت به کارت:</span>
            </p>
            <ul class="text-xs text-yellow-700 mt-2 space-y-2">
              <li>پس از ثبت سفارش، مبلغ را به یکی از روش‌های زیر واریز کنید</li>

              <li
                class="flex items-center justify-between bg-white/50 p-2 rounded-inner"
              >
                <div>
                  <span class="font-bold">شماره کارت: </span>
                  <span class="font-mono" dir="ltr">{{ bankCardNumber }}</span>
                </div>
                <button
                  @click="copyText(bankCardNumber)"
                  class="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                >
                  کپی
                </button>
              </li>

              <li
                class="flex items-center justify-between bg-white/50 p-2 rounded-inner"
              >
                <div>
                  <span class="font-bold">شماره حساب: </span>
                  <span class="font-mono" dir="ltr">{{
                    bankAccountNumber
                  }}</span>
                </div>
                <button
                  @click="copyText(bankAccountNumber)"
                  class="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                >
                  کپی
                </button>
              </li>

              <li
                class="flex items-center justify-between bg-white/50 p-2 rounded-inner"
              >
                <div>
                  <span class="font-bold">شماره شبا: </span>
                  <span class="font-mono" dir="ltr">{{ bankShebaNumber }}</span>
                </div>
                <button
                  @click="copyText(bankShebaNumber)"
                  class="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                >
                  کپی
                </button>
              </li>

              <li class="text-xs text-gray-600 mt-2">
                <span class="font-bold">صاحب حساب: </span>
                {{ bankAccountOwner }}
              </li>

              <li class="text-red-600 font-bold text-sm mt-2">
                ⚠️ توجه: پس از واریز، رسید را در صفحه سفارش آپلود کنید. برای ثبت
                رسید تا 15 دقیقه بعد از سفارش زمان دارید!
              </li>
            </ul>
          </div>
          <nuxt-link
            to="/shipping"
            class="btnborderBlack w-full mt-auto text-center"
          >
            مرحله قبل
          </nuxt-link>
        </div>

        <div class="space-y-4 flex flex-col">
          <div
            class="grid grid-cols-1 gap-4"
            :class="[
              selectedReservation && selectedReservation.order_id
                ? 'md:grid-cols-1'
                : 'md:grid-cols-3',
            ]"
          >
            <label
              class="border rounded-inner p-4 cursor-pointer transition"
              :class="{
                'border-secondary bg-secondary-fade':
                  reservationType === 'none',
              }"
            >
              <div class="flex items-center gap-3">
                <input
                  v-model="reservationType"
                  type="radio"
                  value="none"
                  name="reservation_type"
                />

                <div>
                  <div class="font-bold">سفارش عادی</div>

                  <div class="text-xs text-muted mt-1">
                    بدون رزرو
                    {{
                      selectedReservation && selectedReservation.order_id
                        ? ` به همراه سفارش
                    ${selectedReservation.order_id}`
                        : ""
                    }}
                  </div>
                </div>
              </div>
            </label>

            <label
              v-if="!selectedReservation || !selectedReservation.order_id"
              class="border rounded-inner p-4 cursor-pointer transition"
              :class="{
                'border-secondary bg-secondary-fade':
                  reservationType === 'three_days',
              }"
            >
              <div class="flex items-center gap-3">
                <input
                  v-model="reservationType"
                  type="radio"
                  value="three_days"
                  name="reservation_type"
                />

                <div>
                  <div class="font-bold">رزرو ۳ روزه</div>

                  <div class="text-xs text-muted mt-1">
                    رزرو سفارش برای ۳ روز
                  </div>
                </div>
              </div>
            </label>

            <label
              v-if="!selectedReservation || !selectedReservation.order_id"
              class="border rounded-inner p-4 cursor-pointer transition"
              :class="{
                'border-secondary bg-secondary-fade':
                  reservationType === 'seven_days',
              }"
            >
              <div class="flex items-center gap-3">
                <input
                  v-model="reservationType"
                  type="radio"
                  value="seven_days"
                  name="reservation_type"
                />

                <div>
                  <div class="font-bold">رزرو ۷ روزه</div>

                  <div class="text-xs text-muted mt-1">
                    رزرو سفارش برای ۷ روز
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div
            v-if="isFetchingSummary"
            class="bg-accent rounded-inner p-4 text-center"
          >
            <SharedLoadingSpinner size="sm" />
          </div>
          <div
            v-else-if="selectedAddress"
            class="bg-accent rounded-inner p-4 text-xs lg:text-sm leading-relaxed space-y-2"
          >
            <p
              class="font-bold text-sm lg:text-base mb-3 flex items-center gap-2"
            >
              <IconLocAdders class="shrink-0" />
              <span>مشخصات تحویل گیرنده</span>
            </p>
            <p>
              <span class="text-muted ml-1">نام:</span>
              <span class="font-bold text-secondary">{{
                selectedAddress.receiver_name
              }}</span>
            </p>
            <p>
              <span class="text-muted ml-1">آدرس:</span>
              <span class="font-medium">
                {{ selectedAddress.province?.name }}
                -
                {{ selectedAddress.city?.name }}
                ,
                {{ selectedAddress.address_line }}
              </span>
            </p>
            <p>
              <span class="text-muted ml-1">شماره تماس:</span>
              <span class="font-medium">{{ selectedAddress.phone }}</span>
            </p>
          </div>
          <div
            v-else
            class="bg-accent rounded-inner p-4 text-center text-xs lg:text-sm text-muted"
          >
            اطلاعات آدرس یافت نشد
          </div>

          <div class="bg-accent rounded-inner p-4 space-y-3 text-xs lg:text-sm">
            <h3 class="font-bold text-sm lg:text-base mb-3">خلاصه سفارش</h3>

            <div class="flex justify-between items-center">
              <span class="text-muted">مجموع قیمت کالاها:</span>
              <span class="font-medium"
                >{{ subtotal.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div
              class="flex justify-between items-center"
              :class="discount > 0 ? 'text-red-500' : 'text-muted'"
            >
              <span>تخفیف محصولات:</span>
              <span class="font-medium"
                >{{ discount > 0 ? "-" : "" }}
                {{ discount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div
              v-if="apiCouponDiscount > 0"
              class="flex justify-between items-center text-green-600"
            >
              <span>تخفیف کوپن ({{ couponCode }}):</span>
              <span class="font-bold"
                >- {{ apiCouponDiscount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div class="flex justify-between items-center">
              <span class="text-muted">هزینه ارسال:</span>
              <span
                class="font-medium"
                :class="shippingCost === 0 ? 'text-green-600' : ''"
              >
                {{
                  shippingCost === 0
                    ? "رایگان"
                    : `${shippingCost.toLocaleString("fa-IR")} تومان`
                }}
              </span>
            </div>

            <div class="border-t my-2 border-muted"></div>

            <div
              class="flex justify-between items-center font-bold text-base lg:text-lg"
            >
              <span>پرداخت نهایی:</span>
              <span class="text-secondary"
                >{{ total.toLocaleString("fa-IR") }} تومان</span
              >
            </div>
          </div>

          <button
            v-if="paymentMethod !== 'card_transfer'"
            @click="handlePayment"
            :disabled="isProcessing"
            :class="[
              'btn w-full',
              isProcessing ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            <span v-if="isProcessing">در حال پردازش...</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span>تکمیل و پرداخت</span>
              <span>←</span>
            </span>
          </button>
          <button
            v-else
            @click="handleCardTransferOrder"
            :disabled="isProcessing"
            :class="[
              'btn w-full bg-yellow-600 hover:bg-yellow-700',
              isProcessing ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            <span v-if="isProcessing">در حال ثبت سفارش...</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span>ثبت سفارش کارت به کارت</span>
              <span>←</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/api/useApi";
import { toast } from "vue3-toastify";

definePageMeta({
  middleware: "auth",
});

const { getCheckoutSummary } = useApi();
const { $api } = useNuxtApp();

const paymentMethod = ref("online");
const selected = ref(1);
const cartData = ref(null);
const couponCode = ref("");
const isProcessing = ref(false);
const checkoutSummary = ref(null);
const isFetchingSummary = ref(false);
const shippingInfo = ref(null);
const reservationStorageKey = "selected-reservation";
const selectedReservation = ref(null);
let user_note = ref("");

const bankCardNumber = ref("5894-6311-7108-1854");
const bankAccountNumber = ref("4006051640119");
const bankShebaNumber = ref("IR780130100000000333237675");
const bankAccountOwner = ref("مهدیه خراسانی - بانک رفاه");
const copyText = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("متن با موفقیت کپی شد");
      })
      .catch(() => {
        copyTextFallback(text);
      });
  } else {
    copyTextFallback(text);
  }
};

const copyTextFallback = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    toast.success("متن با موفقیت کپی شد");
  } catch (err) {
    toast.error("خطا در کپی متن");
  }
  document.body.removeChild(textarea);
};

async function handleCardTransferOrder() {
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
      shipping_id: selectedShippingMethod.value.id,
      payment_method: "card_transfer",
      coupon_code: couponCode.value.trim() || "",
    };

    const response = await $api.post("/front/card-transfer/order", payload);

    toast.success(response.data?.message || "سفارش با موفقیت ثبت شد");

    localStorage.removeItem("cart-summary");

    navigateTo(`/panel/order/${response.data.order_id}`);
  } catch (err) {
    console.error("❌ Card transfer order error:", err);
    toast.error(err.response?.data?.message || "خطا در ثبت سفارش");
  } finally {
    isProcessing.value = false;
  }
}
const getSelectedReservation = () => {
  if (!process.client) {
    return null;
  }

  const saved = localStorage.getItem(reservationStorageKey);

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Invalid reservation storage:", error);

    localStorage.removeItem(reservationStorageKey);

    return null;
  }
};
onMounted(async () => {
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
      console.error("❌ Failed to parse shipping data:", err);
      toast.error("خطا در بارگذاری اطلاعات. لطفاً به مرحله قبل بازگردید.");
    }
  } else {
    toast.error(
      "اطلاعات آدرس و روش ارسال یافت نشد. لطفاً به مرحله قبل بازگردید.",
    );
  }
});
const reservationType = ref("none");
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

const totalDiscount = computed(() => {
  if (checkoutSummary.value?.summary?.coupon_discount !== undefined) {
    return discount.value + checkoutSummary.value.summary.coupon_discount;
  }
  return discount.value;
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
  return subtotal.value + shippingCost.value - totalDiscount.value;
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

const getSelectedGateway = () => {
  const gatewayMap = {
    1: "parsian",
    2: "zarinpal",
    3: "zibal",
  };
  return gatewayMap[selected.value] || "parsian";
};
async function handlePayment() {
  const { $api } = useNuxtApp();

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
      gateway: getSelectedGateway(),
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
    }
    localStorage.removeItem("cart-summary");
    if (response.data?.gateway_url) {
      toast.error(
        response.data?.message ||
          "سفارش شما با موفقیت ثبت شد , در حال انتقال به درگاه",
      );
      window.location.href = response.data.gateway_url;
    } else {
      toast.error(response.data?.message || "سفارش شما با موفقیت ثبت شد ");
      navigateTo("/panel/orders");
    }
  } catch (err) {
    console.error("❌ Order error:", err);
    toast.error(err.response?.data?.message || "خطا در ثبت سفارش");
  } finally {
    isProcessing.value = false;
  }
}
</script> -->

<!-- app/pages/payment/index.vue -->
<template>
  <div class="container space-y-6 md:space-y-10 pb-28 md:pb-10" dir="rtl">
    <!-- هدر دسکتاپ -->
    <div class="hidden md:block">
      <SharedBreadCrumb
        :items="[
          { label: 'سبد خرید', href: '/cart' },
          { label: 'انتخاب آدرس و روش ارسال', href: '/shipping' },
          { label: 'پرداخت', href: '/payment' },
        ]"
      />
    </div>

    <!-- هدر موبایل مطابق فیگما -->
    <div
      class="flex md:hidden items-center justify-between py-3 border-b border-gray-100"
    >
      <NuxtLink to="/shipping" class="p-1 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 rotate-180"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
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

              <div
                class="bg-[#f7f7f9] border border-gray-200/80 rounded-2xl p-3 md:p-5 space-y-3"
              >
                <!-- درگاه زیبال -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="
                    selectedGateway === 'zibal'
                      ? 'border-gray-800 ring-1 ring-gray-800'
                      : 'border-gray-200'
                  "
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-blue-800 text-xs"
                    >
                      زیبال
                    </span>
                    <div class="text-right">
                      <span
                        class="font-bold text-xs sm:text-sm text-gray-900 block"
                        >درگاه پرداخت زیبال</span
                      >
                      <span class="text-xs text-gray-400"
                        >تمام کارت‌های عضو شتاب</span
                      >
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gateway"
                      value="zibal"
                      v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </label>

                <!-- درگاه پارسیان -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="
                    selectedGateway === 'parsian'
                      ? 'border-gray-800 ring-1 ring-gray-800'
                      : 'border-gray-200'
                  "
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center font-bold text-red-600 text-xs"
                    >
                      پارسیان
                    </span>
                    <div class="text-right">
                      <span
                        class="font-bold text-xs sm:text-sm text-gray-900 block"
                        >درگاه پرداخت پارسیان</span
                      >
                      <span class="text-xs text-gray-400"
                        >تمام کارت‌های عضو شتاب</span
                      >
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gateway"
                      value="parsian"
                      v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </label>

                <!-- درگاه زرین پال -->
                <label
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="
                    selectedGateway === 'zarinpal'
                      ? 'border-gray-800 ring-1 ring-gray-800'
                      : 'border-gray-200'
                  "
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center font-bold text-yellow-600 text-xs"
                    >
                      زرین
                    </span>
                    <div class="text-right">
                      <span
                        class="font-bold text-xs sm:text-sm text-gray-900 block"
                        >درگاه پرداخت زرین‌پال</span
                      >
                      <span class="text-xs text-gray-400"
                        >تمام کارت‌های عضو شتاب</span
                      >
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gateway"
                      value="zarinpal"
                      v-model="selectedGateway"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </label>

                <!-- کیف پول -->
                <label
                  v-if="wallet && wallet.balance"
                  class="bg-white border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-xs"
                  :class="
                    paymentMethod === 'wallet'
                      ? 'border-gray-800 ring-1 ring-gray-800'
                      : 'border-gray-200'
                  "
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center font-bold text-emerald-600 text-xs"
                    >
                      کیف
                    </span>
                    <div class="text-right">
                      <span
                        class="font-bold text-xs sm:text-sm text-gray-900 block"
                        >پرداخت از کیف پول</span
                      >
                      <span class="text-xs text-gray-400"
                        >موجودی:
                        {{ wallet.balance.toLocaleString("fa-IR") }} تومان</span
                      >
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethodType"
                      value="wallet"
                      :checked="paymentMethod === 'wallet'"
                      @change="paymentMethod = 'wallet'"
                      class="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </label>
              </div>

              <!-- توضیحات سفارش اختیاری -->
              <div class="flex flex-col gap-1.5 pt-2">
                <label class="text-xs font-bold text-gray-700"
                  >یادداشت سفارش (اختیاری):</label
                >
                <textarea
                  v-model="user_note"
                  rows="2"
                  class="resize-none w-full p-3 rounded-xl border border-gray-200 text-xs outline-none bg-white"
                  placeholder="اگر توضیحی در خصوص بسته‌بندی یا زمان تحویل دارید بنویسید..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- دکمه «مرحله قبل»؛ در دسکتاپ به کفِ ستون می‌چسبد -->
          <div class="hidden md:block pt-4">
            <NuxtLink
              to="/shipping"
              class="btnborderBlack w-full block md:!py-4 text-center"
            >
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

              <div
                v-if="isFetchingSummary"
                class="text-center py-4 bg-white rounded-2xl border border-gray-100"
              >
                <SharedLoadingSpinner size="sm" />
              </div>

              <template v-else>
                <!-- آدرس انتخاب شده -->
                <div
                  v-if="selectedAddress"
                  class="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xs text-right space-y-2"
                >
                  <div class="flex items-center gap-1.5 text-gray-400 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
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
                <div
                  v-if="selectedShippingMethod"
                  class="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xs text-right flex flex-col items-start gap-3"
                >
                  <div class="space-y-2">
                    <div
                      class="flex items-center gap-1.5 text-gray-400 text-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                      <span>شیوه ارسال</span>
                    </div>
                    <p class="text-xs font-bold text-gray-800">
                      {{ selectedShippingMethod.name }}
                      <span v-if="shippingCost > 0"
                        >-
                        {{ shippingCost.toLocaleString("fa-IR") }} تومان</span
                      >
                      <span v-else>- رایگان</span>
                    </p>
                  </div>
                  <div
                    class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 p-1"
                  >
                    <img
                      src="@/assets/images/shopping.png"
                      class="w-full h-full object-contain"
                      alt="ارسال"
                      onerror="this.style.display = 'none'"
                    />
                  </div>
                </div>
              </template>
            </div>

            <!-- فاکتور قیمت -->
            <div
              class="bg-[#f0edf7]/70 border border-[#e1daf0] rounded-2xl p-4 space-y-3.5 text-xs"
            >
              <div class="flex justify-between items-center text-gray-700">
                <span>قیمت کالاها</span>
                <span class="font-bold text-gray-900"
                  >{{ subtotal.toLocaleString("fa-IR") }} تومان</span
                >
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
              <div
                v-if="apiCouponDiscount > 0"
                class="flex justify-between items-center text-green-600"
              >
                <span>تخفیف کوپن ({{ couponCode }})</span>
                <span class="font-bold"
                  >-{{ apiCouponDiscount.toLocaleString("fa-IR") }} تومان</span
                >
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
                  <span class="font-bold text-purple-950 text-sm"
                    >{{ total.toLocaleString("fa-IR") }} تومان</span
                  >
                </div>
              </div>
            </div>

            <!-- بنر زرد پاداش سکه -->
            <div
              class="bg-[#fff9e6] border border-[#fef08a] rounded-xl px-3 py-2.5 flex items-center justify-between text-sm text-amber-900"
            >
              <span class="text-base"><Coin class="w-10" /></span>
              <span class="font-medium"
                >با ثبت این سفارش، ۲۹۹ عدد سکه به شما تعلق می‌گیرد!</span
              >
              <span class="text-base"><CoinL class="w-10" /></span>
            </div>
          </div>

          <!-- دکمه «پرداخت نهایی»؛ در دسکتاپ هم‌تراز با دکمه سمت چپ -->
          <div class="hidden md:block pt-4">
            <button
              @click="handlePayment"
              :disabled="isProcessing"
              class="btn w-full md:!py-4 disabled:opacity-50"
            >
              <span v-if="isProcessing">در حال پردازش و اتصال...</span>
              <span v-else>پرداخت نهایی</span>
            </button>
          </div>
        </div>
      </div>

      <!-- نوار چسبان (Sticky) پایین موبایل (بدون تغییر) -->
      <div
        class="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40 flex items-center justify-between shadow-lg"
      >
        <button
          @click="handlePayment"
          :disabled="isProcessing"
          class="btn disabled:opacity-50 !px-10"
        >
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
