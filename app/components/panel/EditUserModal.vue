<!-- app/components/panel/EditUserModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[100] overflow-hidden bg-slate-950/55 backdrop-blur-[2px] sm:overflow-y-auto sm:p-5"
    @click.self="emit('close')"
  >
    <div
      class="flex h-full min-h-0 w-full items-center justify-center sm:min-h-full"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        class="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-white shadow-2xl sm:my-auto sm:h-auto sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-gray-100"
      >
        <div class="h-1.5 bg-[#533470]"></div>

        <header
          class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5"
        >
          <div class="space-y-1">
            <h2
              id="user-modal-title"
              class="text-base font-extrabold text-gray-900 sm:text-lg"
            >
              اطلاعات کاربری
            </h2>
            <p class="text-xs leading-6 text-gray-500">
              اطلاعات حساب کاربری خود را بررسی و به‌روزرسانی کنید.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533470]/30"
            aria-label="بستن"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </header>
        <form
          @submit.prevent="saveUser"
          class="grid grid-cols-1 gap-x-5 gap-y-4 p-4 pt-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3"
        >
          <div class="flex flex-col gap-2">
            <label for="fullName" class="text-sm font-bold text-gray-700">
              نام و نام خانوادگی
            </label>
            <input
              id="fullName"
              v-model="name"
              type="text"
              autocomplete="name"
              placeholder="مثال: حمیدرضا حاج‌دادی"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
            />
          </div>

          <div class="relative flex flex-col gap-2">
            <label for="birthDate" class="text-sm font-bold text-gray-700">
              تاریخ تولد
            </label>
            <Calendar
              class="pointer-events-none absolute right-4 top-[43px] h-4 w-4 text-gray-400"
            />
            <input
              id="birthDate"
              :value="birthDate"
              type="text"
              inputmode="numeric"
              autocomplete="bday"
              placeholder="1374/01/06"
              maxlength="10"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white py-3 pr-10 pl-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
              @input="handleBirthDateInput"
              @keydown="handleBirthDateKeydown"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="phone" class="text-sm font-bold text-gray-700">
              شماره تماس
            </label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              inputmode="tel"
              autocomplete="tel"
              placeholder="۰۹*********"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="nationalCode" class="text-sm font-bold text-gray-700">
              کد ملی
            </label>
            <input
              id="nationalCode"
              v-model="nationalCode"
              type="text"
              inputmode="numeric"
              autocomplete="off"
              placeholder="۱۲۳۴۵۶۷۸۹۰"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="text-sm font-bold text-gray-700">
              رمز عبور
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              placeholder="خالی بگذارید تا تغییر نکند"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="confirmPassword"
              class="text-sm font-bold text-gray-700"
            >
              تأیید رمز عبور
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="تکرار رمز عبور جدید"
              class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
            />
          </div>
        </form>
        <footer
          class="shrink-0 border-t border-gray-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-4"
        >
          <button
            type="submit"
            class="min-h-12 w-full rounded-xl btn px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#43275b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533470]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? "در حال ذخیره..." : "ذخیره اطلاعات" }}
          </button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { X, Calendar } from "lucide-vue-next";
import { toast } from "vue3-toastify";
import { useApi } from "@/composables/api/useApi";

const props = defineProps({
  show: Boolean,
  userData: Object,
});

const emit = defineEmits(["close", "save"]);

const name = ref("");
const birthDate = ref("");
const phone = ref("");
const email = ref("");
const nationalCode = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

function toEnglishDigits(value) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
}

/**
 * مقدار API را برای نمایش به YYYY/MM/DD تبدیل می‌کند.
 * مثال: 1374-01-05T20:34:16.000000Z → 1374/01/05
 */
function formatBirthDateForInput(value) {
  if (!value) return "";

  const datePart = toEnglishDigits(String(value).trim().split("T")[0]);
  const parts = datePart.split(/[-/]/);

  if (parts.length !== 3) return "";

  const [year, month, day] = parts;
  return `${year}/${month}/${day}`;
}

/**
 * ورودی را به ارقام انگلیسی و قالب YYYY/MM/DD محدود می‌کند.
 * با تکمیل هر بخش، / به‌طور خودکار اضافه می‌شود.
 */
function handleBirthDateInput(event) {
  const input = event.target;
  const rawValue = toEnglishDigits(input.value);
  const digits = rawValue.replace(/\D/g, "").slice(0, 8);

  let formatted = digits.slice(0, 4);

  if (digits.length > 4) {
    formatted += `/${digits.slice(4, 6)}`;
  }

  if (digits.length > 6) {
    formatted += `/${digits.slice(6, 8)}`;
  }

  birthDate.value = formatted;
  input.value = formatted;

  // انتقال نشانگر به موقعیت انتهای مقدار قالب‌بندی‌شده
  input.setSelectionRange(formatted.length, formatted.length);
}

/**
 * هنگام تایپ، پس از تکمیل سال یا ماه، جداکننده به‌صورت خودکار درج می‌شود.
 * Backspace و کلیدهای حرکتی دست‌نخورده می‌مانند.
 */
function handleBirthDateKeydown(event) {
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.key.length !== 1
  ) {
    return;
  }

  if (!/\d/.test(toEnglishDigits(event.key))) {
    event.preventDefault();
  }
}

function normalizeBirthDateForApi(value) {
  if (!value) return "";

  const normalized = toEnglishDigits(value).replace(/-/g, "/");
  const parts = normalized.split("/");

  if (parts.length !== 3) return "";

  const [year, month, day] = parts;

  if (!/^\d{4}$/.test(year) || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(day)) {
    return "";
  }

  // خروجی API: YYYY-MM-DD؛ بدون ساخت Date و بدون تبدیل timezone
  return `${year}-${month}-${day}`;
}

watch(
  () => [props.show, props.userData],
  ([show, userData]) => {
    if (!show || !userData) return;

    name.value = userData.full_name || "";
    birthDate.value = formatBirthDateForInput(userData.birth_date);
    phone.value = userData.mobile || "";
    email.value = userData.email || "";
    nationalCode.value = userData.national_code || "";
    password.value = "";
    confirmPassword.value = "";
  },
  { immediate: true },
);

const { updateUserProfile } = useApi();

async function saveUser() {
  if (!name.value || !phone.value) {
    toast.error("لطفاً نام و شماره تماس را وارد کنید");
    return;
  }

  if (password.value && password.value !== confirmPassword.value) {
    toast.error("رمز عبور و تأیید آن یکسان نیست");
    return;
  }

  let birthDateForApi;

  if (birthDate.value) {
    birthDateForApi = normalizeBirthDateForApi(birthDate.value);

    if (!birthDateForApi) {
      toast.error(
        "تاریخ را کامل و به‌شکل سال/ماه/روز وارد کنید؛ مثال: 1374/01/06",
      );
      return;
    }
  }

  loading.value = true;

  try {
    const updateData = {
      full_name: name.value,
      mobile: phone.value,
      birth_date: birthDateForApi || undefined,
      national_code: nationalCode.value || undefined,
    };

    if (password.value) {
      updateData.password = password.value;
      updateData.password_confirmation = confirmPassword.value;
    }

    await updateUserProfile(updateData);

    toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
    emit("save");
    emit("close");
  } catch (error) {
    console.error("Failed to update profile:", error);
    toast.error(error?.response?.data?.message || "خطا در به‌روزرسانی اطلاعات");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.input:focus {
  border-color: var(--bg-secondary);
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
}

input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
}
</style>
