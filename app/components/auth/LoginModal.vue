<!-- components/auth/LoginModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="loginModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        @click.self="closeModal"
      >
        <div
          dir="rtl"
          class="relative w-full max-w-[440px] rounded-2xl bg-white p-6 text-gray-800 shadow-2xl sm:p-8"
          @click.stop
        >
          <button
            type="button"
            class="absolute top-5 left-5 rounded-md p-1 text-gray-400 transition hover:text-gray-700"
            aria-label="بستن پنجره ورود"
            @click="closeModal"
          >
            <iconClose class="h-5 w-5" />
          </button>

          <div class="mb-2 flex justify-center">
            <img
              src="/icons/sormeh.svg"
              alt="لوگو سرمه"
              class="h-14 w-auto object-contain"
            />
          </div>

          <div class="mb-5 text-center">
            <h3 class="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
              ورود یا ثبت‌نام
            </h3>
            <p class="text-xs leading-relaxed text-gray-400">
              برای ادامه به سرمه، اگر حساب ندارید همین‌جا ساخته می‌شود.
            </p>
          </div>

          <!-- تب‌ها فقط تا قبل از مرحله ثبت‌نام نمایش داده می‌شوند. -->
          <div
            v-if="activeTab !== 'register'"
            class="mb-6 grid grid-cols-2 rounded-xl border border-gray-200 bg-gray-100 p-1"
          >
            <button
              type="button"
              :disabled="btnLoader"
              :class="[
                'rounded-lg py-2 text-xs font-bold transition-all sm:text-sm',
                activeTab === 'otp'
                  ? 'border border-gray-200 bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800',
              ]"
              @click="switchTab('otp')"
            >
              کد تأیید
            </button>

            <button
              type="button"
              :disabled="btnLoader"
              :class="[
                'rounded-lg py-2 text-xs font-bold transition-all sm:text-sm',
                activeTab === 'password'
                  ? 'border border-gray-200 bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800',
              ]"
              @click="switchTab('password')"
            >
              رمز عبور
            </button>
          </div>

          <!-- ورود با کد: دریافت شماره -->
          <form
            v-if="activeTab === 'otp' && otpSubStep === 'enter-mobile'"
            class="space-y-4"
            @submit.prevent="handleMobileSubmit"
          >
            <div>
              <label
                for="login-mobile"
                class="mb-1.5 block text-right text-xs font-bold text-gray-800"
              >
                شماره همراه
              </label>
              <input
                id="login-mobile"
                v-model="mobile"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
                dir="ltr"
                placeholder="09121251234"
                maxlength="11"
                :disabled="btnLoader"
                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#462d66]"
              />
              <p class="mt-1.5 text-right text-xs text-gray-400">
                کد تأیید به این شماره پیامک می‌شود.
              </p>
            </div>

            <button
              type="submit"
              :disabled="btnLoader || !isValidMobile"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#462d66] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#392454] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span v-if="!btnLoader">ادامه</span>
              <template v-else>
                <svg
                  class="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                در حال بررسی...
              </template>
            </button>
          </form>

          <!-- ورود با کد: تأیید کد شش‌رقمی مطابق API فایل اصلی -->
          <div
            v-else-if="activeTab === 'otp' && otpSubStep === 'verify-code'"
            class="space-y-4"
          >
            <div
              class="rounded-xl border border-gray-200 bg-gray-100 p-3 text-center"
            >
              <p class="mb-1 text-xs text-gray-600">
                کد تأیید به شماره
                <strong dir="ltr" class="inline-block font-bold text-gray-900">
                  {{ mobile }}
                </strong>
                پیامک شد.
              </p>
              <button
                type="button"
                :disabled="btnLoader"
                class="text-xs font-medium text-gray-500 underline transition hover:text-gray-800"
                @click="editMobile"
              >
                ویرایش شماره
              </button>
            </div>

            <div>
              <label
                class="mb-2 block text-right text-xs font-bold text-gray-800"
              >
                کد تأیید ۶ رقمی
              </label>
              <div
                dir="ltr"
                class="flex items-center justify-between gap-1.5 sm:gap-2"
              >
                <input
                  v-for="(_, index) in otpDigits"
                  :id="`login-otp-${index}`"
                  :key="index"
                  :value="otpDigits[index]"
                  type="text"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  maxlength="1"
                  :disabled="btnLoader"
                  :aria-label="`رقم ${index + 1} کد تأیید`"
                  class="h-11 min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 text-center text-lg font-bold text-gray-900 transition focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#462d66] sm:h-12"
                  @input="handleOtpInput($event, index)"
                  @keydown="handleOtpKeydown($event, index)"
                  @paste="handleOtpPaste($event, index)"
                />
              </div>
            </div>

            <button
              type="button"
              :disabled="btnLoader || !isValidOtp"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#462d66] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#392454] disabled:cursor-not-allowed disabled:opacity-60"
              @click="verifyOtpCode"
            >
              <span v-if="!btnLoader">تأیید و ورود</span>
              <svg
                v-else
                class="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                aria-label="در حال بررسی"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </button>

            <div class="pt-1 text-center">
              <span v-if="timer > 0" class="text-xs text-gray-500">
                ارسال مجدد کد در {{ timer }} ثانیه دیگر
              </span>
              <button
                v-else
                type="button"
                :disabled="btnLoader"
                class="text-xs font-bold text-[#462d66] hover:underline disabled:opacity-60"
                @click="resendOtp"
              >
                ارسال مجدد کد
              </button>
            </div>
          </div>

          <!-- ورود با رمز عبور -->
          <form
            v-else-if="activeTab === 'password'"
            class="space-y-4"
            @submit.prevent="loginWithPass"
          >
            <div>
              <label
                for="password-mobile"
                class="mb-1.5 block text-right text-xs font-bold text-gray-800"
              >
                شماره همراه
              </label>
              <input
                id="password-mobile"
                v-model="mobile"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
                dir="ltr"
                placeholder="09121251234"
                maxlength="11"
                :disabled="btnLoader"
                class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#462d66]"
              />
            </div>

            <div>
              <label
                for="login-password"
                class="mb-1.5 block text-right text-xs font-bold text-gray-800"
              >
                رمز عبور
              </label>
              <div class="relative">
                <input
                  id="login-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  dir="ltr"
                  :disabled="btnLoader"
                  class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pl-10 text-sm text-gray-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#462d66]"
                />
                <button
                  type="button"
                  :disabled="btnLoader"
                  :aria-label="
                    showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'
                  "
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
                  @click="showPassword = !showPassword"
                >
                  <svg
                    v-if="showPassword"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 10V7a6 6 0 0112 0v3M5 10h14a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2v-7a2 2 0 012-2h2z"
                    />
                  </svg>
                </button>
              </div>
              <p class="mt-1.5 text-right text-xs text-gray-400">
                برای ساخت حساب جدید، از تب «کد تأیید» استفاده کنید.
              </p>
            </div>

            <button
              type="submit"
              :disabled="btnLoader || !isValidMobile || password.length < 6"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#462d66] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#392454] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span v-if="!btnLoader">ورود</span>
              <span v-else>در حال ورود...</span>
            </button>
          </form>

          <!-- ثبت‌نام پس از پاسخ need_register از API -->
          <div v-else-if="activeTab === 'register'" class="space-y-4">
            <div class="text-center">
              <h4 class="text-base font-bold text-gray-800">
                تکمیل اطلاعات حساب
              </h4>
              <p class="mt-1 text-xs text-gray-400">
                لطفاً نام و رمز عبور حساب خود را تعیین کنید.
              </p>
            </div>

            <form class="space-y-3" @submit.prevent="completeRegistration">
              <div>
                <label
                  for="register-name"
                  class="mb-1 block text-right text-xs font-bold text-gray-800"
                >
                  نام و نام خانوادگی
                </label>
                <input
                  id="register-name"
                  v-model="fullName"
                  type="text"
                  autocomplete="name"
                  :disabled="btnLoader"
                  class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#462d66]"
                />
              </div>

              <div>
                <label
                  for="register-password"
                  class="mb-1 block text-right text-xs font-bold text-gray-800"
                >
                  رمز عبور (حداقل ۶ کاراکتر)
                </label>
                <input
                  id="register-password"
                  v-model="password"
                  type="password"
                  autocomplete="new-password"
                  dir="ltr"
                  :disabled="btnLoader"
                  class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#462d66]"
                />
              </div>

              <button
                type="submit"
                :disabled="btnLoader || !isRegisterValid"
                class="flex w-full items-center justify-center rounded-xl bg-[#462d66] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#392454] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ btnLoader ? "در حال ثبت‌نام..." : "ثبت‌نام و ورود" }}
              </button>
            </form>
          </div>

          <div class="mt-6 text-center text-xs leading-5 text-gray-400">
            ورود یا ثبت‌نام شما به معنای پذیرش
            <NuxtLink
              to="/terms"
              class="mx-0.5 font-bold text-gray-700 hover:text-black"
            >
              قوانین و مقررات
            </NuxtLink>
            و
            <NuxtLink
              to="/privacy"
              class="mx-0.5 font-bold text-gray-700 hover:text-black"
            >
              حریم خصوصی سرمه
            </NuxtLink>
            است.
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref } from "vue";
import { useAuth, useApiAuth } from "~/composables/useAuth";
import { toast } from "vue3-toastify";

const { checkMobile, sendOtp, verifyOtp, loginWithPassword, register } =
  useApiAuth();
const { loginModal } = useAuth();

const activeTab = ref("otp"); // otp | password | register
const otpSubStep = ref("enter-mobile"); // enter-mobile | verify-code

const mobile = ref("");
const password = ref("");
const fullName = ref("");
const showPassword = ref(false);
const btnLoader = ref(false);

const OTP_LENGTH = 6; // مطابق فایل اصلی و قرارداد فعلی API
const otpDigits = ref(Array(OTP_LENGTH).fill(""));
const otp = computed(() => otpDigits.value.join(""));
const isValidOtp = computed(() => /^\d{6}$/.test(otp.value));

const timer = ref(0);
let timerInterval = null;

const isValidMobile = computed(() => /^09\d{9}$/.test(mobile.value.trim()));
const isRegisterValid = computed(
  () => fullName.value.trim().length >= 3 && password.value.length >= 6,
);

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timer.value = 0;
}

function startTimer() {
  clearTimer();
  timer.value = 60;

  timerInterval = setInterval(() => {
    timer.value -= 1;
    if (timer.value <= 0) clearTimer();
  }, 1000);
}

function resetForm() {
  activeTab.value = "otp";
  otpSubStep.value = "enter-mobile";
  mobile.value = "";
  password.value = "";
  fullName.value = "";
  showPassword.value = false;
  otpDigits.value = Array(OTP_LENGTH).fill("");
  btnLoader.value = false;
  clearTimer();
}

function closeModal() {
  loginModal.value = false;
  resetForm();
}

function switchTab(tab) {
  if (btnLoader.value || activeTab.value === tab) return;
  activeTab.value = tab;
  // وضعیت کد و تایمر هنگام جابه‌جایی تب‌ها حفظ می‌شود.
}

function editMobile() {
  if (btnLoader.value) return;
  otpSubStep.value = "enter-mobile";
  otpDigits.value = Array(OTP_LENGTH).fill("");
  clearTimer();
}

function focusOtp(index) {
  nextTick(() => {
    document.getElementById(`login-otp-${index}`)?.focus();
  });
}

function handleOtpInput(event, index) {
  const digit = event.target.value.replace(/\D/g, "").slice(-1);
  otpDigits.value[index] = digit;
  event.target.value = digit;

  if (digit && index < OTP_LENGTH - 1) {
    focusOtp(index + 1);
  }

  if (isValidOtp.value && !btnLoader.value) {
    verifyOtpCode();
  }
}

function handleOtpKeydown(event, index) {
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    focusOtp(index - 1);
  }
}

function handleOtpPaste(event, index) {
  event.preventDefault();

  const pasted = event.clipboardData
    ?.getData("text")
    .replace(/\D/g, "")
    .slice(0, OTP_LENGTH);

  if (!pasted) return;

  // برای چسباندن یک کد کامل، از خانه اول آغاز می‌کنیم.
  const startIndex = pasted.length === OTP_LENGTH ? 0 : index;
  const digits = [...otpDigits.value];

  for (let i = 0; i < pasted.length && startIndex + i < OTP_LENGTH; i++) {
    digits[startIndex + i] = pasted[i];
  }

  otpDigits.value = digits;

  if (isValidOtp.value && !btnLoader.value) {
    verifyOtpCode();
  } else {
    focusOtp(Math.min(startIndex + pasted.length, OTP_LENGTH - 1));
  }
}

async function handleMobileSubmit() {
  if (btnLoader.value) return;
  if (!isValidMobile.value) {
    toast.error("شماره موبایل معتبر نیست");
    return;
  }

  btnLoader.value = true;
  try {
    const phone = mobile.value.trim();

    // بررسی شماره از فایل اصلی حفظ شده است. انتخاب تب «کد تأیید»
    // به این معناست که حتی کاربر موجود نیز کد دریافت کند.
    await checkMobile(phone);
    await sendOtp(phone);

    mobile.value = phone;
    otpDigits.value = Array(OTP_LENGTH).fill("");
    otpSubStep.value = "verify-code";
    startTimer();
    focusOtp(0);
  } catch (err) {
    toast.error(err?.response?.data?.message || "خطایی رخ داد");
  } finally {
    btnLoader.value = false;
  }
}

async function verifyOtpCode() {
  if (
    btnLoader.value ||
    otpSubStep.value !== "verify-code" ||
    !isValidOtp.value
  ) {
    return;
  }

  btnLoader.value = true;
  try {
    const res = await verifyOtp(mobile.value, otp.value);

    if (res.data.status === "need_register" || res.data.is_new_user) {
      clearTimer();
      activeTab.value = "register";
    } else {
      await handleSuccessfulLogin(res.data);
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "کد نامعتبر است");
  } finally {
    btnLoader.value = false;
  }
}

async function completeRegistration() {
  if (btnLoader.value || !isRegisterValid.value) return;

  btnLoader.value = true;
  try {
    const res = await register(
      mobile.value,
      password.value,
      fullName.value.trim(),
    );
    await handleSuccessfulLogin(res.data);
  } catch (err) {
    toast.error(err?.response?.data?.message || "خطا در ثبت‌نام");
  } finally {
    btnLoader.value = false;
  }
}

async function loginWithPass() {
  if (btnLoader.value) return;
  if (!isValidMobile.value) {
    toast.error("شماره موبایل معتبر نیست");
    return;
  }
  if (password.value.length < 6) return;

  btnLoader.value = true;
  try {
    const res = await loginWithPassword(mobile.value.trim(), password.value);
    await handleSuccessfulLogin(res.data);
  } catch (err) {
    toast.error(err?.response?.data?.message || "رمز عبور اشتباه است");
  } finally {
    btnLoader.value = false;
  }
}

async function resendOtp() {
  if (btnLoader.value || timer.value > 0) return;

  btnLoader.value = true;
  try {
    await sendOtp(mobile.value);
    otpDigits.value = Array(OTP_LENGTH).fill("");
    startTimer();
    focusOtp(0);
    toast.success("کد یک‌بارمصرف ارسال شد");
  } catch (err) {
    toast.error(err?.response?.data?.message || "خطا در ارسال مجدد کد");
  } finally {
    btnLoader.value = false;
  }
}

async function handleSuccessfulLogin(data) {
  const { $api } = useNuxtApp();

  localStorage.setItem("auth-token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  if ($api.defaults?.headers?.common) {
    $api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  }

  toast.success(`خوش آمدید ${data.user.full_name || data.user.mobile}`);
  closeModal();

  // رفتار هدایت فایل اصلی؛ بدون reload یا تغییر منطق سبد خرید.
  window.location.href = localStorage.getItem("lastPage") ?? "/";
}

onUnmounted(clearTimer);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
