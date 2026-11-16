<!-- app/components/home/OffersSection.vue -->
<template>
  <section
    v-if="new_products && new_products.length"
    class="relative overflow-hidden max-md:bg-[#F2EFF9]"
  >
    <div class="mx-auto container">
      <div class="relative isolate py-6" dir="rtl">
        <div class="mb-4 block md:hidden">
          <SharedSectionSliderHeader
            :show-arrows="true"
            :disabled="new_products.length < 2"
            wrapper-class="w-full items-center gap-3"
            title-wrapper-class="shrink-0"
            divider-class="bg-gray-200"
            divider-visible-class="!block"
            actions-class="shrink-0"
            button-class="bg-[#EAE2F3] text-[#3F2356] hover:bg-[#3F2356] hover:text-white transition-all active:scale-95"
            prev-label="قبلی"
            next-label="بعدی"
            @prev="onMobilePrev"
            @next="onMobileNext"
          >
            <template #title>
              <div class="flex items-center gap-1.5">
                <img
                  :src="bannerSrc"
                  alt="پیشنهاد شگفت‌انگیز"
                  class="h-10 w-10 shrink-0 object-contain bg-white p-1 rounded-lg h-12 w-12"
                />

                <div class="flex flex-col items-start gap-1.5 text-right">
                  <div class="flex items-center gap-1 leading-none">
                    <span class="text-sm font-bold text-gray-900">
                      پیشنهادهای
                    </span>
                    <span class="text-sm font-bold text-[#3F2356]">
                      شگفت‌انگیز
                    </span>
                  </div>

                  <div
                    v-if="hasActiveDiscount"
                    class="flex items-center flex-row-reverse gap-1"
                    dir="ltr"
                  >
                    <div
                      class="flex h-6 w-6 flex-col items-center justify-center rounded-md bg-[#EAE2F3] text-[#3F2356]"
                    >
                      <span class="text-xs leading-none text-red-600">{{
                        formatDigits(remainingTime.seconds)
                      }}</span>
                    </div>

                    <span class="text-xs font-bold text-[#3F2356]">:</span>

                    <div
                      class="flex h-6 w-6 flex-col items-center justify-center rounded-md bg-[#EAE2F3] text-[#3F2356]"
                    >
                      <span class="text-xs leading-none text-red-600">{{
                        formatDigits(remainingTime.minutes)
                      }}</span>
                    </div>

                    <span class="text-xs font-bold text-[#3F2356]">:</span>

                    <div
                      class="flex h-6 w-6 flex-col items-center justify-center rounded-md bg-[#EAE2F3] text-[#3F2356]"
                    >
                      <span class="text-xs leading-none text-red-600">{{
                        formatDigits(remainingTime.hours)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template #prevIcon>
              <svg
                class="h-4 w-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </template>

            <template #nextIcon>
              <svg
                class="h-4 w-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </template>
          </SharedSectionSliderHeader>
        </div>

        <div
          class="absolute right-0 top-0 z-[1] hidden h-full w-[260px] flex-col items-center justify-between rounded-[28px] bg-[#9575cd] px-6 py-10 text-center text-white shadow-[0_10px_25px_-5px_rgba(149,117,205,0.3)] md:flex lg:w-[290px]"
        >
          <div class="mb-2 flex h-32 w-32 items-center justify-center">
            <img
              :src="bannerSrc"
              alt="پیشنهاد شگفت‌انگیز"
              class="h-full w-full object-contain drop-shadow-lg"
            />
          </div>

          <div class="mb-6 space-y-2">
            <h2 class="text-2xl font-bold tracking-wide">پیشنهادهای</h2>
            <h3 class="text-xl font-bold tracking-wider">شگفت انگیز</h3>
          </div>

          <div class="mb-6 w-full border-t border-dashed border-white/40"></div>

          <div
            v-if="hasActiveDiscount"
            class="flex w-full items-center flex-row-reverse justify-center gap-3"
          >
            <div
              class="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white text-[#5b3d8d] shadow-md"
            >
              <span class="text-base font-bold">{{
                formatDigits(remainingTime.hours)
              }}</span>
              <span class="text-xs font-medium text-gray-500">ساعت</span>
            </div>

            <div
              class="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white text-[#5b3d8d] shadow-md"
            >
              <span class="text-base font-bold">{{
                formatDigits(remainingTime.minutes)
              }}</span>
              <span class="text-xs font-medium text-gray-500">دقیقه</span>
            </div>

            <div
              class="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white text-[#5b3d8d] shadow-md"
            >
              <span class="text-base font-bold">{{
                formatDigits(remainingTime.seconds)
              }}</span>
              <span class="text-xs font-medium text-gray-500">ثانیه</span>
            </div>
          </div>
        </div>

        <div ref="mobileSliderContainer" class="block md:hidden">
          <ClientOnly>
            <SharedMobileDoubleRowSlider
              :products="new_products"
              :trending-ids="trendingIds"
              :new-ids="newIds"
              :save-loc="true"
              active-tab="offers"
            />
          </ClientOnly>
        </div>

        <div
          class="relative z-[2] hidden min-w-0 md:block md:pr-[220px] lg:pr-[250px]"
        >
          <ClientOnly>
            <HomeSlidersHomeOfferSlider
              :title="title"
              :products="new_products"
              :trending-ids="trendingIds"
              :new-ids="newIds"
              prev-button-class=".offer-prev"
              next-button-class=".offer-next"
            />
          </ClientOnly>
        </div>

        <button
          type="button"
          class="offer-prev absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-2xl border border-purple-200 bg-white text-[#3F2356] shadow-md transition-all hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-30 lg:left-6 md:flex"
          aria-label="قبلی"
        >
          <svg
            class="w-5 h-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          type="button"
          class="offer-next absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-2xl border border-purple-200 bg-white text-[#3F2356] shadow-md transition-all hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-30 md:right-[230px] md:flex lg:right-[265px]"
          aria-label="بعدی"
        >
          <svg
            class="w-5 h-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

interface Props {
  new_products?: any[];
  title?: string;
  bannerSrc?: string;
  trendingIds?: any[];
  newIds?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  new_products: () => [],
  title: "پیشنهادهای شگفت انگیز",
  bannerSrc: "/static-files/discount-percentage.svg",
  trendingIds: () => [],
  newIds: () => [],
});

const mobileSliderContainer = ref<HTMLElement | null>(null);

/* --- منطق شمارنده معکوس دقیق متصل به API --- */
const now = ref(Date.now());
let timerInterval: any = null;

const parseDateMs = (value: any) => {
  if (!value) return null;
  if (typeof value === "number") return value;
  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isFinite(time) ? time : null;
  }
  let str = String(value).trim().replace(/\//g, "-").replace(" ", "T");
  let time = Date.parse(str);
  if (!Number.isFinite(time)) {
    time = new Date(str).getTime();
  }
  return Number.isFinite(time) ? time : null;
};

const activeDiscountEndAt = computed(() => {
  if (!props.new_products || !props.new_products.length) return null;
  for (const item of props.new_products) {
    const end = item.discount_end_at || item.end_at;
    if (end) return end;
  }
  return props.new_products[0]?.discount_end_at || null;
});

const activeDiscountStartAt = computed(() => {
  if (!props.new_products || !props.new_products.length) return null;
  for (const item of props.new_products) {
    const start = item.discount_start_at || item.start_at;
    if (start) return start;
  }
  return props.new_products[0]?.discount_start_at || null;
});

const discountEndMs = computed(() => parseDateMs(activeDiscountEndAt.value));
const discountStartMs = computed(() =>
  parseDateMs(activeDiscountStartAt.value),
);

const hasActiveDiscount = computed(() => {
  const end = discountEndMs.value;
  const start = discountStartMs.value;
  const current = now.value;

  if (!end) return false;
  const isStarted = !start || current >= start;
  const isNotExpired = current < end;

  return isStarted && isNotExpired;
});

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

const formatDigits = (num: number) => {
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

/*
 * اسکرول مستقیم یا شلیک کلیک بر روی اسلایدر موبایل
 */
const scrollMobileSlider = (direction: "left" | "right") => {
  if (!mobileSliderContainer.value) return;

  const swiperInstance = (
    mobileSliderContainer.value.querySelector(".swiper") as any
  )?.swiper;
  if (swiperInstance) {
    if (direction === "left") swiperInstance.slideNext();
    else swiperInstance.slidePrev();
    return;
  }

  const scrollable =
    mobileSliderContainer.value.querySelector<HTMLElement>(
      ".overflow-x-auto, [class*='overflow-x']",
    ) || mobileSliderContainer.value;

  const scrollAmount = 240;
  scrollable.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

const onMobilePrev = () => {
  scrollMobileSlider("right");
};

const onMobileNext = () => {
  scrollMobileSlider("left");
};
</script>
