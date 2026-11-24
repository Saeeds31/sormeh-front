<!-- app/components/cart/ModalAdderss.vue -->
<!-- <template>
  <div
    v-if="show"
    class="fixed inset-0 p-10 bg-black/60 flex items-center justify-center z-50"
    @click.self="emit('close')"
  >
    <div
      class="h-[90vh] bg-primary rounded-lg w-full max-w-2xl flex flex-col relative overflow-hidden"
    >
      <div
        v-if="isSaving"
        class="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20"
      >
        <div
          class="h-full bg-secondary transition-all duration-200 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <div class="flex-shrink-0 px-4 pt-4 pb-4 border-b">
        <button
          @click="emit('close')"
          class="absolute top-3 left-3 text-gray-500 hover:text-gray-800 z-10"
        >
          <X class="w-5 h-5" />
        </button>
        <h2 class="text-lg font-bold text-right">
          {{ editAddress ? "ویرایش آدرس" : "افزودن آدرس" }}
        </h2>
      </div>

      <div class="flex-1 overflow-y-auto px-4 py-4 custom-scroll">
        <form
          id="addressForm"
          @submit.prevent="saveAddress"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
          :class="{ 'opacity-60 pointer-events-none': isSaving }"
        >
          <div class="flex flex-col gap-2 relative" ref="provinceBox">
            <label for="province" class="font-bold text-sm">استان</label>
            <input type="hidden" v-model="province_id" />
            <input
              id="province"
              type="text"
              v-model="provinceSearch"
              @focus="openProvinceDropdown"
              @input="onProvinceSearchInput"
              placeholder="جستجو یا انتخاب استان"
              class="border rounded-inner p-3 py-4 w-full outline-hidden"
              :class="{ 'border-red-500': errors.province_id }"
              autocomplete="new-password"
            />

            <ul
              v-if="provinceDropdownOpen && filteredProvinces.length"
              class="absolute top-full mt-1 w-full bg-white border rounded-inner shadow-lg max-h-60 overflow-y-auto z-50"
            >
              <li
                v-for="province in filteredProvinces"
                :key="province.id"
                @click="selectProvince(province)"
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {{ province.name }}
              </li>
            </ul>

            <div
              v-if="provinceDropdownOpen && !filteredProvinces.length"
              class="absolute top-full mt-1 w-full bg-white border rounded-inner shadow-lg p-3 text-sm text-gray-500 z-50"
            >
              استانی یافت نشد
            </div>

            <span v-if="errors.province_id" class="text-red-500 text-xs">{{
              errors.province_id
            }}</span>
          </div>

          <div class="flex flex-col gap-2 relative" ref="cityBox">
            <label for="city" class="font-bold text-sm">شهر</label>
            <input type="hidden" v-model="city_id" />
            <input
              id="city"
              type="text"
              v-model="citySearch"
              @focus="openCityDropdown"
              @input="onCitySearchInput"
              placeholder="جستجو یا انتخاب شهر"
              class="border rounded-inner p-3 py-4 w-full outline-hidden"
              :class="{ 'border-red-500': errors.city_id }"
              :disabled="!province_id"
              autocomplete="new-password"
            />

            <ul
              v-if="cityDropdownOpen && filteredCities.length"
              class="absolute top-full mt-1 w-full bg-white border rounded-inner shadow-lg max-h-60 overflow-y-auto z-50"
            >
              <li
                v-for="city in filteredCities"
                :key="city.id"
                @click="selectCity(city)"
                class="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {{ city.name }}
              </li>
            </ul>

            <div
              v-if="cityDropdownOpen && !filteredCities.length"
              class="absolute top-full mt-1 w-full bg-white border rounded-inner shadow-lg p-3 text-sm text-gray-500 z-50"
            >
              شهری یافت نشد
            </div>

            <span v-if="errors.city_id" class="text-red-500 text-xs">
              {{ errors.city_id }}
            </span>
          </div>

          <div class="flex flex-col gap-2 md:col-span-2">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="font-bold text-sm">نام گیرنده</label>
                <input
                  id="first_name"
                  autocomplete="new-password"
                  v-model="first_name"
                  @blur="validateFirstName"
                  type="text"
                  placeholder="نام"
                  class="border rounded-inner p-3 py-4 w-full outline-hidden"
                  :class="{ 'border-red-500': errors.first_name }"
                />
                <span v-if="errors.first_name" class="text-red-500 text-xs">{{
                  errors.first_name
                }}</span>
              </div>
              <div class="flex flex-col gap-2">
                <label class="font-bold text-sm">
                  نام خانوادگی گیرنده
                </label>
                <input
                  id="last_name"
                  autocomplete="new-password"
                  v-model="last_name"
                  @blur="validateLastName"
                  type="text"
                  placeholder="نام خانوادگی"
                  class="border rounded-inner p-3 py-4 w-full outline-hidden"
                  :class="{ 'border-red-500': errors.last_name }"
                />
                <span v-if="errors.last_name" class="text-red-500 text-xs">{{
                  errors.last_name
                }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="postal" class="font-bold text-sm">کد پستی</label>
            <input
              id="postal"
              v-model="postal_code"
              autocomplete="new-password"
              type="text"
              maxlength="10"
              class="border rounded-inner p-3 py-4 w-full outline-hidden"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="phone" class="font-bold text-sm">شماره تماس</label>
            <input
              id="phone"
              v-model="phone"
              @blur="validatePhone"
              type="tel"
              autocomplete="new-password"
              maxlength="11"
              class="border rounded-inner p-3 py-4 w-full outline-hidden"
              :class="{ 'border-red-500': errors.phone }"
            />
            <span v-if="errors.phone" class="text-red-500 text-xs">{{
              errors.phone
            }}</span>
          </div>

          <div class="flex flex-col gap-2 md:col-span-2">
            <label for="address_line" class="font-bold text-sm"
              >آدرس کامل</label
            >
            <textarea
              id="address_line"
              v-model="address_line"
              @blur="validateAddressLine"
              autocomplete="new-password"
              rows="2"
              class="border rounded-inner p-3 py-4 w-full outline-hidden resize-none"
              :class="{ 'border-red-500': errors.address_line }"
            ></textarea>
            <span v-if="errors.address_line" class="text-red-500 text-xs">{{
              errors.address_line
            }}</span>
          </div>
        </form>
      </div>

      <div class="flex-shrink-0 px-4 py-4 border-t bg-primary">
        <button
          type="submit"
          form="addressForm"
          :disabled="isSaving"
          class="btn w-full relative overflow-hidden"
        >
          <span v-if="!isSaving">ذخیره آدرس</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ saveAttempt > 1 ? "تلاش مجدد..." : "در حال ذخیره..." }}
            <span class="text-xs opacity-80"
              >({{ Math.round(progress) }}%)</span
            >
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  show: Boolean,
  editAddress: Object,
});

const emit = defineEmits(["close", "save"]);

const { createAddress, updateAddress, loading } = useAddresses();
const { provinces, cities, fetchProvinces, fetchCities } = useLocations();

const isSaving = ref(false);
const progress = ref(0);
const saveAttempt = ref(0);
let progressInterval = null;
let abortController = null;

// فلگ برای جلوگیری از پاک شدن شهر هنگام لود اولیه ادیت
const isInitializing = ref(false);

const first_name = ref("");
const last_name = ref("");
const TIMEOUT_MS = 3000;
const MAX_ATTEMPTS = 2;
const province_id = ref("");
const city_id = ref("");
const postal_code = ref("");
const phone = ref("");
const address_line = ref("");

const citySearch = ref("");
const cityDropdownOpen = ref(false);
const cityBox = ref(null);
const provinceSearch = ref("");
const provinceDropdownOpen = ref(false);
const provinceBox = ref(null);

const errors = ref({
  province_id: "",
  city_id: "",
  first_name: "",
  last_name: "",
  postal_code: "",
  phone: "",
  address_line: "",
});

const filteredProvinces = computed(() => {
  const list = provinces.value || [];
  if (!provinceSearch.value) return list;
  return list.filter((p) => p.name.includes(provinceSearch.value));
});

function openProvinceDropdown() {
  provinceDropdownOpen.value = true;
}

function onProvinceSearchInput() {
  province_id.value = "";
  provinceDropdownOpen.value = true;
  errors.value.province_id = "";
}

function selectProvince(province) {
  province_id.value = province.id;
  provinceSearch.value = province.name;
  provinceDropdownOpen.value = false;
  validateProvince();
}

const filteredCities = computed(() => {
  const list = cities.value || [];
  if (!citySearch.value) return list;
  return list.filter((c) => c.name.includes(citySearch.value));
});

function openCityDropdown() {
  if (!province_id.value) return;
  cityDropdownOpen.value = true;
}

function onCitySearchInput() {
  city_id.value = "";
  cityDropdownOpen.value = true;
  errors.value.city_id = "";
}

function selectCity(city) {
  city_id.value = city.id;
  citySearch.value = city.name;
  cityDropdownOpen.value = false;
  validateCity();
}

function handleClickOutside(e) {
  if (cityBox.value && !cityBox.value.contains(e.target)) {
    cityDropdownOpen.value = false;
  }
  if (provinceBox.value && !provinceBox.value.contains(e.target)) {
    provinceDropdownOpen.value = false;
  }
}

onMounted(async () => {
  if (provinces.value.length === 0) {
    await fetchProvinces();
  }
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// بازنشانی مقادیر فرم
function resetForm() {
  province_id.value = "";
  city_id.value = "";
  first_name.value = "";
  last_name.value = "";
  postal_code.value = "";
  phone.value = "";
  address_line.value = "";
  citySearch.value = "";
  cityDropdownOpen.value = false;
  provinceSearch.value = "";
  provinceDropdownOpen.value = false;
  errors.value = {
    province_id: "",
    city_id: "",
    first_name: "",
    last_name: "",
    postal_code: "",
    phone: "",
    address_line: "",
  };
}

// هندل باز شدن مدال و مقداردهی حالت ویرایش
watch(
  () => props.show,
  async (isOpen) => {
    if (!isOpen) {
      if (isSaving.value) {
        cancelProgress();
        if (abortController) {
          abortController.abort();
          abortController = null;
        }
      }
      return;
    }

    if (provinces.value.length === 0) {
      await fetchProvinces();
    }

    if (props.editAddress) {
      isInitializing.value = true; // فعال‌سازی قفل جهت جلوگیری از صفر شدن فیلد شهر

      const fullName = (props.editAddress.receiver_name || "").trim();
      const parts = fullName.split(/\s+/);
      first_name.value = parts[0] || "";
      last_name.value = parts.slice(1).join(" ") || "";
      postal_code.value = props.editAddress.postal_code || "";
      phone.value = props.editAddress.phone || "";
      address_line.value = props.editAddress.address_line || "";

      province_id.value = props.editAddress.province_id || "";
      city_id.value = props.editAddress.city_id || "";

      // پیدا کردن نام استان
      const foundProvince = (provinces.value || []).find(
        (p) => String(p.id) === String(province_id.value)
      );
      provinceSearch.value = foundProvince ? foundProvince.name : (props.editAddress.province?.name || "");

      // دریافت شهرهای استان و پیدا کردن نام شهر
      if (province_id.value) {
        await fetchCities(province_id.value);
        const foundCity = (cities.value || []).find(
          (c) => String(c.id) === String(city_id.value)
        );
        citySearch.value = foundCity ? foundCity.name : (props.editAddress.city?.name || "");
      }

      await nextTick();
      isInitializing.value = false; // آزاد کردن قفل پس از مقداردهی کامل
    } else {
      resetForm();
    }
  }
);

// تغییر دستی استان توسط کاربر
watch(province_id, async (newProvinceId, oldProvinceId) => {
  // اگر در مرحله لود ادیت هستیم، متوقف شو تا فیلد شهر را خالی نکند
  if (isInitializing.value) return;

  if (newProvinceId && newProvinceId !== oldProvinceId) {
    city_id.value = "";
    citySearch.value = "";
    cityDropdownOpen.value = false;
    await fetchCities(newProvinceId);
  } else if (!newProvinceId) {
    cities.value = [];
    citySearch.value = "";
    city_id.value = "";
    cityDropdownOpen.value = false;
  }
});

const validateFirstName = () => {
  if (!first_name.value.trim()) {
    errors.value.first_name = "نام الزامی است";
    return false;
  }
  if (first_name.value.trim().length < 2) {
    errors.value.first_name = "نام باید حداقل 2 حرف باشد";
    return false;
  }
  errors.value.first_name = "";
  return true;
};

const validateLastName = () => {
  if (!last_name.value.trim()) {
    errors.value.last_name = "نام خانوادگی الزامی است";
    return false;
  }
  if (last_name.value.trim().length < 2) {
    errors.value.last_name = "نام خانوادگی باید حداقل 2 حرف باشد";
    return false;
  }
  errors.value.last_name = "";
  return true;
};

const validatePhone = () => {
  if (!phone.value.trim()) {
    errors.value.phone = "شماره تماس الزامی است";
    return false;
  }
  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phone.value)) {
    errors.value.phone = "شماره تماس باید 11 رقم و با 09 شروع شود";
    return false;
  }
  errors.value.phone = "";
  return true;
};

const validatePostalCode = () => {
  if (!postal_code.value.trim()) {
    errors.value.postal_code = "کد پستی الزامی است";
    return false;
  }
  const postalRegex = /^\d{10}$/;
  if (!postalRegex.test(postal_code.value)) {
    errors.value.postal_code = "کد پستی باید 10 رقم باشد";
    return false;
  }
  errors.value.postal_code = "";
  return true;
};

const validateAddressLine = () => {
  if (!address_line.value.trim()) {
    errors.value.address_line = "آدرس الزامی است";
    return false;
  }
  const wordCount = address_line.value.trim().split(/\s+/).length;
  if (wordCount < 3) {
    errors.value.address_line = "آدرس باید حداقل 3 کلمه داشته باشد";
    return false;
  }
  errors.value.address_line = "";
  return true;
};

const validateProvince = () => {
  if (!province_id.value) {
    errors.value.province_id = "انتخاب استان الزامی است";
    return false;
  }
  errors.value.province_id = "";
  return true;
};

const validateCity = () => {
  if (!city_id.value) {
    errors.value.city_id = "انتخاب شهر الزامی است";
    return false;
  }
  errors.value.city_id = "";
  return true;
};

async function executeWithTimeoutAndRetry(
  fn,
  { timeout = TIMEOUT_MS, retries = 1 } = {}
) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    saveAttempt.value = attempt + 1;
    abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, timeout);

    try {
      const result = await fn(abortController.signal);
      clearTimeout(timeoutId);
      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;

      if (attempt === retries) {
        throw err;
      }

      console.warn(`⏱️ Attempt ${attempt + 1} failed, retrying...`, err?.message);
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  throw lastError;
}

function startProgress() {
  progress.value = 0;
  isSaving.value = true;

  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 8;
    } else if (progress.value < 98) {
      progress.value += 0.5;
    }
  }, 200);
}

function finishProgress() {
  clearInterval(progressInterval);
  progressInterval = null;
  progress.value = 100;

  setTimeout(() => {
    isSaving.value = false;
    progress.value = 0;
    saveAttempt.value = 0;
  }, 400);
}

function cancelProgress() {
  clearInterval(progressInterval);
  progressInterval = null;
  isSaving.value = false;
  progress.value = 0;
  saveAttempt.value = 0;
}

async function saveAddress() {
  const isProvinceValid = validateProvince();
  const isCityValid = validateCity();
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isPhoneValid = validatePhone();
  const isAddressValid = validateAddressLine();

  if (
    !isProvinceValid ||
    !isCityValid ||
    !isFirstNameValid ||
    !isLastNameValid ||
    !isPhoneValid ||
    !isAddressValid
  ) {
    return;
  }

  const receiver_name = `${first_name.value.trim()} ${last_name.value.trim()}`.trim();
  const addressData = {
    receiver_name,
    province_id: Number(province_id.value),
    city_id: Number(city_id.value),
    postal_code: postal_code.value,
    address_line: address_line.value,
    phone: phone.value,
  };

  startProgress();

  try {
    const isEdit = props.editAddress && props.editAddress.id;

    await executeWithTimeoutAndRetry(
      (signal) =>
        isEdit
          ? updateAddress(props.editAddress.id, addressData, signal)
          : createAddress(addressData, signal),
      { timeout: TIMEOUT_MS, retries: 1 }
    );

    finishProgress();
    resetForm();
    emit("save");
  } catch (err) {
    cancelProgress();

    if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors;
      if (serverErrors.receiver_name)
        errors.value.first_name = serverErrors.receiver_name[0];
      if (serverErrors.province_id)
        errors.value.province_id = serverErrors.province_id[0];
      if (serverErrors.city_id) errors.value.city_id = serverErrors.city_id[0];
      if (serverErrors.postal_code)
        errors.value.postal_code = serverErrors.postal_code[0];
      if (serverErrors.address_line)
        errors.value.address_line = serverErrors.address_line[0];
      if (serverErrors.phone) errors.value.phone = serverErrors.phone[0];
    }
  }
}
</script>


<style scoped>
.input-short:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
}

.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style> -->

<!-- app/components/cart/ModalAdderss.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 h-[100dvh] overflow-hidden p-0 md:p-6 bg-black/60 flex items-center justify-center z-50 transition-opacity"
    @click.self="emit('close')"
    dir="rtl"
  >
    <div
      class="h-full min-h-0 md:h-auto md:max-h-[88vh] bg-white md:rounded-2xl w-full max-w-2xl flex flex-col relative overflow-hidden shadow-2xl"
    >
      <!-- پروگرس بار بالای مودال -->
      <div
        v-if="isSaving"
        class="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20"
      >
        <div
          class="h-full bg-[#4b3073] transition-all duration-200 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <!-- هدر مودال -->
      <div
        class="flex-shrink-0 px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white"
      >
        <!-- در موبایل: فقط دکمه هدر -->
        <!-- اگر در صفحه انتخاب استان هستیم (mobileStep === 1) و در حال ویرایشیم، فلش ما را برمی‌گرداند به صفحه مشخصات (mobileStep = 2) -->
        <button
          v-if="isMobile && editAddress && mobileStep === 1"
          type="button"
          @click="mobileStep = 2"
          class="p-1 text-gray-700 md:hidden flex items-center justify-center transition"
          aria-label="بازگشت به ویرایش مشخصات"
        >
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
        </button>

        <!-- در غیر این صورت (در صفحه اصلی ویرایش یا ثبت اولیه)، دکمه خروج/بستن کل مودال است -->
        <button
          v-else
          type="button"
          @click="emit('close')"
          class="p-1 text-gray-700 md:text-gray-400 md:hover:text-gray-700 rounded-lg transition"
          aria-label="بستن"
        >
          <!-- در موبایل فلش خروج، در دسکتاپ ضربدر -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5 rotate-180 md:hidden"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <X class="w-5 h-5 hidden md:block" />
        </button>

        <h2 class="text-sm md:text-base font-bold text-gray-800">
          <span class="hidden md:inline">{{
            editAddress ? "ویرایش آدرس پستی" : "ثبت آدرس تحویل سفارش"
          }}</span>
          <span class="md:hidden">
            {{
              mobileStep === 1
                ? editAddress
                  ? "ویرایش استان و شهر"
                  : "انتخاب استان و شهر"
                : editAddress
                  ? "ویرایش آدرس پستی"
                  : "تکمیل مشخصات و آدرس"
            }}
          </span>
        </h2>

        <!-- خالی جهت بالانس و وسط‌چین ماندن عنوان هدر -->
        <div class="w-5"></div>
      </div>

      <!-- بدنه فرم -->
      <div
        class="flex-1 min-h-0 overflow-y-auto px-5 py-5 custom-scroll overscroll-y-contain"
      >
        <form
          id="addressForm"
          @submit.prevent="saveAddress"
          class="flex flex-col gap-4"
          :class="{ 'opacity-60 pointer-events-none': isSaving }"
        >
          <!-- ================= بخش ۱: استان و شهر (استپ ۱ در موبایل / ردیف ۱ در دسکتاپ) ================= -->
          <div
            v-show="!isMobile || mobileStep === 1"
            class="grid grid-cols-1 md:grid-cols-2 gap-4 md:!grid"
          >
            <!-- استان -->
            <div class="flex flex-col gap-1.5 relative" ref="provinceBox">
              <label for="province" class="font-medium text-xs text-gray-700">
                استان <span class="text-red-500">*</span>
              </label>
              <input type="hidden" v-model="province_id" />
              <div class="relative">
                <input
                  id="province"
                  type="text"
                  v-model="provinceSearch"
                  @focus="openProvinceDropdown"
                  @input="onProvinceSearchInput"
                  placeholder="انتخاب یا جستجوی استان"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                  :class="
                    errors.province_id
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                  autocomplete="new-password"
                />
                <span
                  class="absolute left-3 top-3.5 text-gray-400 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>

              <ul
                v-if="provinceDropdownOpen && filteredProvinces.length"
                class="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto z-50 text-xs"
              >
                <li
                  v-for="province in filteredProvinces"
                  :key="province.id"
                  @click="selectProvince(province)"
                  class="px-3 py-2.5 cursor-pointer hover:bg-purple-50 hover:text-[#4b3073] border-b border-gray-50 last:border-0 transition"
                >
                  {{ province.name }}
                </li>
              </ul>
              <span
                v-if="errors.province_id"
                class="text-red-500 text-xs font-medium"
              >
                {{ errors.province_id }}
              </span>
            </div>

            <!-- شهر -->
            <div class="flex flex-col gap-1.5 relative" ref="cityBox">
              <label for="city" class="font-medium text-xs text-gray-700">
                شهر <span class="text-red-500">*</span>
              </label>
              <input type="hidden" v-model="city_id" />
              <div class="relative">
                <input
                  id="city"
                  type="text"
                  v-model="citySearch"
                  @focus="openCityDropdown"
                  @input="onCitySearchInput"
                  placeholder="انتخاب یا جستجوی شهر"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  :class="
                    errors.city_id
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                  :disabled="!province_id"
                  autocomplete="new-password"
                />
                <span
                  class="absolute left-3 top-3.5 text-gray-400 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>

              <ul
                v-if="cityDropdownOpen && filteredCities.length"
                class="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto z-50 text-xs"
              >
                <li
                  v-for="city in filteredCities"
                  :key="city.id"
                  @click="selectCity(city)"
                  class="px-3 py-2.5 cursor-pointer hover:bg-purple-50 hover:text-[#4b3073] border-b border-gray-50 last:border-0 transition"
                >
                  {{ city.name }}
                </li>
              </ul>
              <span
                v-if="errors.city_id"
                class="text-red-500 text-xs font-medium"
              >
                {{ errors.city_id }}
              </span>
            </div>

            <!-- راهنمای متنی (مخصوص موبایل) -->
            <div
              class="md:hidden flex items-start gap-2 mt-2 p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-xs text-[#4b3073] leading-relaxed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                ابتدا استان و شهر تحویل سفارش را انتخاب فرمایید، سپس در مرحله
                بعد نشانی دقیق و اطلاعات تحویل‌گیرنده ثبت می‌گردد.
              </span>
            </div>
          </div>

          <!-- ================= بخش ۲: جزئیات آدرس و گیرنده (استپ ۲ در موبایل / همراه با بخش ۱ در دسکتاپ) ================= -->
          <div
            v-show="!isMobile || mobileStep === 2"
            class="flex flex-col gap-4 md:!flex"
          >
            <!-- نمایش خلاصه استان و شهر در موبایل (هنگام حضور در استپ ۲) -->
            <div
              class="md:hidden flex items-center justify-between p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs"
            >
              <div class="flex items-center gap-1.5 text-gray-700">
                <span class="text-gray-400">شهر مقصد:</span>
                <span class="font-bold text-[#4b3073]">
                  {{ provinceSearch }} / {{ citySearch }}
                </span>
              </div>
              <button
                type="button"
                @click="mobileStep = 1"
                class="text-[#4b3073] font-bold text-xs hover:underline"
              >
                تغییر
              </button>
            </div>

            <!-- آدرس کامل پستی -->
            <div class="flex flex-col gap-1.5">
              <label
                for="address_line"
                class="font-medium text-xs text-gray-700"
              >
                نشانی دقیق پستی <span class="text-red-500">*</span>
              </label>
              <textarea
                id="address_line"
                v-model="address_line"
                @blur="validateAddressLine"
                autocomplete="new-password"
                rows="2"
                placeholder="نام خیابان، کوچه، پلاک، زنگ، طبقه، واحد..."
                class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm resize-none focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                :class="
                  errors.address_line
                    ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                    : 'border-gray-200'
                "
              ></textarea>
              <span
                v-if="errors.address_line"
                class="text-red-500 text-xs font-medium"
              >
                {{ errors.address_line }}
              </span>
            </div>

            <!-- ردیف کدپستی و تلفن همراه در دسکتاپ (۲ ستونه) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- کد پستی -->
              <div class="flex flex-col gap-1.5">
                <label for="postal" class="font-medium text-xs text-gray-700">
                  کد پستی
                </label>
                <input
                  id="postal"
                  v-model="postal_code"
                  @blur="validatePostalCode"
                  autocomplete="new-password"
                  type="text"
                  maxlength="10"
                  placeholder="۱۰ رقم بدون فاصله"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm text-left font-mono focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                  dir="ltr"
                  :class="
                    errors.postal_code
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                />
                <span
                  v-if="errors.postal_code"
                  class="text-red-500 text-xs font-medium"
                >
                  {{ errors.postal_code }}
                </span>
              </div>

              <!-- شماره همراه -->
              <div class="flex flex-col gap-1.5">
                <label class="font-medium text-xs text-gray-700">
                  شماره موبایل تحویل‌گیرنده <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="phone"
                  @blur="validatePhone"
                  type="tel"
                  maxlength="11"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm text-left font-mono focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                  dir="ltr"
                  :class="
                    errors.phone
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                />
                <span
                  v-if="errors.phone"
                  class="text-red-500 text-xs font-medium"
                >
                  {{ errors.phone }}
                </span>
              </div>
            </div>

            <!-- مشخصات گیرنده (نام و نام خانوادگی در ۲ ستون) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex flex-col gap-1.5">
                <label class="font-medium text-xs text-gray-700">
                  نام گیرنده <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="first_name"
                  @blur="validateFirstName"
                  type="text"
                  placeholder="مثال: علی"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                  :class="
                    errors.first_name
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                />
                <span
                  v-if="errors.first_name"
                  class="text-red-500 text-xs font-medium"
                >
                  {{ errors.first_name }}
                </span>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-medium text-xs text-gray-700">
                  نام خانوادگی گیرنده <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="last_name"
                  @blur="validateLastName"
                  type="text"
                  placeholder="مثال: محمدی"
                  class="border bg-gray-50 md:bg-white rounded-xl p-3 w-full outline-none text-xs md:text-sm focus:border-[#4b3073] focus:ring-1 focus:ring-[#4b3073] transition"
                  :class="
                    errors.last_name
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20'
                      : 'border-gray-200'
                  "
                />
                <span
                  v-if="errors.last_name"
                  class="text-red-500 text-xs font-medium"
                >
                  {{ errors.last_name }}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- فوتر فیکس مودال -->
      <div class="flex-shrink-0 px-5 py-3.5 border-t border-gray-100 bg-white">
        <!-- در موبایل اگر استپ ۱ است: فقط دکمه ادامه به مرحله بعد -->
        <button
          v-if="isMobile && mobileStep === 1"
          type="button"
          @click="proceedToDetailsMobile"
          class="w-full bg-[#4b3073] hover:bg-[#3d265e] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
        >
          تایید استان و ادامه
        </button>

        <!-- در دسکتاپ (یا استپ ۲ موبایل): دکمه ثبت فرم -->
        <button
          v-else
          type="submit"
          form="addressForm"
          :disabled="isSaving"
          class="w-full bg-[#4b3073] hover:bg-[#3d265e] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <span v-if="!isSaving">
            {{ editAddress ? "ثبت تغییرات آدرس" : "ثبت و تایید آدرس" }}
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ saveAttempt > 1 ? "تلاش مجدد..." : "در حال ذخیره..." }}
            <span class="text-xs opacity-80"
              >({{ Math.round(progress) }}%)</span
            >
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  show: Boolean,
  editAddress: Object,
});

const emit = defineEmits(["close", "save"]);

const { createAddress, updateAddress, loading } = useAddresses();
const { provinces, cities, fetchProvinces, fetchCities } = useLocations();

const isSaving = ref(false);
const progress = ref(0);
const saveAttempt = ref(0);
let progressInterval = null;
let abortController = null;

// تشخیص ریسپانسیو بودن عرض صفحه
const isMobile = ref(false);
const checkMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

// کنترل مرحله جاری در موبایل (۱: استان/شهر | ۲: جزئیات)
const mobileStep = ref(1);

// پرچم محافظ برای عدم پاک شدن شهر هنگام لود اولیه ویرایش
const isInitializing = ref(false);

const first_name = ref("");
const last_name = ref("");
const TIMEOUT_MS = 3000;
const MAX_ATTEMPTS = 2;
const province_id = ref("");
const city_id = ref("");
const postal_code = ref("");
const phone = ref("");
const address_line = ref("");

const citySearch = ref("");
const cityDropdownOpen = ref(false);
const cityBox = ref(null);
const provinceSearch = ref("");
const provinceDropdownOpen = ref(false);
const provinceBox = ref(null);

const errors = ref({
  province_id: "",
  city_id: "",
  first_name: "",
  last_name: "",
  postal_code: "",
  phone: "",
  address_line: "",
});

const filteredProvinces = computed(() => {
  const list = provinces.value || [];
  if (!provinceSearch.value) return list;
  return list.filter((p) => p.name.includes(provinceSearch.value));
});

function openProvinceDropdown() {
  provinceDropdownOpen.value = true;
}

function onProvinceSearchInput() {
  province_id.value = "";
  provinceDropdownOpen.value = true;
  errors.value.province_id = "";
}

function selectProvince(province) {
  province_id.value = province.id;
  provinceSearch.value = province.name;
  provinceDropdownOpen.value = false;
  validateProvince();
}

const filteredCities = computed(() => {
  const list = cities.value || [];
  if (!citySearch.value) return list;
  return list.filter((c) => c.name.includes(citySearch.value));
});

function openCityDropdown() {
  if (!province_id.value) return;
  cityDropdownOpen.value = true;
}

function onCitySearchInput() {
  city_id.value = "";
  cityDropdownOpen.value = true;
  errors.value.city_id = "";
}

function selectCity(city) {
  city_id.value = city.id;
  citySearch.value = city.name;
  cityDropdownOpen.value = false;
  validateCity();
}

function handleClickOutside(e) {
  if (cityBox.value && !cityBox.value.contains(e.target)) {
    cityDropdownOpen.value = false;
  }
  if (provinceBox.value && !provinceBox.value.contains(e.target)) {
    provinceDropdownOpen.value = false;
  }
}

onMounted(async () => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  if (provinces.value.length === 0) {
    await fetchProvinces();
  }
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
  document.removeEventListener("click", handleClickOutside);
});

function resetForm() {
  province_id.value = "";
  city_id.value = "";
  first_name.value = "";
  last_name.value = "";
  postal_code.value = "";
  phone.value = "";
  address_line.value = "";
  citySearch.value = "";
  cityDropdownOpen.value = false;
  provinceSearch.value = "";
  provinceDropdownOpen.value = false;
  mobileStep.value = 1;
  errors.value = {
    province_id: "",
    city_id: "",
    first_name: "",
    last_name: "",
    postal_code: "",
    phone: "",
    address_line: "",
  };
}

// ناظر باز/بسته شدن مودال
watch(
  () => props.show,
  async (isOpen) => {
    if (!isOpen) {
      if (isSaving.value) {
        cancelProgress();
        if (abortController) {
          abortController.abort();
          abortController = null;
        }
      }
      return;
    }

    checkMobile();

    if (provinces.value.length === 0) {
      await fetchProvinces();
    }

    if (props.editAddress) {
      isInitializing.value = true;
      // در ویرایش، اگر در موبایل باشد مستقیم روی استپ ۲ می‌رود
      mobileStep.value = 2;

      const fullName = (props.editAddress.receiver_name || "").trim();
      const parts = fullName.split(/\s+/);
      first_name.value = parts[0] || "";
      last_name.value = parts.slice(1).join(" ") || "";
      postal_code.value = props.editAddress.postal_code || "";
      phone.value = props.editAddress.phone || "";
      address_line.value = props.editAddress.address_line || "";

      province_id.value = props.editAddress.province_id || "";
      city_id.value = props.editAddress.city_id || "";

      const foundProvince = (provinces.value || []).find(
        (p) => String(p.id) === String(province_id.value),
      );
      provinceSearch.value = foundProvince
        ? foundProvince.name
        : props.editAddress.province?.name || "";

      if (province_id.value) {
        await fetchCities(province_id.value);
        const foundCity = (cities.value || []).find(
          (c) => String(c.id) === String(city_id.value),
        );
        citySearch.value = foundCity
          ? foundCity.name
          : props.editAddress.city?.name || "";
      }

      await nextTick();
      isInitializing.value = false;
    } else {
      resetForm();
    }
  },
);

// تغییر استان توسط کاربر
watch(province_id, async (newProvinceId, oldProvinceId) => {
  if (isInitializing.value) return;

  if (newProvinceId && newProvinceId !== oldProvinceId) {
    city_id.value = "";
    citySearch.value = "";
    cityDropdownOpen.value = false;
    await fetchCities(newProvinceId);
  } else if (!newProvinceId) {
    cities.value = [];
    citySearch.value = "";
    city_id.value = "";
    cityDropdownOpen.value = false;
  }
});

const validateFirstName = () => {
  if (!first_name.value.trim()) {
    errors.value.first_name = "نام الزامی است";
    return false;
  }
  if (first_name.value.trim().length < 2) {
    errors.value.first_name = "نام باید حداقل ۲ حرف باشد";
    return false;
  }
  errors.value.first_name = "";
  return true;
};

const validateLastName = () => {
  if (!last_name.value.trim()) {
    errors.value.last_name = "نام خانوادگی الزامی است";
    return false;
  }
  if (last_name.value.trim().length < 2) {
    errors.value.last_name = "نام خانوادگی باید حداقل ۲ حرف باشد";
    return false;
  }
  errors.value.last_name = "";
  return true;
};

const validatePhone = () => {
  if (!phone.value.trim()) {
    errors.value.phone = "شماره تماس الزامی است";
    return false;
  }
  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phone.value)) {
    errors.value.phone = "شماره تماس باید ۱۱ رقم و با ۰۹ شروع شود";
    return false;
  }
  errors.value.phone = "";
  return true;
};

const validatePostalCode = () => {
  const postalRegex = /^\d{10}$/;
  if (!postalRegex.test(postal_code.value)) {
    errors.value.postal_code = "کد پستی باید ۱۰ رقم باشد";
    return false;
  }
  errors.value.postal_code = "";
  return true;
};

const validateAddressLine = () => {
  if (!address_line.value.trim()) {
    errors.value.address_line = "این قسمت را خالی نگذارید";
    return false;
  }
  const wordCount = address_line.value.trim().split(/\s+/).length;
  if (wordCount < 3) {
    errors.value.address_line = "آدرس باید حداقل ۳ کلمه داشته باشد";
    return false;
  }
  errors.value.address_line = "";
  return true;
};

const validateProvince = () => {
  if (!province_id.value) {
    errors.value.province_id = "انتخاب استان الزامی است";
    return false;
  }
  errors.value.province_id = "";
  return true;
};

const validateCity = () => {
  if (!city_id.value) {
    errors.value.city_id = "انتخاب شهر الزامی است";
    return false;
  }
  errors.value.city_id = "";
  return true;
};

// انتقال به مرحله ۲ در موبایل
const proceedToDetailsMobile = () => {
  const isP = validateProvince();
  const isC = validateCity();
  if (isP && isC) {
    mobileStep.value = 2;
  }
};

async function executeWithTimeoutAndRetry(
  fn,
  { timeout = TIMEOUT_MS, retries = 1 } = {},
) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    saveAttempt.value = attempt + 1;
    abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, timeout);

    try {
      const result = await fn(abortController.signal);
      clearTimeout(timeoutId);
      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;

      if (attempt === retries) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  throw lastError;
}

function startProgress() {
  progress.value = 0;
  isSaving.value = true;
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 8;
    } else if (progress.value < 98) {
      progress.value += 0.5;
    }
  }, 200);
}

function finishProgress() {
  clearInterval(progressInterval);
  progressInterval = null;
  progress.value = 100;
  setTimeout(() => {
    isSaving.value = false;
    progress.value = 0;
    saveAttempt.value = 0;
  }, 400);
}

function cancelProgress() {
  clearInterval(progressInterval);
  progressInterval = null;
  isSaving.value = false;
  progress.value = 0;
  saveAttempt.value = 0;
}

async function saveAddress() {
  const isProvinceValid = validateProvince();
  const isCityValid = validateCity();
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isPhoneValid = validatePhone();
  const isAddressValid = validateAddressLine();

  if (
    !isProvinceValid ||
    !isCityValid ||
    !isFirstNameValid ||
    !isLastNameValid ||
    !isPhoneValid ||
    !isAddressValid
  ) {
    // در موبایل اگر خطای استان یا شهر وجود داشت، کاربر را برگردان
    if (isMobile.value && (!isProvinceValid || !isCityValid)) {
      mobileStep.value = 1;
    }
    return;
  }

  const receiver_name =
    `${first_name.value.trim()} ${last_name.value.trim()}`.trim();
  const addressData = {
    receiver_name,
    province_id: Number(province_id.value),
    city_id: Number(city_id.value),
    postal_code: postal_code.value,
    address_line: address_line.value.trim(),
    phone: phone.value,
  };

  startProgress();

  try {
    const isEdit = props.editAddress && props.editAddress.id;

    await executeWithTimeoutAndRetry(
      (signal) =>
        isEdit
          ? updateAddress(props.editAddress.id, addressData, signal)
          : createAddress(addressData, signal),
      { timeout: TIMEOUT_MS, retries: 1 },
    );

    finishProgress();
    resetForm();
    emit("save");
  } catch (err) {
    cancelProgress();
    if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors;
      if (serverErrors.receiver_name)
        errors.value.first_name = serverErrors.receiver_name[0];
      if (serverErrors.province_id)
        errors.value.province_id = serverErrors.province_id[0];
      if (serverErrors.city_id) errors.value.city_id = serverErrors.city_id[0];
      if (serverErrors.postal_code)
        errors.value.postal_code = serverErrors.postal_code[0];
      if (serverErrors.address_line)
        errors.value.address_line = serverErrors.address_line[0];
      if (serverErrors.phone) errors.value.phone = serverErrors.phone[0];
    }
  }
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
