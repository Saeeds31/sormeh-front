<!-- app/components/product/title.vue -->
<template>
  <div class="space-y-4" dir="rtl">
    <!-- سطر بالا: عنوان محصول + دکمه‌های علاقه‌مندی و اشتراک‌گذاری -->
    <div class="flex items-start justify-between gap-4">
      <h1 class="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
        {{ title }}
      </h1>

      <div class="flex shrink-0 items-center gap-2">
        <!-- دکمه علاقه‌مندی / لایک -->
        <button
          type="button"
          class="w-10 h-10 rounded-xl flex justify-center items-center cursor-pointer transition-transform active:scale-90"
          :class="
            isInWishlist
              ? 'bg-secondary text-white'
              : 'bg-secondary-fade text-gray-700'
          "
          aria-label="علاقه‌مندی"
          @click="emit('toggle-wishlist')"
        >
          <IconFavLineWhite class="w-6" />
        </button>

        <!-- دکمه اشتراک‌گذاری -->
        <button
          type="button"
          class="w-10 h-10 rounded-xl border border-gray-200 bg-white flex justify-center items-center cursor-pointer transition hover:border-purpul-100 active:scale-90 text-gray-700"
          aria-label="اشتراک‌گذاری"
          @click="shareContent"
        >
          <IconShared class="w-6" />
        </button>
      </div>
    </div>

    <!-- سطر پایین: وضعیت موجودی و تایمر معکوس تخفیف -->
    <div
      class="flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-3"
    >
      <!-- وضعیت موجودی محصول -->
      <div class="flex items-center gap-2">
        <div
          class="w-6 h-6 rounded-md border flex items-center justify-center"
          :class="
            inStock
              ? 'border-green-500 text-green-600 bg-green-50'
              : 'border-red-400 text-red-500 bg-red-50'
          "
        >
          <svg
            v-if="inStock"
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <span
          class="text-sm font-medium"
          :class="inStock ? 'text-green-600' : 'text-red-500'"
        >
          {{ inStock ? "موجود" : "ناموجود" }}
        </span>
      </div>

      <!-- تایمر ۴ تایی تخفیف -->
      <div
        v-if="hasActiveDiscount"
        class="flex items-center flex-row-reverse gap-1.5"
        dir="ltr"
      >
        <!-- ثانیه -->
        <div
          class="flex flex-col items-center justify-center w-11 h-11 bg-[#A093D0] text-white rounded-xl shadow-xs"
        >
          <span class="text-xs font-bold leading-none">{{
            formatDigits(remainingTime.seconds)
          }}</span>
          <span class="text-[9px] mt-1 leading-none opacity-90">ثانیه</span>
        </div>
        <!-- دقیقه -->
        <div
          class="flex flex-col items-center justify-center w-11 h-11 bg-[#A093D0] text-white rounded-xl shadow-xs"
        >
          <span class="text-xs font-bold leading-none">{{
            formatDigits(remainingTime.minutes)
          }}</span>
          <span class="text-[9px] mt-1 leading-none opacity-90">دقیقه</span>
        </div>
        <!-- ساعت -->
        <div
          class="flex flex-col items-center justify-center w-11 h-11 bg-[#A093D0] text-white rounded-xl shadow-xs"
        >
          <span class="text-xs font-bold leading-none">{{
            formatDigits(remainingTime.hours)
          }}</span>
          <span class="text-[9px] mt-1 leading-none opacity-90">ساعت</span>
        </div>
        <!-- روز -->
        <div
          class="flex flex-col items-center justify-center w-11 h-11 bg-[#A093D0] text-white rounded-xl shadow-xs"
        >
          <span class="text-xs font-bold leading-none">{{
            formatDigits(remainingTime.days)
          }}</span>
          <span class="text-[9px] mt-1 leading-none opacity-90">روز</span>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  price: {
    type: [Number, String],
    default: null,
  },
  oldPrice: {
    type: [Number, String],
    default: null,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isInWishlist: {
    type: Boolean,
    default: false,
  },
  discountStartAt: {
    type: [String, Date, Number],
    default: null,
  },
  discountEndAt: {
    type: [String, Date, Number],
    default: null,
  },
});

const emit = defineEmits(["toggle-wishlist"]);

/* --- ساعت جاری با fallback مطمئن --- */
const now = ref(Date.now());
let timerInterval = null;

// پارسر همه‌فن‌حریف انواع فرمت‌های تاریخ سرور
const parseDateMs = (value) => {
  if (!value) return null;

  if (typeof value === "number") return value;

  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isFinite(time) ? time : null;
  }

  // تبدیل اسلش به خط تیره، فاصله‌ها به T و حذف فاصله‌های اضافی
  let str = String(value).trim().replace(/\//g, "-").replace(" ", "T");

  let time = Date.parse(str);

  // اگر به خاطر عدم تایم‌زون در برخی پلتفرم‌ها parse نشد:
  if (!Number.isFinite(time)) {
    time = new Date(str).getTime();
  }

  return Number.isFinite(time) ? time : null;
};

const discountStartMs = computed(() => parseDateMs(props.discountStartAt));
const discountEndMs = computed(() => parseDateMs(props.discountEndAt));

// آیا تخفیف در زمان فعلی فعال است؟
const hasActiveDiscount = computed(() => {
  const end = discountEndMs.value;
  const start = discountStartMs.value;
  const current = now.value;

  if (!end) return false;

  const isStarted = !start || current >= start;
  const isNotExpired = current < end;

  return isStarted && isNotExpired;
});

// محاسبه مقادیر ثانیه، دقیقه، ساعت، روز
const remainingTime = computed(() => {
  const end = discountEndMs.value;
  const current = now.value;

  if (!hasActiveDiscount.value || !end) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = Math.max(end - current, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
});

const formatDigits = (num) => {
  return String(num).padStart(2, "0");
};

onMounted(() => {
  now.value = Date.now();
  timerInterval = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const shareContent = async () => {
  const shareData = {
    title: props.title,
    text: `مشاهده محصول: ${props.title}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {}
  } else {
    toast.error("مرورگر شما از اشتراک‌گذاری پشتیبانی نمی‌کند.");
  }
};
</script>
