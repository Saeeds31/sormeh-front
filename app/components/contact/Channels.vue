<!-- app/components/contact/Channels.vue -->
<template>
  <section class="flex w-full flex-col py-4" dir="rtl">
    <!-- سربرگ -->
    <div class="relative mb-8 flex items-center justify-between">
      <!-- عنوان در سمت راست -->
      <div class="relative z-10 bg-white pr-4">
        <h2
          class="flex items-center gap-2 text-lg md:text-base font-bold text-strong pl-2 lg:text-xl"
        >
          <span class="inline-block h-6 w-[2px] rounded-full bg-[#4a2e56]" />
          راه های ارتباطی
        </h2>
      </div>
      <!-- خط افقی -->
      <div
        class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200"
      />

      <!-- آیکون ستاره در سمت چپ -->
      <div class="relative z-10 bg-white pr-6 text-[#4a2e56]">
        <Frame />
      </div>
    </div>

    <!-- کارت‌ها؛ ترتیب از راست به چپ: آدرس، بله، واتس‌اپ، اینستاگرام، شماره تماس -->
    <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
      <!-- ۵. شماره تماس (چپ‌ترین کارت) -->
      <div
        class="flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4"
      >
        <div class="flex w-full flex-col items-start">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#4a2e56] shadow-sm"
          >
            <Phone :size="20" :stroke-width="1.75" />
          </div>

          <div class="mt-6 w-full text-right">
            <span class="block text-sm md:text-base font-bold text-strong"
              >شماره تماس</span
            >
            <span class="mt-1 block text-xs text-gray-400">
              شنبه تا پنجشنبه 10:00 صبح الی 21:00
            </span>
          </div>
        </div>

        <div
          class="flex flex-col items-start gap-1 border-t border-dashed border-gray-200 h-12 pt-3 text-xs md:text-sm font-bold text-[#4a2e56]"
        >
          <a
            :href="`tel:${info.rawMobile}`"
            class="flex items-center gap-1.5 transition hover:opacity-80"
            dir="ltr"
          >
            <span>{{ info.mobile }}</span>
            <Smartphone :size="14" :stroke-width="2" />
          </a>

          <a
            v-if="info.rawPhone"
            :href="`tel:${info.rawPhone}`"
            class="flex items-center gap-1.5 transition hover:opacity-80"
            dir="ltr"
          >
            <span>{{ info.phone }}</span>
            <Phone :size="14" :stroke-width="2" />
          </a>
        </div>
      </div>

      <!-- ۴. اینستاگرام -->
      <a
        :href="info.instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#4a2e56]/40"
      >
        <div class="flex w-full flex-col items-start">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#4a2e56] shadow-sm"
          >
            <Instagram :size="20" :stroke-width="1.75" />
          </div>

          <div class="mt-6 w-full text-right">
            <span class="block text-sm md:text-base font-bold text-strong"
              >اینستاگرام</span
            >
            <span class="mt-1 block text-xs text-gray-400">
              ای دی پیج اینستاگرام سرمه آنلاین (گلشهر)
            </span>
          </div>
        </div>

        <div
          class="border-t border-dashed border-gray-200 h-12 pt-3 text-center"
        >
          <span
            class="block text-xs md:text-sm font-bold text-[#4a2e56]"
            dir="ltr"
          >
            {{ info.instagramId }}
          </span>
        </div>
      </a>

      <!-- ۳. واتس‌اپ -->
      <a
        :href="info.whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#4a2e56]/40"
      >
        <div class="flex w-full flex-col items-start">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#4a2e56] shadow-sm"
          >
            <MessageCircle :size="20" :stroke-width="1.75" />
          </div>

          <div class="mt-6 w-full text-right">
            <span class="block text-sm md:text-base font-bold text-strong"
              >واتس آپ</span
            >
            <span class="mt-1 block text-xs text-gray-400">
              ای دی واتس آپ سرمه آنلاین (گلشهر)
            </span>
          </div>
        </div>

        <div
          class="border-t border-dashed border-gray-200 h-12 pt-3 text-center"
        >
          <span
            class="block text-xs md:text-sm font-bold text-[#4a2e56]"
            dir="ltr"
          >
            {{ info.whatsappId }}
          </span>
        </div>
      </a>
      <!-- ۲. پیام‌رسان بله -->
      <a
        :href="info.baleUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#4a2e56]/40"
      >
        <div class="flex w-full flex-col items-start">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#4a2e56] shadow-sm"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.8-4.8 1.4 1.4z"
              />
            </svg>
          </div>

          <div class="mt-6 w-full text-right">
            <span class="block text-sm md:text-base font-bold text-strong"
              >بله</span
            >
            <span class="mt-1 block text-xs text-gray-400">
              ای دی پلتفرم ایرانی بله سرمه آنلاین (گلشهر)
            </span>
          </div>
        </div>

        <div
          class="border-t border-dashed border-gray-200 h-12 pt-3 text-center"
        >
          <span
            class="block text-xs md:text-sm font-bold text-[#4a2e56]"
            dir="ltr"
          >
            {{ info.baleId }}
          </span>
        </div>
      </a>
      <!-- ۱. آدرس (راست‌ترین کارت) -->
      <div
        class="flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4"
      >
        <div class="flex w-full flex-col items-start">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#4a2e56] shadow-sm"
          >
            <MapPin :size="20" :stroke-width="1.75" />
          </div>

          <div class="mt-6 w-full text-right">
            <span class="block text-sm md:text-base font-bold text-strong"
              >آدرس</span
            >
            <span class="mt-1 block text-xs text-gray-400">
              آدرس فروشگاه حضوری سرمه آنلاین (شعبه اصلی)
            </span>
          </div>
        </div>

        <div
          class="border-t border-dashed border-gray-200 h-12 pt-3 text-right"
        >
          <p class="text-xs font-bold leading-6 text-[#4a2e56]">
            {{ info.address }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import {
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
} from "lucide-vue-next";
import Frame from "../icon/Frame.vue";

const props = defineProps({
  contactInfo: {
    type: Object,
    default: () => ({}),
  },
});

const toEnglishDigits = (value) =>
  String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

const digitsOnly = (value) => toEnglishDigits(value).replace(/\D/g, "");

const cleanHandle = (value) =>
  String(value ?? "")
    .trim()
    .replace(/^@/, "");

const info = computed(() => {
  const contact = props.contactInfo || {};

  const mobile = contact.mobile || "۰۹۱۱-۷۳۵-۱۵۴۴";
  const phone = contact.phone || "۰۱۷۳-۲۵۲-۵۰۳۱";

  const rawMobile = digitsOnly(contact.rawMobile || mobile);
  const rawPhone = digitsOnly(contact.rawPhone || phone);

  const instagramId = contact.instagramId || "@sormeh.cosmetic__";
  const baleId = contact.baleId || "@sormeh.cosmetic__";

  const mobileForWhatsApp = digitsOnly(
    contact.whatsappPhone || contact.rawMobile || mobile,
  );
  const internationalWhatsAppPhone = mobileForWhatsApp.startsWith("0")
    ? `98${mobileForWhatsApp.slice(1)}`
    : mobileForWhatsApp;

  const whatsappId = contact.whatsappId || mobile;

  return {
    address:
      contact.address ||
      "گلستان-گرگان-نبش گلشهر2-فروشگاه لوازم آرایشی بهداشتی سرمه",

    mobile,
    phone,
    rawMobile,
    rawPhone,

    baleId,
    baleUrl: contact.baleUrl || `https://ble.ir/${cleanHandle(baleId)}`,

    whatsappId,
    whatsappUrl:
      contact.whatsappUrl ||
      (internationalWhatsAppPhone
        ? `https://wa.me/${internationalWhatsAppPhone}`
        : "https://www.whatsapp.com/"),

    instagramId,
    instagramUrl:
      contact.instagramUrl ||
      `https://www.instagram.com/${cleanHandle(instagramId)}/`,
  };
});
</script>
