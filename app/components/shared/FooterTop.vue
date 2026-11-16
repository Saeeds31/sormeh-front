<template>
  <div class="container !my-6 font-sans">
    <div
      class="bg-[#D5CBEB]/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/50 shadow-sm transition-all duration-500"
    >
      <div
        class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6"
      >
        <!-- بخش ۱: کارت‌های ارتباطی (بدون تغییر در ساختار) -->
        <div
          class="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto flex-1 order-1 lg:order-2"
        >
          <!-- ۱. تلفن تماس -->
          <div
            class="bg-white rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:justify-between gap-2.5 shadow-xs border border-[#EBE5F5] text-center sm:text-right lg:text-center"
          >
            <div
              class="w-9 h-9 sm:w-16 sm:h-12 lg:border-b-2 lg:border-dashed lg:border-[#D5CBEB] flex items-center justify-center text-[#4B3073] shrink-0 order-1 sm:order-2 lg:order-1"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div
              class="flex flex-col items-center sm:items-start lg:items-center order-2 sm:order-1 lg:order-2 min-w-0"
            >
              <a
                href="tel:09115118790"
                dir="ltr"
                class="text-xs sm:text-sm font-bold text-[#4B3073] hover:opacity-80 transition whitespace-nowrap"
                >۰۹۱۱-۵۱۱-۸۷۹۰</a
              >
              <span
                class="text-xs sm:text-sm text-gray-400 mt-0.5 whitespace-nowrap"
                >همیشه آنلاین هستیم</span
              >
            </div>
          </div>

          <!-- ۲. آدرس فروشگاه -->
          <div
            class="bg-white rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:justify-between gap-2.5 shadow-xs border border-[#EBE5F5] text-center sm:text-right lg:text-center"
          >
            <div
              class="w-9 h-9 sm:w-16 sm:h-12 lg:border-b-2 lg:border-dashed lg:border-[#D5CBEB] flex items-center justify-center text-[#4B3073] shrink-0 order-1 sm:order-2 lg:order-1"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div
              class="order-2 flex min-w-0 flex-col items-center sm:order-1 sm:items-start lg:order-2 lg:items-center"
            >
              <span
                class="max-w-full text-[10px] sm:text-xs font-bold leading-5 text-[#4B3073] break-words line-clamp-2"
                title="گلستان-گرگان-نبش گلشهر ۲"
                >گلستان-گرگان-نبش گلشهر ۲-فروشگاه سرمه</span
              >
            </div>
          </div>

          <!-- ۳. اینستاگرام -->
          <div
            class="col-span-2 lg:col-span-1 bg-white rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:justify-between gap-2.5 shadow-xs border border-[#EBE5F5] text-center sm:text-right lg:text-center"
          >
            <div
              class="w-9 h-9 sm:w-16 sm:h-12 lg:border-b-2 lg:border-dashed lg:border-[#D5CBEB] flex items-center justify-center text-[#4B3073] shrink-0 order-1 sm:order-2 lg:order-1"
            >
              <img
                src="/icons/Instagram1.svg"
                alt="Instagram"
                class="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              />
            </div>
            <div
              class="flex flex-col items-center sm:items-start lg:items-center order-2 sm:order-1 lg:order-2 min-w-0"
            >
              <a
                href="https://instagram.com/sormeh.cosmetic_"
                target="_blank"
                rel="noopener"
                class="text-xs sm:text-base font-bold text-[#4B3073] hover:opacity-80 transition whitespace-nowrap"
                dir="ltr"
                >@sormeh.cosmetic__</a
              >
            </div>
          </div>
        </div>

        <!-- بخش ۲: برند و معرفی -->
        <div
          class="p-2 sm:p-3 flex flex-col lg:flex-row items-center gap-3 xl:gap-4 w-full lg:w-[420px] xl:w-[480px] shrink-0 order-2 lg:order-1 text-center lg:text-right"
        >
          <div
            class="shrink-0 flex items-center justify-center lg:border-l-2 lg:border-dashed lg:border-[#4B3073] lg:pl-3 xl:pl-4 pb-3 lg:pb-0 w-full lg:w-auto"
          >
            <img
              src="/icons/sormeh.svg"
              alt="سرمه گلشهر"
              class="w-24 sm:w-28 xl:w-32 h-auto object-contain mx-auto"
            />
          </div>

          <div class="flex flex-col flex-1 w-full min-w-0">
            <h3
              class="text-xs xl:text-sm font-bold text-[#4B3073] leading-relaxed mb-1 flex items-center justify-center lg:justify-start gap-1"
            >
              <span>سرمه‌؛ دنیای زیبایی، به وسعت سلیقه شما</span>
              <span>💄</span>
            </h3>
            <p
              class="text-[10px] xl:text-xs text-gray-600 leading-relaxed transition-all duration-300"
              :class="isExpanded ? '' : 'line-clamp-2 lg:line-clamp-none'"
            >
              سرمه، با بیش از دو دهه تجربه، همراه شماست تا دنیای رنگارنگ زیبایی
              رو با هم کشف کنیم! ✨ از محصولات آرایشی و بهداشتی تا عطر و
              ادکلن...
            </p>
            <button
              @click="isExpanded = !isExpanded"
              class="mt-3 text-xs font-bold text-[#4B3073] hover:bg-[#eae3f8] transition py-2 px-4 rounded-xl w-full text-center border border-[#4B3073]/20 cursor-pointer"
            >
              {{ isExpanded ? "بستن" : "مشاهده بیشتر" }}
            </button>
          </div>
        </div>
      </div>

      <!-- بخش محتوای تکمیلی API (با عرض کامل) -->
      <transition name="expand">
        <div
          v-if="isExpanded"
          class="mt-6 pt-6 border-t border-dashed border-[#4B3073]/30 w-full"
        >
          <div
            class="text-gray-700 leading-7 font-medium text-xs sm:text-sm text-justify"
          >
            <p v-if="apiContent" v-html="apiContent"></p>
            <p v-else class="text-gray-400">
              در حال بارگذاری اطلاعات تکمیلی...
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/api/useApi";

const { getBase } = useApi();
const isExpanded = ref(false);

// متن پیش‌فرض برای زمانی که API هنوز داده‌ای نداده یا خالی است
const defaultText =
  "سرمه، با تمرکز بر کیفیت و اصالت کالا، مجموعه‌ای از بهترین برندهای آرایشی و بهداشتی جهانی را گردآوری کرده است. هدف ما ارائه تجربه‌ای فراتر از یک خرید ساده و ایجاد حس اطمینان در انتخاب محصولات مراقبتی است. تمامی محصولات با ضمانت اصالت و سلامت فیزیکی به سراسر کشور ارسال می‌شوند.";

const apiContent = ref(defaultText);

onMounted(async () => {
  try {
    const response = await getBase();
    // طبق تصویر ارسالی شما: data.settings.site
    // فرض بر این است که فیلد توضیحات در API وجود دارد (مثلاً description یا معرفی)
    // اگر نام فیلد در آبجکت site متفاوت است، آن را اینجا اصلاح کنید
    const siteSettings = response?.data?.settings?.site;

    if (siteSettings && siteSettings.description) {
      apiContent.value = siteSettings.description;
    }
  } catch (error) {
    console.error("خطا در دریافت داده‌های فوتر:", error);
    // در صورت خطا، متن پیش‌فرض (defaultText) که در بالا تعریف شده باقی می‌ماند
  }
});
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px; /* مقدار زیاد برای محتواهای طولانی */
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  border-top-width: 0;
}
</style>
