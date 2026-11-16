<!-- app/pages/cart.vue -->
<!-- <template>
  <div class="container space-y-10">
    <SharedBreadCrumb :items="[{ label: 'سبد خرید', href: '/cart' }]" />
    <CartProgressSteps :current-step="1" />
    <div
      v-if="showLoader"
      class="pad sjadow rounded mx-auto flex flex-col justify-center items-center w-full"
    >
      <img class="w-[20%]" src="@/assets/images/shopping.png" />
      <h2 class="text-md mb-7 text-muted">در حال دریافت اطلاعات سبد خرید</h2>
      <SharedLoadingSpinner size="lg" />
    </div>
    <template v-else>
      <div
        v-if="cartItems.length === 0"
        class="pad sjadow rounded mx-auto flex flex-col justify-center items-center w-full"
        alt=""
      >
        <img class="w-[20%]" src="@/assets/images/shopping.png" />
        <h2 class="text-md mb-7 text-muted">سبد خرید شما خالی است</h2>
      </div>

      <div v-else class="mb-8">
        <div class="overflow-x-auto">
          <table
            id="cartsTable"
            class="w-full md:min-w-[600px] border-separate border-spacing-y-4"
          >
            <thead>
              <tr class="bg-secondary-fade text-strong">
                <th class="text-right p-4 font-bold rounded-r-xl">
                  سبد خرید شما
                </th>
                <th class="text-center p-4 font-bold hidden md:table-cell">
                  قیمت واحد
                </th>
                <th class="text-center p-4 font-bold hidden md:table-cell">
                  تخفیف
                </th>
                <th class="text-center p-4 font-bold hidden md:table-cell">
                  تعداد
                </th>
                <th class="text-center p-4 font-bold hidden md:table-cell">
                  قیمت نهایی
                </th>
                <th
                  class="text-center p-4 font-bold hidden md:table-cell rounded-l-xl"
                >
                  حذف
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cartItems"
                :key="item.id || item.variant_id"
                class="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow group grid grid-cols-1 md:table-row rounded-xl border border-gray-100 md:border-none"
              >
                <td
                  class="py-4 px-4 md:border-y md:border-r border-gray-200 md:rounded-r-xl"
                >
                  <div class="flex flex-col md:flex-row items-center gap-4">
                    <div
                      class="p-1.5 w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden"
                    >
                      <img
                        v-if="item.image"
                        :src="resolveImage(item.image)"
                        :alt="item.title"
                        class="w-full h-full object-contain"
                      />
                      <span v-else class="text-2xl">📦</span>
                    </div>
                    <div class="flex flex-col gap-1 text-right">
                      <nuxt-link
                        :to="`/product/${item.product_id}`"
                        class="font-bold text-gray-800 hover:text-[#4b3073] text-sm md:text-base transition-colors"
                      >
                        {{ item.title }}
                      </nuxt-link>
                      <p v-if="item.size" class="text-xs text-gray-500">
                        سایز: {{ item.size }}
                      </p>
                      <p v-if="item.color" class="text-xs text-gray-500">
                        رنگ: {{ item.color }}
                      </p>
                      <p
                        class="mt-2 p-1 px-3 border bg-red-600 max-w-fit text-xs rounded-md text-white"
                        v-if="item.alert_message"
                      >
                        {{ item.alert_message }}
                      </p>
                    </div>
                  </div>
                </td>

                <td
                  class="text-center whitespace-nowrap flex items-center justify-between md:table-cell px-4 py-4 md:border-y border-gray-200"
                >
                  <span class="block md:hidden text-muted text-sm"
                    >قیمت اصلی:</span
                  >
                  <span class="text-sm font-medium text-gray-700">
                    {{
                      (
                        item.line_original_total || item.price * item.quantity
                      ).toLocaleString("fa-IR")
                    }}
                    <span class="text-xs text-muted mr-1">تومان</span>
                  </span>
                </td>

                <td
                  class="text-center whitespace-nowrap flex items-center justify-between md:table-cell px-4 py-4 md:border-y border-gray-200"
                >
                  <span class="block md:hidden text-muted text-sm">تخفیف:</span>
                  <span class="text-sm font-medium text-gray-600">
                    {{ (item.line_discount || 0).toLocaleString("fa-IR") }}
                    <span class="text-xs text-muted mr-1">تومان</span>
                  </span>
                </td>

                <td
                  class="text-center whitespace-nowrap flex items-center justify-between md:table-cell px-4 py-4 md:border-y border-gray-200"
                >
                  <span class="block md:hidden text-muted text-sm">تعداد:</span>
                  <div class="flex items-center justify-center gap-2">
                    <div
                      class="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50/50"
                    >
                      <button
                        @click="increaseQuantity(item.id || item.variant_id)"
                        class="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                      >
                        <Plus :size="14" />
                      </button>
                      <span
                        class="w-8 text-center font-bold text-sm text-gray-700"
                        >{{ item.quantity }}</span
                      >
                      <button
                        @click="decreaseQuantity(item.id || item.variant_id)"
                        class="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                      >
                        <Minus :size="14" />
                      </button>
                    </div>
                  </div>
                </td>

                <td
                  class="text-center whitespace-nowrap flex items-center justify-between md:table-cell px-4 py-4 md:border-y border-gray-200"
                >
                  <span class="block md:hidden text-muted text-sm"
                    >قیمت نهایی:</span
                  >
                  <span class="font-bold text-sm text-gray-900">
                    {{
                      (
                        item.line_final_total || item.price * item.quantity
                      ).toLocaleString("fa-IR")
                    }}
                    <span class="text-xs font-normal text-muted mr-1"
                      >تومان</span
                    >
                  </span>
                </td>

                <td
                  class="text-center whitespace-nowrap flex items-center justify-between md:table-cell px-4 py-4 md:border-y md:border-l border-gray-200 md:rounded-l-xl"
                >
                  <span class="block md:hidden text-muted text-sm"
                    >حذف آیتم:</span
                  >
                  <button
                    @click="removeItem(item.id || item.variant_id)"
                    class="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"
                    title="حذف کالا"
                  >
                    <Trash2 :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="mt-6 bg-secondary-fade/30 border-2 border-secondary bg-secondary-fade rounded-xl py-6 px-8 flex flex-col md:flex-row justify-between items-start gap-6"
        >
          <form
            @submit="applyCoupon"
            class="flex gap-3 items-start flex-col w-full md:w-1/2"
          >
            <div class="flex flex-col md:flex-row gap-3 w-full">
              <input
                v-model="couponCode"
                class="bg-white border border-gray-200 py-3 px-4 rounded-xl flex-1 text-sm outline-none focus:border-[#4b3073] transition"
                type="text"
                placeholder="کد تخفیف خود را وارد کنید ..."
                :disabled="isCheckingCoupon"
              />
              <button
                type="submit"
                class="border border-secondary text-[#4b3073] hover:bg-[#4b3073] hover:text-white px-6 py-3 rounded-xl font-bold transition duration-200 text-sm whitespace-nowrap"
                :disabled="isCheckingCoupon"
              >
                {{ isCheckingCoupon ? "در حال بررسی..." : "بررسی کد" }}
              </button>
            </div>
            <p v-if="couponError" class="text-red-500 text-sm">
              {{ couponError }}
            </p>
            <p v-if="couponDiscount > 0" class="text-green-600 text-sm">
              تخفیف کوپن: {{ couponDiscount.toLocaleString("fa-IR") }} تومان
            </p>
          </form>

          <div
            class="w-full md:w-[38%] space-y-4 text-sm pr-3 border-r-2 border-secondary-fade/80"
          >
            <div class="flex justify-between">
              <span class="text-gray-600 font-bold"
                >مجموع قیمت‌های کالا:</span
              >
              <span class="">{{ subtotal.toLocaleString("fa-IR") }} تومان</span>
            </div>
            <div class="flex justify-between">
              <span class="text-green-600 font-bold">تخفیف کالاها:</span>
              <span class="text-green-600"
                >{{ discount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>
            <div
              v-if="couponDiscount > 0"
              class="flex justify-between border-b border-secondary-fade/60"
            >
              <span class="text-gray-600">تخفیف کوپن:</span>
              <span class="font-bold text-green-600"
                >{{ couponDiscount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>
            <div class="flex justify-between text-[#4b3073] font-bold text-lg">
              <span>جمع سبد خرید:</span>
              <span>{{ totalPrice.toLocaleString("fa-IR") }} تومان</span>
            </div>
          </div>
        </div>

        <div
          v-if="
            isLoggedIn &&
            (isLoadingReservations || activeReservations.length > 0)
          "
          class="mt-6 bg-accent-fade rounded-inner p-5"
        >
          <div
            v-if="isLoadingReservations"
            class="flex items-center gap-3 text-muted"
          >
            <div
              class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
            ></div>

            <span>در حال بررسی رزروهای شما...</span>
          </div>

          <template v-else>
            <div class="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 class="font-bold text-lg">رزروهای فعال شما</h3>

                <p class="text-sm text-muted mt-1">
                  در صورت تمایل می‌توانید یکی از رزروهای خود را برای ادامه سفارش
                  انتخاب کنید.
                </p>
              </div>

              <div class="shrink-0 text-sm px-3 py-1 rounded-full bg-primary">
                {{ activeReservations.length }} رزرو فعال
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                v-for="reservation in activeReservations"
                :key="reservation.id"
                type="button"
                @click="selectReservation(reservation)"
                class="text-right border rounded-inner p-4 transition-all duration-200"
                :class="
                  selectedReservation === reservation.id
                    ? 'border-primary ring-2 ring-primary/20 bg-primary'
                    : 'border-gray-200 hover:border-primary hover:bg-primary/50'
                "
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      :class="
                        selectedReservation === reservation.id
                          ? 'border-primary'
                          : 'border-gray-400'
                      "
                    >
                      <div
                        v-if="selectedReservation === reservation.id"
                        class="w-2.5 h-2.5 rounded-full bg-blue-700"
                      ></div>
                    </div>

                    <div>
                      <div class="font-bold">
                        سفارش #{{ reservation.id }}
                      </div>

                      <div class="text-sm text-muted mt-1">
                        {{ reservation.reservation_type_label || "رزرو فعال" }}
                      </div>
                    </div>
                  </div>

                  <div class="text-left">
                    <div class="font-bold">
                      {{
                        Number(reservation.total || 0).toLocaleString("fa-IR")
                      }}
                    </div>

                    <div class="text-xs text-muted">تومان</div>
                  </div>
                </div>

                <div
                  class="mt-4 pt-3 border-t flex items-center justify-between text-sm"
                >
                  <span class="text-muted"> مهلت رزرو </span>

                  <span class="font-medium">
                    {{ formatReservationDate(reservation.reserved_until) }}
                  </span>
                </div>
              </button>
            </div>

            <div class="mt-4 pt-4 border-t">
              <button
                type="button"
                @click="selectReservation(null)"
                class="rounded-xl p-3 text-sm transition"
                :class="
                  selectedReservation === null
                    ? 'text-black font-bold'
                    : 'text-white bg-blue-400'
                "
              >
                ✓ بدون استفاده از رزرو ادامه می‌دهم
              </button>
            </div>
          </template>
        </div>

        <div class="flex justify-end mt-8">
          <button
            @click="goToShipping"
            class="w-full md:w-[50%] btn px-10 !py-4 rounded-xl font-bold transition shadow-md"
          >
            تکمیل سفارش
          </button>
        </div>
      </div>
    </template>
    <AuthLoginModal v-if="loginModal" />
  </div>
</template>

<script setup>
import { Plus, Minus, Trash2 } from "lucide-vue-next";
import { useApi } from "@/composables/api/useApi";
import { computed, ref, onMounted, watch } from "vue";
import { useSettingStore } from "~/store/settings";
import { useAuth } from "~/composables/useAuth";
import { useCartStore } from "~/store/cart";
const route = useRoute();
const { $getImageUrl } = useNuxtApp();

const {
  getCart,
  increaseCartItem,
  decreaseCartItem,
  deleteCartItem,
  checkCoupon,
  getActiveReservations,
} = useApi();
const { loginModal } = useAuth();
const cartStore = useCartStore();
const settingStore = useSettingStore();

const isLoggedIn = computed(() => !!settingStore.user);
const activeReservations = ref([]);
const selectedReservation = ref(null);
const isLoadingReservations = ref(false);

const reservationStorageKey = "selected-reservation";
const token = process.client ? localStorage.getItem("auth-token") : null;
const cacheKey = token ? `cart-${token.substring(0, 10)}` : "cart-guest";
let loading = ref(true);
const showLoader = ref(true);
const { data: cartData, refresh: refreshCart } = await useAsyncData(
  cacheKey,
  async () => {
    loading.value = true;
    const token = process.client ? localStorage.getItem("auth-token") : null;
    if (!token) {
      cartStore.loadFromLocalStorage();
      loading.value = false;
      return {
        items: cartStore.items,
        summary: {
          subtotal: cartStore.subtotal,
          product_discount_total: cartStore.product_discount_total,
        },
      };
    }

    try {
      return await getCart();
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
      return { items: [], summary: { subtotal: 0, product_discount_total: 0 } };
    } finally {
      loading.value = false;
    }
  },
);
watch(
  () => [cartData.value, loading.value, isLoadingReservations.value],
  ([data, isLoading, isResLoading]) => {
    if (!isLoading && !isResLoading && data) {
      setTimeout(() => {
        showLoader.value = false;
      }, 300);
    }
  },
  { immediate: true },
);
const formatReservationDate = (date) => {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("fa-IR");
  } catch {
    return date;
  }
};
watch(
  () => cartData.value?.items,
  (items) => {},
  { deep: true },
);

onMounted(async () => {
  await loadActiveReservations();
  if (process.client) {
    localStorage.removeItem("selected-reservation");
    const token = process.client ? localStorage.getItem("auth-token") : null;
    if (!token) {
      setTimeout(() => {
        refreshCart();
      }, 500);
    }
  }
  showLoader.value = false;
});
const loadActiveReservations = async () => {
  if (!isLoggedIn.value) {
    activeReservations.value = [];
    selectedReservation.value = null;

    if (process.client) {
      localStorage.removeItem(reservationStorageKey);
    }

    return;
  }

  isLoadingReservations.value = true;

  try {
    const result = await getActiveReservations();

    if (result?.success) {
      activeReservations.value = result.data || [];

      // اگر هیچ رزرو فعالی وجود ندارد
      if (activeReservations.value.length === 0) {
        selectedReservation.value = null;

        if (process.client) {
          localStorage.removeItem(reservationStorageKey);
        }

        return;
      }
    } else {
      activeReservations.value = [];
      selectedReservation.value = null;

      if (process.client) {
        localStorage.removeItem(reservationStorageKey);
      }

      return;
    }

    if (process.client) {
      const saved = localStorage.getItem(reservationStorageKey);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          const exists = activeReservations.value.some(
            (reservation) => reservation.id === parsed.order_id,
          );

          if (exists) {
            selectedReservation.value = parsed.order_id;
          } else {
            selectedReservation.value = null;
            localStorage.removeItem(reservationStorageKey);
          }
        } catch (error) {
          console.error("Invalid saved reservation:", error);

          selectedReservation.value = null;
          localStorage.removeItem(reservationStorageKey);
        }
      }
    }
  } catch (error) {
    console.error("❌ Failed to fetch active reservations:", error);

    activeReservations.value = [];
  } finally {
    isLoadingReservations.value = false;
  }
};

const selectReservation = (reservation) => {
  if (!reservation) {
    selectedReservation.value = null;

    if (process.client) {
      localStorage.removeItem(reservationStorageKey);
    }

    return;
  }

  selectedReservation.value = reservation.id;

  if (process.client) {
    localStorage.setItem(
      reservationStorageKey,
      JSON.stringify({
        order_id: reservation.id,
        address_id: reservation.address_id,
        shipping_id: reservation.shipping_id,
        reservation_type: reservation.reservation_type,
        reserved_until: reservation.reserved_until,
        total: reservation.total,
        selected_at: new Date().toISOString(),
      }),
    );
  }
};

const couponCode = ref("");
const couponDiscount = ref(0);
const couponError = ref("");
const isCheckingCoupon = ref(false);

const broadcastCartUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cart-updated"));
};

const extractSizeColor = (item) => {
  let size = item?.size || null;
  let color = item?.color || null;

  const attrs = item?.variant?.attributes || [];

  if (Array.isArray(attrs)) {
    for (const a of attrs) {
      const name = String(a?.name || "").trim();
      const value = a?.value ?? null;
      if (!value) continue;

      if (!size && name.includes("سایز")) size = value;
      if (!color && name.includes("رنگ")) color = value;
    }
  }

  return { size, color };
};

const normalizeCartItem = (item) => {
  const { size, color } = extractSizeColor(item);

  const title =
    item?.title ??
    item?.name ??
    item?.product?.title ??
    item?.product?.name ??
    "";

  const image =
    item?.image ??
    item?.main_image ??
    item?.product?.main_image ??
    item?.variant?.image ??
    "";

  const priceRaw =
    item?.final_price ??
    item?.price ??
    item?.variant?.final_price ??
    item?.variant?.price ??
    item?.product?.final_price ??
    item?.product?.price ??
    item?.product_price ??
    item?.variant_price ??
    item?.unit_price ??
    0;

  const price = Number(priceRaw) || 0;

  return {
    ...item,
    title,
    image,
    price,
    price_final: price,
    size,
    color,
  };
};

const cartItems = computed(() => {
  const items = cartData.value?.items || [];
  const normalized = items.map(normalizeCartItem);
  return normalized;
});

watch(cartItems, (items) => {}, { deep: true, immediate: true });

const subtotal = computed(() => {
  return cartData.value?.summary?.subtotal || 0;
});

const discount = computed(() => {
  return cartData.value?.summary?.product_discount_total || 0;
});

const totalDiscount = computed(() => {
  return discount.value + couponDiscount.value;
});

const totalPrice = computed(() => {
  return subtotal.value - totalDiscount.value;
});

const resolveImage = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return $getImageUrl(src);
};

const updateCartSummaryStorage = () => {
  if (typeof window === "undefined") return;

  const totalQuantity = cartItems.value.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const cartSummary = {
    items: cartItems.value,
    totalQuantity,
    subtotal: subtotal.value,
    product_discount_total: discount.value,
    couponDiscount: couponDiscount.value,
    totalPrice: totalPrice.value,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem("cart-summary", JSON.stringify(cartSummary));
  broadcastCartUpdate();
};

watch(
  [cartItems, subtotal, discount, couponDiscount, totalPrice],
  () => {
    updateCartSummaryStorage();
  },
  { deep: true, immediate: true },
);

const increaseQuantity = async (id) => {
  const token = process.client ? localStorage.getItem("auth-token") : null;

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.increaseQuantity(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await increaseCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    alert("خطا در افزایش تعداد محصول");
  }
};

const decreaseQuantity = async (id) => {
  const token = process.client ? localStorage.getItem("auth-token") : null;

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.decreaseQuantity(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await decreaseCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    console.error("❌ Failed to decrease quantity:", error);
    alert("خطا در کاهش تعداد محصول");
  }
};

const removeItem = async (id) => {
  const token = process.client ? localStorage.getItem("auth-token") : null;

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.removeItem(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await deleteCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    console.error("❌ Failed to remove item:", error);
    alert("خطا در حذف محصول");
  }
};

const applyCoupon = async (event) => {
  event.preventDefault();

  if (!couponCode.value) {
    couponError.value = "لطفاً کد تخفیف را وارد کنید";
    return;
  }

  isCheckingCoupon.value = true;
  couponError.value = "";

  try {
    const result = await checkCoupon(couponCode.value, subtotal.value);

    if (result.success) {
      couponDiscount.value = result.discount || 0;
      alert("کد تخفیف با موفقیت اعمال شد");
    }
  } catch (error) {
    console.error("❌ Coupon check failed:", error);
    couponError.value = error.response?.data?.message || "کد تخفیف نامعتبر است";
    couponDiscount.value = 0;
  } finally {
    isCheckingCoupon.value = false;
  }
};
const goToShipping = () => {
  const totalQuantity = cartItems.value.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const cartSummary = {
    items: cartItems.value,
    totalQuantity,
    subtotal: subtotal.value,
    discount: discount.value,
    couponDiscount: couponDiscount.value,
    couponCode: couponCode.value,
    totalPrice: totalPrice.value,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem("cart-summary", JSON.stringify(cartSummary));
  broadcastCartUpdate();

  const token = localStorage.getItem("auth-token");
  if (!token) {
    const loginModal = useState("loginModal");
    localStorage.setItem("lastPage", route.fullPath);
    loginModal.value = true;
  } else {
    navigateTo("/shipping");
  }
};
</script>

<style scoped>
.border-gradient {
  border: 1px solid;
  border-image-source: linear-gradient(
    90deg,
    rgba(214, 214, 214, 0.2) 0%,
    #5d5d5d 50%,
    rgba(214, 214, 214, 0.2) 100%
  );
}
</style> -->

<!-- app/pages/cart.vue -->
<template>
  <div class="container space-y-6 md:space-y-10 pb-24 md:pb-10" dir="rtl">
    <div class="hidden md:block">
      <SharedBreadCrumb :items="[{ label: 'سبد خرید', href: '/cart' }]" />
    </div>

    <div
      class="flex md:hidden items-center justify-between py-3 border-b border-gray-100"
    >
      <NuxtLink to="/" class="p-1 text-gray-700">
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
      <h1 class="text-base font-bold text-gray-800">سبد خرید</h1>
      <div class="w-5"></div>
    </div>

    <CartProgressSteps :current-step="1" />

    <div
      v-if="showLoader"
      class="pad sjadow rounded mx-auto flex flex-col justify-center items-center w-full py-16"
    >
      <img class="w-32 md:w-[20%]" src="@/assets/images/shopping.png" />
      <h2 class="text-sm md:text-md mb-6 text-muted">
        در حال دریافت اطلاعات سبد خرید
      </h2>
      <SharedLoadingSpinner size="lg" />
    </div>

    <template v-else>
      <div
        v-if="cartItems.length === 0"
        class="pad sjadow rounded mx-auto flex flex-col justify-center items-center w-full py-16"
      >
        <img class="w-32 md:w-[20%]" src="@/assets/images/shopping.png" />
        <h2 class="text-sm md:text-md mb-4 text-muted">
          سبد خرید شما خالی است
        </h2>
        <NuxtLink to="/" class="btn px-6 py-2.5 text-sm rounded-xl"
          >مشاهده فروشگاه</NuxtLink
        >
      </div>

      <div v-else class="space-y-6">
        <div class="block md:hidden space-y-3">
          <div
            v-for="item in cartItems"
            :key="'mob-' + (item.id || item.variant_id)"
            class="bg-white rounded-2xl border border-gray-200/80 p-3 shadow-xs relative"
          >
            <!-- ردیف بالا: دکمه حذف در چپ، اطلاعات کالا در وسط، تصویر در راست -->
            <div
              class="flex items-start flex-row-reverse justify-between gap-3"
            >
              <!-- تصویر کالا سمت راست -->
              <div
                class="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden order-2"
              >
                <img
                  v-if="item.image"
                  :src="resolveImage(item.image)"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-2xl">📦</span>
              </div>

              <div class="flex-1 order-1 min-w-0">
                <div class="flex items-center justify-between mb-3">
                  <div></div>
                  <button
                    @click="removeItem(item.id || item.variant_id)"
                    class="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs font-medium cursor-pointer"
                  >
                    <Trash2 :size="13" />
                    <span>حذف</span>
                  </button>
                </div>

                <NuxtLink
                  :to="`/product/${item.product_id}`"
                  class="font-bold text-gray-800 text-xs sm:text-sm line-clamp-2 leading-snug"
                >
                  {{ item.title }}
                </NuxtLink>

                <div
                  class="flex items-center gap-2 mt-1.5 text-xs text-gray-500 flex-wrap"
                >
                  <span v-if="item.size">سایز: {{ item.size }}</span>
                  <span v-if="item.color">رنگ: {{ item.color }}</span>
                </div>
              </div>
            </div>

            <div class="my-2.5 border-t border-gray-100"></div>

            <div class="flex items-center justify-between gap-2 pt-0.5">
              <div class="flex flex-col items-start">
                <div
                  v-if="item.line_discount > 0"
                  class="flex items-center gap-1.5"
                >
                  <span
                    class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded"
                  >
                    ٪{{
                      Math.round(
                        (item.line_discount / (item.line_original_total || 1)) *
                          100,
                      )
                    }}
                  </span>
                  <span class="text-xs text-gray-400 line-through leading-none">
                    {{
                      (
                        item.line_original_total || item.price * item.quantity
                      ).toLocaleString("fa-IR")
                    }}
                    تومان
                  </span>
                </div>
                <div class="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
                  {{
                    (
                      item.line_final_total || item.price * item.quantity
                    ).toLocaleString("fa-IR")
                  }}
                  <span class="text-[10px] font-normal text-gray-500">
                    تومان
                  </span>
                </div>
              </div>

              <div
                class="flex items-center border border-gray-300 rounded-lg bg-white px-1.5 py-1 gap-2"
              >
                <button
                  @click="increaseQuantity(item.id || item.variant_id)"
                  class="w-5 h-5 flex items-center justify-center text-gray-700 active:scale-90"
                  aria-label="افزایش"
                >
                  <Plus :size="13" />
                </button>
                <span class="w-5 text-center font-bold text-xs text-gray-800">{{
                  item.quantity
                }}</span>
                <button
                  @click="decreaseQuantity(item.id || item.variant_id)"
                  class="w-5 h-5 flex items-center justify-center text-gray-700 active:scale-90"
                  aria-label="کاهش"
                >
                  <Minus :size="13" />
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-gray-200/80 p-3 mt-4">
            <div
              class="flex items-center justify-between gap-1.5 text-xs text-gray-700 font-bold mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <span>کد تخفیف دارید؟</span>
            </div>
            <form @submit.prevent="applyCoupon" class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="کد تخفیف را وارد کنید"
                class="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs flex-1 outline-none text-right"
                :disabled="isCheckingCoupon"
              />
              <button
                type="submit"
                class="border border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition"
                :disabled="isCheckingCoupon"
              >
                {{ isCheckingCoupon ? "بررسی..." : "بررسی کد" }}
              </button>
            </form>
            <p v-if="couponError" class="text-red-500 text-xs mt-1.5">
              {{ couponError }}
            </p>
            <p
              v-if="couponDiscount > 0"
              class="text-green-600 text-xs mt-1.5 font-medium"
            >
              تخفیف کوپن: {{ couponDiscount.toLocaleString("fa-IR") }} تومان
            </p>
          </div>

          <div
            class="bg-[#f0edf7]/70 border border-[#e1daf0] rounded-2xl p-4 space-y-3 mt-4 text-xs"
          >
            <div class="flex justify-between items-center text-gray-700">
              <span>قیمت کالاها ({{ cartItems.length }})</span>
              <span class="font-bold text-gray-900"
                >{{ subtotal.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div class="flex justify-between items-center text-gray-500">
              <span>تخفیف کالاها</span>
              <span class="text-green-600 font-bold"
                >{{ discount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div
              v-if="couponDiscount > 0"
              class="flex justify-between items-center text-gray-500"
            >
              <span>تخفیف کوپن</span>
              <span class="text-green-600 font-bold"
                >{{ couponDiscount.toLocaleString("fa-IR") }} تومان</span
              >
            </div>

            <div class="border-t border-purple-200/60 pt-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-900">جمع سبد خرید:</span>
                <span class="font-bold text-purple-950 text-sm"
                  >{{ totalPrice.toLocaleString("fa-IR") }} تومان</span
                >
              </div>
            </div>
          </div>

          <div
            class="fixed md:hidden bottom-0 left-0 right-0 z-40 px-6 py-4 bg-white border-t border-gray-200 shadow-lg"
          >
            <button @click="goToShipping" class="w-full btn !py-3.5">
              تکمیل سفارش
            </button>
          </div>
        </div>

        <!-- ================= نسخه دسکتاپ (بدون کوچکترین تغییر) ================= -->
        <div class="hidden md:block">
          <div class="overflow-x-auto">
            <table
              id="cartsTable"
              class="w-full min-w-[600px] border-separate border-spacing-y-4"
            >
              <thead>
                <tr class="bg-secondary-fade text-strong">
                  <th class="text-right p-4 font-bold rounded-r-xl">
                    سبد خرید شما
                  </th>
                  <th class="text-center p-4 font-bold">قیمت واحد</th>
                  <th class="text-center p-4 font-bold">تخفیف</th>
                  <th class="text-center p-4 font-bold">تعداد</th>
                  <th class="text-center p-4 font-bold">قیمت نهایی</th>
                  <th class="text-center p-4 font-bold rounded-l-xl">حذف</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in cartItems"
                  :key="item.id || item.variant_id"
                  class="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow group rounded-xl border-none"
                >
                  <td
                    class="py-4 px-4 border-y border-r border-gray-200 rounded-r-xl"
                  >
                    <div class="flex flex-row items-center gap-4">
                      <div
                        class="p-1.5 w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden"
                      >
                        <img
                          v-if="item.image"
                          :src="resolveImage(item.image)"
                          :alt="item.title"
                          class="w-full h-full object-contain"
                        />
                        <span v-else class="text-2xl">📦</span>
                      </div>
                      <div class="flex flex-col gap-1 text-right">
                        <nuxt-link
                          :to="`/product/${item.product_id}`"
                          class="font-bold text-gray-800 hover:text-[#4b3073] text-base transition-colors"
                        >
                          {{ item.title }}
                        </nuxt-link>
                        <p v-if="item.size" class="text-xs text-gray-500">
                          سایز: {{ item.size }}
                        </p>
                        <p v-if="item.color" class="text-xs text-gray-500">
                          رنگ: {{ item.color }}
                        </p>
                        <p
                          class="mt-2 p-1 px-3 border bg-red-600 max-w-fit text-xs rounded-md text-white"
                          v-if="item.alert_message"
                        >
                          {{ item.alert_message }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    class="text-center whitespace-nowrap px-4 py-4 border-y border-gray-200"
                  >
                    <span class="text-sm font-medium text-gray-700">
                      {{
                        (
                          item.line_original_total || item.price * item.quantity
                        ).toLocaleString("fa-IR")
                      }}
                      <span class="text-xs text-muted mr-1">تومان</span>
                    </span>
                  </td>

                  <td
                    class="text-center whitespace-nowrap px-4 py-4 border-y border-gray-200"
                  >
                    <span class="text-sm font-medium text-gray-600">
                      {{ (item.line_discount || 0).toLocaleString("fa-IR") }}
                      <span class="text-xs text-muted mr-1">تومان</span>
                    </span>
                  </td>

                  <td
                    class="text-center whitespace-nowrap px-4 py-4 border-y border-gray-200"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <div
                        class="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50/50"
                      >
                        <button
                          @click="increaseQuantity(item.id || item.variant_id)"
                          class="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                        >
                          <Plus :size="14" />
                        </button>
                        <span
                          class="w-8 text-center font-bold text-sm text-gray-700"
                          >{{ item.quantity }}</span
                        >
                        <button
                          @click="decreaseQuantity(item.id || item.variant_id)"
                          class="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                        >
                          <Minus :size="14" />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td
                    class="text-center whitespace-nowrap px-4 py-4 border-y border-gray-200"
                  >
                    <span class="font-bold text-sm text-gray-900">
                      {{
                        (
                          item.line_final_total || item.price * item.quantity
                        ).toLocaleString("fa-IR")
                      }}
                      <span class="text-xs font-normal text-muted mr-1"
                        >تومان</span
                      >
                    </span>
                  </td>

                  <td
                    class="text-center whitespace-nowrap px-4 py-4 border-y border-l border-gray-200 rounded-l-xl"
                  >
                    <button
                      @click="removeItem(item.id || item.variant_id)"
                      class="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"
                      title="حذف کالا"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="mt-6 bg-secondary-fade/30 border-2 border-[#4b3073] bg-secondary-fade rounded-xl py-6 px-8 flex flex-row justify-between items-start gap-6"
          >
            <form
              @submit.prevent="applyCoupon"
              class="flex gap-3 items-start flex-col w-1/2"
            >
              <div class="flex flex-row gap-3 w-full">
                <input
                  v-model="couponCode"
                  class="bg-white border border-gray-200 py-3 px-4 rounded-xl flex-1 text-sm outline-none focus:border-[#4b3073] transition"
                  type="text"
                  placeholder="کد تخفیف خود را وارد کنید ..."
                  :disabled="isCheckingCoupon"
                />
                <button
                  type="submit"
                  class="border border-secondary text-[#4b3073] hover:bg-[#4b3073] hover:text-white px-6 py-3 rounded-xl font-bold transition duration-200 text-sm whitespace-nowrap"
                  :disabled="isCheckingCoupon"
                >
                  {{ isCheckingCoupon ? "در حال بررسی..." : "بررسی کد" }}
                </button>
              </div>
              <p v-if="couponError" class="text-red-500 text-sm">
                {{ couponError }}
              </p>
              <p v-if="couponDiscount > 0" class="text-green-600 text-sm">
                تخفیف کوپن: {{ couponDiscount.toLocaleString("fa-IR") }} تومان
              </p>
            </form>

            <div class="w-[38%] space-y-4 text-sm pr-3 border-r-2 border-p">
              <div class="flex justify-between">
                <span class="text-gray-600 font-bold"
                  >مجموع قیمت‌های کالا:</span
                >
                <span class=""
                  >{{ subtotal.toLocaleString("fa-IR") }} تومان</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-green-600 font-bold">تخفیف کالاها:</span>
                <span class="text-green-600"
                  >{{ discount.toLocaleString("fa-IR") }} تومان</span
                >
              </div>
              <div
                v-if="couponDiscount > 0"
                class="flex justify-between border-b border-secondary-fade/60"
              >
                <span class="text-gray-600">تخفیف کوپن:</span>
                <span class="font-bold text-green-600"
                  >{{ couponDiscount.toLocaleString("fa-IR") }} تومان</span
                >
              </div>
              <div
                class="flex justify-between text-[#4b3073] font-bold text-lg"
              >
                <span>جمع سبد خرید:</span>
                <span>{{ totalPrice.toLocaleString("fa-IR") }} تومان</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              @click="goToShipping"
              class="w-[50%] btn px-10 !py-4 rounded-xl font-bold transition shadow-md"
            >
              تکمیل سفارش
            </button>
          </div>
        </div>

        <div
          v-if="
            isLoggedIn &&
            (isLoadingReservations || activeReservations.length > 0)
          "
          class="mt-6 bg-accent-fade rounded-inner p-5"
        >
          <div
            v-if="isLoadingReservations"
            class="flex items-center gap-3 text-muted"
          >
            <div
              class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
            ></div>
            <span>در حال بررسی رزروهای شما...</span>
          </div>

          <template v-else>
            <div class="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 class="font-bold text-lg">رزروهای فعال شما</h3>
                <p class="text-sm text-muted mt-1">
                  در صورت تمایل می‌توانید یکی از رزروهای خود را برای ادامه سفارش
                  انتخاب کنید.
                </p>
              </div>

              <div class="shrink-0 text-sm px-3 py-1 rounded-full bg-primary">
                {{ activeReservations.length }} رزرو فعال
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                v-for="reservation in activeReservations"
                :key="reservation.id"
                type="button"
                @click="selectReservation(reservation)"
                class="text-right border rounded-inner p-4 transition-all duration-200"
                :class="
                  selectedReservation === reservation.id
                    ? 'border-primary ring-2 ring-primary/20 bg-primary'
                    : 'border-gray-200 hover:border-primary hover:bg-primary/50'
                "
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      :class="
                        selectedReservation === reservation.id
                          ? 'border-primary'
                          : 'border-gray-400'
                      "
                    >
                      <div
                        v-if="selectedReservation === reservation.id"
                        class="w-2.5 h-2.5 rounded-full bg-blue-700"
                      ></div>
                    </div>

                    <div>
                      <div class="font-bold">سفارش #{{ reservation.id }}</div>
                      <div class="text-sm text-muted mt-1">
                        {{ reservation.reservation_type_label || "رزرو فعال" }}
                      </div>
                    </div>
                  </div>

                  <div class="text-left">
                    <div class="font-bold">
                      {{
                        Number(reservation.total || 0).toLocaleString("fa-IR")
                      }}
                    </div>
                    <div class="text-xs text-muted">تومان</div>
                  </div>
                </div>

                <div
                  class="mt-4 pt-3 border-t flex items-center justify-between text-sm"
                >
                  <span class="text-muted"> مهلت رزرو </span>
                  <span class="font-medium">
                    {{ formatReservationDate(reservation.reserved_until) }}
                  </span>
                </div>
              </button>
            </div>

            <div class="mt-4 pt-4 border-t">
              <button
                type="button"
                @click="selectReservation(null)"
                class="rounded-xl p-3 text-sm transition"
                :class="
                  selectedReservation === null
                    ? 'text-black font-bold'
                    : 'text-white bg-blue-400'
                "
              >
                ✓ بدون استفاده از رزرو ادامه می‌دهم
              </button>
            </div>
          </template>
        </div>
      </div>
    </template>
    <AuthLoginModal v-if="loginModal" />
  </div>
  <div v-if="trendProducts.length" class="max-md:hidden">
    <HomeTrendProducts :trends="trendProducts" />
  </div>
</template>

<script setup>
import { Plus, Minus, Trash2 } from "lucide-vue-next";
import { useApi } from "@/composables/api/useApi";
import { computed, ref, onMounted, watch } from "vue";
import { useSettingStore } from "~/store/settings";
import { useAuth } from "~/composables/useAuth";
import { useCartStore } from "~/store/cart";
import { useHomeStore } from "~/store/home";

const route = useRoute();
const { $getImageUrl } = useNuxtApp();
const homeStore = useHomeStore();

const {
  getCart,
  increaseCartItem,
  decreaseCartItem,
  deleteCartItem,
  checkCoupon,
  getActiveReservations,
  getHome,
} = useApi();
const { loginModal } = useAuth();
const cartStore = useCartStore();
const settingStore = useSettingStore();

const isLoggedIn = computed(() => {
  return !!settingStore.user || !!getAuthToken();
});
const activeReservations = ref([]);
const selectedReservation = ref(null);
const isLoadingReservations = ref(false);

const reservationStorageKey = "selected-reservation";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth-token");
};

const cacheKey = "cart-page";
let loading = ref(true);
const showLoader = ref(true);
const { data: cartData, refresh: refreshCart } = await useAsyncData(
  cacheKey,
  async () => {
    loading.value = true;

    const currentToken = getAuthToken();

    if (!currentToken) {
      cartStore.loadFromLocalStorage();

      loading.value = false;

      return {
        items: cartStore.items,
        summary: {
          subtotal: cartStore.subtotal,
          product_discount_total: cartStore.product_discount_total,
        },
      };
    }

    try {
      return await getCart();
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);

      return {
        items: [],
        summary: {
          subtotal: 0,
          product_discount_total: 0,
        },
      };
    } finally {
      loading.value = false;
    }
  },
);

const { data: trendsHomeData } = await useAsyncData(
  "cart-trends-home-data",
  async () => {
    if (homeStore.home) return homeStore.home;
    const response = await getHome();
    const fetchedData = response?.data?.data || response?.data;
    homeStore.setHome(fetchedData);
    return fetchedData;
  },
);
const trendProducts = computed(
  () => (homeStore.home || trendsHomeData.value)?.is_trends || [],
);

watch(
  () => [cartData.value, loading.value, isLoadingReservations.value],
  ([data, isLoading, isResLoading]) => {
    if (!isLoading && !isResLoading && data) {
      setTimeout(() => {
        showLoader.value = false;
      }, 300);
    }
  },
  { immediate: true },
);
const formatReservationDate = (date) => {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("fa-IR");
  } catch {
    return date;
  }
};
watch(
  () => cartData.value?.items,
  (items) => {},
  { deep: true },
);

onMounted(async () => {
  const currentToken = getAuthToken();

  if (currentToken) {
    await loadActiveReservations();
  } else {
    localStorage.removeItem(reservationStorageKey);
  }

  await refreshCart();

  showLoader.value = false;
});

const loadActiveReservations = async () => {
  if (!isLoggedIn.value) {
    activeReservations.value = [];
    selectedReservation.value = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem(reservationStorageKey);
    }

    return;
  }

  isLoadingReservations.value = true;

  try {
    const result = await getActiveReservations();

    if (result?.success) {
      activeReservations.value = result.data || [];

      if (activeReservations.value.length === 0) {
        selectedReservation.value = null;

        if (typeof window !== "undefined") {
          localStorage.removeItem(reservationStorageKey);
        }

        return;
      }
    } else {
      activeReservations.value = [];
      selectedReservation.value = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem(reservationStorageKey);
      }

      return;
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(reservationStorageKey);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          const exists = activeReservations.value.some(
            (reservation) => reservation.id === parsed.order_id,
          );

          if (exists) {
            selectedReservation.value = parsed.order_id;
          } else {
            selectedReservation.value = null;
            localStorage.removeItem(reservationStorageKey);
          }
        } catch (error) {
          console.error("Invalid saved reservation:", error);

          selectedReservation.value = null;
          localStorage.removeItem(reservationStorageKey);
        }
      }
    }
  } catch (error) {
    console.error("❌ Failed to fetch active reservations:", error);

    activeReservations.value = [];
  } finally {
    isLoadingReservations.value = false;
  }
};

const selectReservation = (reservation) => {
  if (!reservation) {
    selectedReservation.value = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem(reservationStorageKey);
    }

    return;
  }

  selectedReservation.value = reservation.id;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      reservationStorageKey,
      JSON.stringify({
        order_id: reservation.id,
        address_id: reservation.address_id,
        shipping_id: reservation.shipping_id,
        reservation_type: reservation.reservation_type,
        reserved_until: reservation.reserved_until,
        total: reservation.total,
        selected_at: new Date().toISOString(),
      }),
    );
  }
};

const couponCode = ref("");
const couponDiscount = ref(0);
const couponError = ref("");
const isCheckingCoupon = ref(false);

const broadcastCartUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cart-updated"));
};

const extractSizeColor = (item) => {
  let size = item?.size || null;
  let color = item?.color || null;

  const attrs = item?.variant?.attributes || [];

  if (Array.isArray(attrs)) {
    for (const a of attrs) {
      const name = String(a?.name || "").trim();
      const value = a?.value ?? null;
      if (!value) continue;

      if (!size && name.includes("سایز")) size = value;
      if (!color && name.includes("رنگ")) color = value;
    }
  }

  return { size, color };
};

const normalizeCartItem = (item) => {
  const { size, color } = extractSizeColor(item);

  const title =
    item?.title ??
    item?.name ??
    item?.product?.title ??
    item?.product?.name ??
    "";

  const image =
    item?.image ??
    item?.main_image ??
    item?.product?.main_image ??
    item?.variant?.image ??
    "";

  const priceRaw =
    item?.final_price ??
    item?.price ??
    item?.variant?.final_price ??
    item?.variant?.price ??
    item?.product?.final_price ??
    item?.product?.price ??
    item?.product_price ??
    item?.variant_price ??
    item?.unit_price ??
    0;

  const price = Number(priceRaw) || 0;

  return {
    ...item,
    title,
    image,
    price,
    price_final: price,
    size,
    color,
  };
};

const cartItems = computed(() => {
  const items = cartData.value?.items || [];
  const normalized = items.map(normalizeCartItem);
  return normalized;
});

watch(cartItems, (items) => {}, { deep: true, immediate: true });

const subtotal = computed(() => {
  return cartData.value?.summary?.subtotal || 0;
});

const discount = computed(() => {
  return cartData.value?.summary?.product_discount_total || 0;
});

const totalDiscount = computed(() => {
  return discount.value + couponDiscount.value;
});

const totalPrice = computed(() => {
  return subtotal.value - totalDiscount.value;
});

const resolveImage = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return $getImageUrl(src);
};

const updateCartSummaryStorage = () => {
  if (typeof window === "undefined") return;

  const totalQuantity = cartItems.value.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const cartSummary = {
    items: cartItems.value,
    totalQuantity,
    subtotal: subtotal.value,
    product_discount_total: discount.value,
    couponDiscount: couponDiscount.value,
    totalPrice: totalPrice.value,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem("cart-summary", JSON.stringify(cartSummary));
  broadcastCartUpdate();
};

watch(
  [cartItems, subtotal, discount, couponDiscount, totalPrice],
  () => {
    updateCartSummaryStorage();
  },
  { deep: true, immediate: true },
);

const increaseQuantity = async (id) => {
  const token = getAuthToken();

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.increaseQuantity(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await increaseCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    alert("خطا در افزایش تعداد محصول");
  }
};

const decreaseQuantity = async (id) => {
  const token = getAuthToken();

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.decreaseQuantity(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await decreaseCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    console.error("❌ Failed to decrease quantity:", error);
    alert("خطا در کاهش تعداد محصول");
  }
};

const removeItem = async (id) => {
  const token = getAuthToken();

  if (!token) {
    const item = cartStore.items.find(
      (i) => i.id === id || i.variant_id === id,
    );
    if (item) {
      cartStore.removeItem(item.variant_id);
      await refreshCart();
      updateCartSummaryStorage();
    }
    return;
  }

  try {
    await deleteCartItem(id);
    await refreshCart();
    updateCartSummaryStorage();
  } catch (error) {
    console.error("❌ Failed to remove item:", error);
    alert("خطا در حذف محصول");
  }
};

const applyCoupon = async (event) => {
  if (!couponCode.value) {
    couponError.value = "لطفاً کد تخفیف را وارد کنید";
    return;
  }

  isCheckingCoupon.value = true;
  couponError.value = "";

  try {
    const result = await checkCoupon(couponCode.value, subtotal.value);

    if (result.success) {
      couponDiscount.value = result.discount || 0;
      alert("کد تخفیف با موفقیت اعمال شد");
    }
  } catch (error) {
    console.error("❌ Coupon check failed:", error);
    couponError.value = error.response?.data?.message || "کد تخفیف نامعتبر است";
    couponDiscount.value = 0;
  } finally {
    isCheckingCoupon.value = false;
  }
};
const goToShipping = async () => {
  if (cartItems.value.length === 0) {
    return;
  }

  const totalQuantity = cartItems.value.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const cartSummary = {
    items: cartItems.value,
    totalQuantity,
    subtotal: subtotal.value,
    discount: discount.value,
    couponDiscount: couponDiscount.value,
    couponCode: couponCode.value,
    totalPrice: totalPrice.value,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem("cart-summary", JSON.stringify(cartSummary));
  broadcastCartUpdate();

  const currentToken = getAuthToken();

  if (!currentToken) {
    localStorage.setItem("lastPage", route.fullPath);

    // از همان state برگرفته‌شده از useAuth استفاده شود.
    loginModal.value = true;
    return;
  }

  await navigateTo("/shipping");
};
</script>
