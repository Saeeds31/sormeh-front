<!-- <script setup>
import { ref, computed, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";
import { useApi } from "@/composables/api/useApi";

definePageMeta({
  middleware: "auth",
});

const { addresses, loading, error, fetchAddresses, deleteAddress } =
  useAddresses();
const {
  shippingMethods,
  fetchShippingMethods,
  loading: shippingLoading,
} = useShipping();

const { getOrder } = useApi();
const showAddressModal = ref(false);
const editingAddress = ref(null);
const selectedAddress = ref(null);
const selectedShipping = ref(1);

const cartData = ref(null);
const subtotal = ref(900000);
const reservationStorageKey = "selected-reservation";

const selectedReservation = ref(null);
const reservationMode = ref(false);
const loadSelectedReservation = () => {
  if (!process.client) {
    return null;
  }

  const saved = localStorage.getItem(reservationStorageKey);

  if (!saved) {
    return null;
  }

  try {
    const reservation = JSON.parse(saved);

    if (!reservation?.order_id) {
      localStorage.removeItem(reservationStorageKey);
      return null;
    }

    selectedReservation.value = reservation;
    reservationMode.value = true;

    return reservation;
  } catch (error) {
    console.error("Invalid reservation data:", error);

    localStorage.removeItem(reservationStorageKey);

    selectedReservation.value = null;
    reservationMode.value = false;

    return null;
  }
};
const loadReservationOrder = async () => {
  const reservation = loadSelectedReservation();

  if (!reservation) {
    return;
  }

  try {
    const response = await getOrder(reservation.order_id);

    const order = response?.data;

    if (!order) {
      return;
    }

    selectedAddress.value = order.address_id;

    const reservationAddress = addresses.value.find(
      (address) => address.id === order.address_id,
    );

    if (reservationAddress) {
      selectedAddress.value = reservationAddress.id;
    }
  } catch (error) {
    console.error("Failed to load reservation order:", error);
  }
};
watch(selectedAddress, async (newAddressId, oldAddressId) => {
  if (newAddressId && newAddressId !== oldAddressId) {
    await fetchShippingMethods(
      newAddressId,
      selectedReservation.value?.order_id,
    );

    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
});

onMounted(async () => {
  loadReservationOrder();
  const savedCart = localStorage.getItem("cart-summary");
  if (savedCart) {
    try {
      cartData.value = JSON.parse(savedCart);
      subtotal.value = cartData.value.totalPrice || 900000;
    } catch (err) {
      console.error("❌ Failed to parse cart data:", err);
    }
  }

  await fetchAddresses();

  if (addresses.value.length > 0) {
    selectedAddress.value = addresses.value[0].id;
  }

  if (selectedAddress.value) {
    await fetchShippingMethods(
      selectedAddress.value,
      selectedReservation.value?.order_id,
    );

    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
});

const shippingCost = computed(() => {
  const method = shippingMethods.value.find(
    (m) => m.id === selectedShipping.value,
  );
  return method ? method.cost : 0;
});

const total = computed(() => subtotal.value + shippingCost.value);

async function handleDeleteAddress(id) {
  const shouldDelete = confirm(
    "آیا مطمئن هستید که می‌خواهید این آدرس را حذف کنید؟",
  );

  if (shouldDelete) {
    try {
      await deleteAddress(id);
      if (selectedAddress.value === id && addresses.value.length > 0) {
        selectedAddress.value = addresses.value[0].id;
      }

      toast.success("آدرس با موفقیت حذف شد");
    } catch (err) {
      toast.error("خطا در حذف آدرس");
    }
  }
}

async function addNewAddress() {
  await fetchAddresses();
  showAddressModal.value = false;
  editingAddress.value = null;
  if (addresses.value.length > 0) {
    selectedAddress.value = addresses.value[0].id;
  }

  if (selectedAddress.value) {
    await fetchShippingMethods(
      selectedAddress.value,
      selectedReservation.value?.order_id,
    );
    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
}

function openEditModal(address) {
  editingAddress.value = address;
  showAddressModal.value = true;
}

function openNewAddressModal() {
  editingAddress.value = null;
  showAddressModal.value = true;
}

async function handleNextStep() {
  const { $api } = useNuxtApp();

  if (!selectedAddress.value) {
    toast.error("لطفاً یک آدرس انتخاب کنید");
    return;
  }

  if (!selectedShipping.value) {
    toast.error("لطفاً یک روش ارسال انتخاب کنید");
    return;
  }

  try {
    const response = await $api.post("/front/shippings", {
      address_id: selectedAddress.value,
      shipping_method: selectedShipping.value,
    });

    localStorage.setItem(
      "shipping-info",
      JSON.stringify({
        address_id: selectedAddress.value,
        shipping_method_id: selectedShipping.value,
      }),
    );

    navigateTo("/payment");
  } catch (err) {
    console.error("❌ Shipping error:", err);
    toast.error(err.response?.data?.message || "خطا در ثبت اطلاعات ارسال");
  }
}
</script>

<template>
  <div class="container space-y-10">
    <SharedBreadCrumb
      :items="[
        { label: 'سبد خرید', href: '/cart' },
        { label: 'انتخاب آدرس و روش ارسال', href: '/shipping' },
      ]"
    />
    <CartProgressSteps :current-step="2" />

    <div class="lg:col-span-2 space-y-6">
      <div
        class="flex items-center justify-between bg-secondary-fade border pad rounded-inner"
      >
        <div>
          <h3 class="font-bold text-xs md:text-lg text-strong">
            مکان تحویل سفارش
          </h3>

          <p v-if="reservationMode" class="text-xs text-muted text-strong">
            آدرس مربوط به سفارش رزرو شده
          </p>
        </div>

        <button
          v-if="!reservationMode"
          @click="openNewAddressModal"
          class="flex items-center gap-2 bg-secondary-fade py-2 px-4 rounded-inner hover:bg-secondary cursor-pointer"
        >
          <IconPlusBorder />
          <span class="text-xs md:text-sm"> افزودن آدرس جدید </span>
        </button>
      </div>

      <div v-if="loading" class="text-center py-10">
        <SharedLoadingSpinner size="lg" />
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-500">
        {{ error }}
      </div>

      <div
        v-else-if="addresses.length === 0"
        class="flex flex-col items-center justify-center py-16 px-4 space-y-4"
      >
        <div
          class="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="text-center space-y-1">
          <p
            class="font-bold text-sm md:text-base text-gray-800 dark:text-zinc-200"
          >
            آدرسی وجود ندارد
          </p>
          <p class="text-xs text-gray-500 dark:text-zinc-400">
            برای انجام راحت‌تر سفارش می‌توانید آدرس‌های منتخب خود را اینجا اضافه
            کنید.
          </p>
        </div>
        <button
          @click="openNewAddressModal"
          class="flex items-center gap-2 btn rounded-xl text-xs md:text-sm transition cursor-pointer"
        >
          <IconPlusBorder class="w-4 h-4 !text-white" />
          <span>افزودن آدرس جدید</span>
        </button>
      </div>

      <div v-else-if="reservationMode" class="border-b pb-10">
        <div
          v-for="address in addresses.filter(
            (address) => address.id === selectedAddress,
          )"
          :key="address.id"
          class="border border-secondary rounded-inner pad bg-secondary-fade"
        >
          <div class="flex items-start gap-3 md:gap-4">
            <div class="mt-1 shrink-0">
              <div
                class="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center"
              >
                <div class="w-2.5 h-2.5 rounded-full bg-secondary"></div>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm text-muted mb-2 flex gap-2">
                <IconLocAdders />
                <span>{{ address.address_line }}</span>
              </p>

              <p class="text-sm text-muted flex mb-2 gap-2 items-center">
                <IconCodePost />
                <span> کدپستی: {{ address.postal_code }} </span>
              </p>

              <div class="flex gap-2 text-muted">
                <IconProfileAdderss />

                <div class="flex gap-2 text-muted flex-wrap">
                  <p class="text-sm">گیرنده: {{ address.receiver_name }}</p>

                  <span>|</span>

                  <p class="text-sm">تلفن: {{ address.phone }}</p>
                </div>
              </div>
            </div>

            <div class="text-secondary font-bold text-sm">آدرس رزرو</div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
        <label
          v-for="address in addresses"
          :key="address.id"
          class="border rounded-lg overflow-hidden bg-white dark:bg-zinc-900 flex flex-col cursor-pointer transition shadow-sm hover:shadow"
          :class="{
            'ring-2 ring-emerald-500 border-emerald-500':
              selectedAddress === address.id,
            'border-gray-200 dark:border-zinc-800':
              selectedAddress !== address.id,
          }"
        >
          <div
            class="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-zinc-800/80 border-b border-gray-200 dark:border-zinc-800"
          >
            <div class="flex items-center gap-2">
              <input
                type="radio"
                name="address"
                :value="address.id"
                v-model="selectedAddress"
                class="accent-emerald-500 w-4 h-4"
              />
              <span
                class="text-xs font-medium text-gray-700 dark:text-zinc-300"
              >
                {{ address.title || "محل کار / منزل" }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <button
                @click.prevent="handleDeleteAddress(address.id)"
                class="p-1 text-red-500 hover:opacity-80 transition cursor-pointer"
                type="button"
                title="حذف"
              >
                <IconTrashRed class="w-4 h-4" />
              </button>
              <button
                @click.prevent="openEditModal(address)"
                type="button"
                class="p-1 text-blue-500 hover:opacity-80 transition cursor-pointer"
                title="ویرایش"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 20h9" />
                  <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div
              class="flex items-center gap-2 text-gray-800 dark:text-zinc-200 font-medium text-sm"
            >
              <IconProfileAdderss class="w-4 h-4 text-purple-500 shrink-0" />
              <span>{{ address.receiver_name }}</span>
            </div>

            <div
              class="flex items-start gap-2 text-gray-600 dark:text-zinc-400 text-xs leading-relaxed"
            >
              <IconLocAdders class="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <span>
                {{ address.province?.name }} - {{ address.city?.name }},
                {{ address.address_line }}
              </span>
            </div>
          </div>
        </label>
      </div>

      <div class="bg-primary">
        <h3
          class="text-lg font-bold mb-4 bg-secondary-fade border pad rounded-inner"
        >
          شیوه ارسال
        </h3>

        <div v-if="shippingLoading" class="text-center py-10">
          <SharedLoadingSpinner size="sm" />
        </div>

        <div
          v-else-if="shippingMethods.length === 0"
          class="text-center py-10 text-muted"
        >
          روش ارسالی موجود نیست
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <label
            v-for="method in shippingMethods"
            :key="method.id"
            class="border rounded-inner pad cursor-pointer hover:border-secondary transition"
            :class="{ 'border-secondary ': selectedShipping === method.id }"
          >
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  :value="method.id"
                  v-model="selectedShipping"
                />
                <span class="font-bold text-sm md:text-base">{{
                  method.name
                }}</span>
              </div>
              <p class="text-xs text-muted">
                {{ method.message ?? method.description }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <p class="text-sm text-muted">هزینه ارسال</p>
                <p class="text-strong font-bold">
                  {{ method.cost.toLocaleString("fa-IR") }} تومان
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div class="flex justify-between gap-4 text-center">
        <nuxt-link class="btnborderBlack w-[50%]" to="/cart"
          >مرحله قبل</nuxt-link
        >
        <button @click="handleNextStep" class="btn w-[50%]">مرحله بعد</button>
      </div>
    </div>

    <CartModalAdderss
      :show="showAddressModal"
      :edit-address="editingAddress"
      @close="showAddressModal = false"
      @save="addNewAddress"
    />
  </div>
</template> -->

<!-- app/pages/shipping.vue -->
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";
import { useApi } from "@/composables/api/useApi";

definePageMeta({
  middleware: "auth",
});

const { addresses, loading, error, fetchAddresses, deleteAddress } =
  useAddresses();
const {
  shippingMethods,
  fetchShippingMethods,
  loading: shippingLoading,
} = useShipping();

const { getOrder } = useApi();
const showAddressModal = ref(false);
const editingAddress = ref(null);
const selectedAddress = ref(null);
const selectedShipping = ref(1);

const cartData = ref(null);
const subtotal = ref(900000);
const reservationStorageKey = "selected-reservation";

const selectedReservation = ref(null);
const reservationMode = ref(false);
const loadSelectedReservation = () => {
  if (!process.client) {
    return null;
  }

  const saved = localStorage.getItem(reservationStorageKey);

  if (!saved) {
    return null;
  }

  try {
    const reservation = JSON.parse(saved);

    if (!reservation?.order_id) {
      localStorage.removeItem(reservationStorageKey);
      return null;
    }

    selectedReservation.value = reservation;
    reservationMode.value = true;

    return reservation;
  } catch (error) {
    console.error("Invalid reservation data:", error);

    localStorage.removeItem(reservationStorageKey);

    selectedReservation.value = null;
    reservationMode.value = false;

    return null;
  }
};
const loadReservationOrder = async () => {
  const reservation = loadSelectedReservation();

  if (!reservation) {
    return;
  }

  try {
    const response = await getOrder(reservation.order_id);

    const order = response?.data;

    if (!order) {
      return;
    }

    selectedAddress.value = order.address_id;

    // اگر آدرس در لیست آدرس‌های کاربر هست
    const reservationAddress = addresses.value.find(
      (address) => address.id === order.address_id,
    );

    if (reservationAddress) {
      selectedAddress.value = reservationAddress.id;
    }
  } catch (error) {
    console.error("Failed to load reservation order:", error);
  }
};
// 🔥 Watch برای تغییر آدرس
watch(selectedAddress, async (newAddressId, oldAddressId) => {
  if (newAddressId && newAddressId !== oldAddressId) {
    // ✅ فراخوانی API با address_id جدید
    await fetchShippingMethods(
      newAddressId,
      selectedReservation.value?.order_id,
    );

    // انتخاب خودکار اولین روش ارسال
    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
});

onMounted(async () => {
  loadReservationOrder();
  const savedCart = localStorage.getItem("cart-summary");
  if (savedCart) {
    try {
      cartData.value = JSON.parse(savedCart);
      subtotal.value = cartData.value.totalPrice || 900000;
    } catch (err) {
      console.error("❌ Failed to parse cart data:", err);
    }
  }

  await fetchAddresses();

  if (addresses.value.length > 0) {
    selectedAddress.value = addresses.value[0].id;
  }

  // ✅ بارگذاری اولیه روش‌های ارسال با address_id
  if (selectedAddress.value) {
    await fetchShippingMethods(
      selectedAddress.value,
      selectedReservation.value?.order_id,
    );

    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
});

const shippingCost = computed(() => {
  const method = shippingMethods.value.find(
    (m) => m.id === selectedShipping.value,
  );
  return method ? method.cost : 0;
});

const total = computed(() => subtotal.value + shippingCost.value);

async function handleDeleteAddress(id) {
  const shouldDelete = confirm(
    "آیا مطمئن هستید که می‌خواهید این آدرس را حذف کنید؟",
  );

  if (shouldDelete) {
    try {
      await deleteAddress(id);
      if (selectedAddress.value === id && addresses.value.length > 0) {
        selectedAddress.value = addresses.value[0].id;
      }

      toast.success("آدرس با موفقیت حذف شد");
    } catch (err) {
      toast.error("خطا در حذف آدرس");
    }
  }
}

async function addNewAddress() {
  await fetchAddresses();
  showAddressModal.value = false;
  editingAddress.value = null;
  if (addresses.value.length > 0) {
    selectedAddress.value = addresses.value[0].id;
  }

  // ✅ بارگذاری اولیه روش‌های ارسال با address_id
  if (selectedAddress.value) {
    await fetchShippingMethods(
      selectedAddress.value,
      selectedReservation.value?.order_id,
    );
    if (shippingMethods.value.length > 0) {
      selectedShipping.value = shippingMethods.value[0].id;
    }
  }
}

function openEditModal(address) {
  editingAddress.value = address;
  showAddressModal.value = true;
}

function openNewAddressModal() {
  editingAddress.value = null;
  showAddressModal.value = true;
}

async function handleNextStep() {
  const { $api } = useNuxtApp();

  if (!selectedAddress.value) {
    toast.error("لطفاً یک آدرس انتخاب کنید");
    return;
  }

  if (!selectedShipping.value) {
    toast.error("لطفاً یک روش ارسال انتخاب کنید");
    return;
  }

  try {
    const response = await $api.post("/front/shippings", {
      address_id: selectedAddress.value,
      shipping_method: selectedShipping.value,
    });

    localStorage.setItem(
      "shipping-info",
      JSON.stringify({
        address_id: selectedAddress.value,
        shipping_method_id: selectedShipping.value,
      }),
    );

    navigateTo("/payment");
  } catch (err) {
    console.error("❌ Shipping error:", err);
    toast.error(err.response?.data?.message || "خطا در ثبت اطلاعات ارسال");
  }
}
</script>

<template>
  <div class="container space-y-6 md:space-y-10 pb-28 md:pb-10" dir="rtl">
    <!-- هدر دسکتاپ -->
    <div class="hidden md:block">
      <SharedBreadCrumb
        :items="[
          { label: 'سبد خرید', href: '/cart' },
          { label: 'انتخاب آدرس و روش ارسال', href: '/shipping' },
        ]"
      />
    </div>

    <!-- هدر موبایل مطابق فیگما عکس 6 -->
    <div
      class="flex md:hidden items-center justify-between py-3 border-b border-gray-100"
    >
      <NuxtLink to="/cart" class="p-1 text-gray-700">
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
      <h1 class="text-base font-bold text-gray-800">شیوه و نحوه ارسال</h1>
      <div class="w-5"></div>
    </div>

    <CartProgressSteps :current-step="2" />

    <div class="space-y-6">
      <!-- نوار بالای آدرس: در موبایل تم بنفش کم‌رنگ یکدست طبق عکس ۶ -->
      <div
        class="flex items-center justify-between bg-[#D5CBEB] border border-[#e2dcf2] py-3 px-4 rounded-lg"
      >
        <span class="font-bold text-xs md:text-sm text-gray-800">آدرس شما</span>

        <button
          v-if="!reservationMode"
          @click="openNewAddressModal"
          class="text-xs md:text-sm text-purple-900 font-medium flex items-center gap-1 cursor-pointer hover:underline"
        >
          <span>+ افزودن آدرس جدید</span>
        </button>
      </div>

      <div v-if="loading" class="text-center py-10">
        <SharedLoadingSpinner size="lg" />
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-500">
        {{ error }}
      </div>

      <!-- حالت عدم وجود آدرس -->
      <div
        v-else-if="addresses.length === 0"
        class="flex flex-col items-center justify-center py-16 px-4 space-y-4"
      >
        <div
          class="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="text-center space-y-1">
          <p class="font-bold text-sm md:text-base text-gray-800">
            آدرسی وجود ندارد
          </p>
          <p class="text-xs text-gray-500">
            برای انجام راحت‌تر سفارش می‌توانید آدرس‌های منتخب خود را اضافه کنید.
          </p>
        </div>
        <button
          @click="openNewAddressModal"
          class="flex items-center gap-2 btn rounded-xl text-xs md:text-sm transition cursor-pointer"
        >
          <IconPlusBorder class="w-4 h-4 !text-white" />
          <span>افزودن آدرس جدید</span>
        </button>
      </div>

      <!-- آدرس در حالت رزرو -->
      <div v-else-if="reservationMode" class="border-b pb-6">
        <div
          v-for="address in addresses.filter(
            (address) => address.id === selectedAddress,
          )"
          :key="address.id"
          class="border border-secondary rounded-2xl p-4 bg-secondary-fade"
        >
          <div class="flex items-start gap-3">
            <div class="mt-1 shrink-0">
              <div
                class="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center"
              >
                <div class="w-2.5 h-2.5 rounded-full bg-secondary"></div>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-xs md:text-sm text-muted mb-2 flex gap-2">
                <IconLocAdders />
                <span>{{ address.address_line }}</span>
              </p>
              <p
                class="text-xs md:text-sm text-muted flex mb-2 gap-2 items-center"
              >
                <IconCodePost />
                <span>کدپستی: {{ address.postal_code }}</span>
              </p>
              <div class="flex gap-2 text-muted text-xs md:text-sm flex-wrap">
                <span>گیرنده: {{ address.receiver_name }}</span>
                <span>|</span>
                <span>تلفن: {{ address.phone }}</span>
              </div>
            </div>
            <div class="text-secondary font-bold text-xs md:text-sm">
              آدرس رزرو
            </div>
          </div>
        </div>
      </div>

      <!-- لیست آدرس‌ها مطابق عکس‌های ۶ و ۷ فیگما -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <label
          v-for="address in addresses"
          :key="address.id"
          class="border rounded-2xl overflow-hidden bg-white flex flex-col cursor-pointer transition shadow-xs relative"
          :class="
            selectedAddress === address.id
              ? 'border-gray-800 ring-1 ring-gray-800'
              : 'border-gray-200 opacity-90'
          "
        >
          <!-- هدر کارت آدرس: مشکی برای انتخاب‌شده و طوسی برای بقیه (دقیقاً شبیه عکس 6 فیگما) -->
          <div
            class="flex items-center justify-between px-3 py-2 text-xs transition-colors"
            :class="
              selectedAddress === address.id
                ? 'bg-[#18181b] text-white'
                : 'bg-gray-100 text-gray-700'
            "
          >
            <!-- عنوان + نشانگر سبز -->
            <div class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full"
                :class="
                  selectedAddress === address.id
                    ? 'bg-emerald-400'
                    : 'bg-gray-400'
                "
              ></span>
              <span class="font-medium text-xs">
                {{ address.title || "منزل" }}
              </span>
              <input
                type="radio"
                name="address"
                :value="address.id"
                v-model="selectedAddress"
                class="hidden"
              />
            </div>

            <!-- دکمه‌های حذف و ویرایش -->
            <div class="flex items-center gap-3">
              <button
                @click.prevent="handleDeleteAddress(address.id)"
                class="p-1 text-red-500 hover:text-red-400 transition"
                type="button"
                title="حذف"
              >
                <IconTrashRed class="w-3.5 h-3.5" />
              </button>
              <button
                @click.prevent="openEditModal(address)"
                type="button"
                class="p-1 text-sky-400 hover:text-sky-300 transition"
                title="ویرایش"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 20h9" />
                  <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- بدنه کارت: نام گیرنده و متن آدرس همراه آیکن‌های خطی ظریف -->
          <div class="p-3.5 space-y-2 text-right">
            <div class="flex items-center gap-2 text-gray-700 text-xs">
              <IconProfileAdderss class="w-4 h-4 text-gray-400 shrink-0" />
              <span class="font-medium">{{ address.receiver_name }}</span>
            </div>

            <div
              class="flex items-start gap-2 text-gray-500 text-xs leading-relaxed"
            >
              <IconLocAdders class="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>
                {{ address.province?.name }} - {{ address.city?.name }}،
                {{ address.address_line }}
              </span>
            </div>
          </div>
        </label>
      </div>

      <div class="space-y-3 pt-2">
        <div
          class="bg-[#D5CBEB] border border-[#e2dcf2] py-2.5 px-4 rounded-lg"
        >
          <span class="font-bold text-xs md:text-sm text-gray-800">
            انتخاب شیوه ارسال
          </span>
        </div>

        <div v-if="shippingLoading" class="text-center py-6">
          <SharedLoadingSpinner size="sm" />
        </div>

        <div
          v-else-if="shippingMethods.length === 0"
          class="text-center py-6 text-muted text-xs"
        >
          روش ارسالی موجود نیست
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label
            v-for="method in shippingMethods"
            :key="method.id"
            class="border rounded-2xl p-4 bg-white cursor-pointer transition flex items-center justify-between shadow-xs hover:border-gray-300 relative"
            :class="
              selectedShipping === method.id
                ? 'border-gray-800 ring-1 ring-gray-800'
                : 'border-gray-200'
            "
          >
            <!-- سمت چپ: آیکن و رادیو -->
            <div
              class="flex items-center gap-3.5 pl-3 border-l border-gray-100 ml-3 shrink-0"
            >
              <div
                class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1 border border-gray-100"
              >
                <svg
                  v-if="method.name?.includes('پست')"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="2"
                  class="w-5 h-5"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  stroke-width="2.5"
                  class="w-5 h-5"
                >
                  <path d="M4 8l8 8M12 8l-8 8M16 8l4 4-4 4" />
                </svg>
              </div>

              <input
                type="radio"
                name="shipping"
                :value="method.id"
                v-model="selectedShipping"
                class="accent-emerald-500 w-4 h-4 cursor-pointer"
              />
            </div>

            <!-- سمت راست: متن -->
            <div class="space-y-2 text-right flex-1">
              <span class="font-bold text-xs sm:text-sm text-gray-900 block">
                {{ method.name }}
              </span>

              <div class="flex items-center gap-2">
                <span
                  class="inline-block bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded font-medium"
                >
                  {{ method.message || method.description || "طی سه روز کاری" }}
                </span>
              </div>

              <div class="text-xs text-gray-500 pt-0.5">
                <template v-if="method.cost > 0">
                  بسته بندی و ارسال
                  <span class="font-bold text-gray-800">
                    {{ method.cost.toLocaleString("fa-IR") }} تومان
                  </span>
                </template>
                <template v-else>
                  <span class="font-bold text-gray-700">پس کرایه</span>
                </template>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- فاکتور قیمت در موبایل مطابق عکس 6 -->
      <div
        class="block md:hidden bg-[#f0edf7]/70 border border-[#e1daf0] rounded-2xl p-4 space-y-2.5 text-xs mt-4"
      >
        <div class="flex justify-between items-center text-gray-700">
          <span>قیمت کالاها</span>
          <span class="font-bold text-gray-900"
            >{{ subtotal.toLocaleString("fa-IR") }} تومان</span
          >
        </div>

        <div class="flex justify-between items-center text-gray-500">
          <span>تخفیف کالاها</span>
          <span class="text-green-600 font-bold">۰ تومان</span>
        </div>

        <div class="flex justify-between items-center text-gray-500">
          <span>هزینه ارسال:</span>
          <span class="text-gray-900 font-bold"
            >{{ shippingCost.toLocaleString("fa-IR") }} تومان</span
          >
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

      <!-- دکمه‌های دسکتاپ -->
      <div class="hidden md:flex justify-between gap-4 text-center pt-4">
        <nuxt-link class="btnborderBlack md:!py-4 w-[50%]" to="/cart"
          >مرحله قبل</nuxt-link
        >
        <button @click="handleNextStep" class="btn w-[50%]">مرحله بعد</button>
      </div>

      <!-- نوار چسبان (Sticky) پایین موبایل مطابق عکس ۶ فیگما -->
      <div
        class="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40 flex items-center justify-between shadow-lg"
      >
        <button @click="handleNextStep" class="btn !px-10">ثبت سفارش</button>
        <div class="flex flex-col text-left space-y-2">
          <span class="text-sm text-gray-500">جمع سبد خرید</span>
          <span class="text-base font-bold text-strong">
            {{ total.toLocaleString("fa-IR") }}
            <span class="text-xs font-normal">تومان</span>
          </span>
        </div>
      </div>
    </div>

    <!-- مودال افزودن آدرس -->
    <CartModalAdderss
      :show="showAddressModal"
      :edit-address="editingAddress"
      @close="showAddressModal = false"
      @save="addNewAddress"
    />
  </div>
</template>
