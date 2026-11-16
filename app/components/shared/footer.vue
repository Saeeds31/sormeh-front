<!-- app/components/shared/footer.vue -->
<template>
  <div>
    <!-- نوار ارتباطی بالای فوتر -->
    <SharedFooterTop />

    <footer
      class="bg-[#D5CBEB] text-strong pt-10 pb-24 md:pb-8 container font-sans rounded-t-lg"
    >
      <!-- بخش ستون‌های اصلی -->
      <div
        class="px-4 sm:px-8 lg:px-12 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12"
      >
        <!-- بخش ۱: محبوب‌ترین دسته‌بندی‌ها -->
        <div
          class="space-y-4 pb-6 border-b border-[#4B3073]/40 lg:border-b-0 lg:pb-0"
        >
          <h4
            class="text-base font-bold flex items-center gap-2 border-r-2 border-[#34244a] pr-2"
          >
            محبوب ترین دسته بندی ها
          </h4>
          <ul
            class="space-y-2.5 text-xs md:text-sm font-medium pr-4 list-disc marker:text-[#34244a]"
          >
            <li v-for="cat in topCategories" :key="cat.label">
              <NuxtLink
                :to="cat.href"
                class="hover:opacity-75 transition-opacity"
              >
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- بخش ۲: برندهای مطرح -->
        <div
          class="space-y-4 pb-6 border-b border-[#4B3073]/40 lg:border-b-0 lg:pb-0"
        >
          <h4
            class="text-base font-bold flex items-center gap-2 border-r-2 border-[#34244a] pr-2"
          >
            برندهای مطرح
          </h4>
          <ul
            class="space-y-2.5 text-xs md:text-sm font-medium pr-4 list-disc marker:text-[#34244a]"
          >
            <li v-for="brand in featuredBrands" :key="brand.name">
              <NuxtLink
                :to="brand.href"
                class="hover:opacity-75 transition-opacity"
              >
                {{ brand.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- بخش ۳: دسترسی‌های سریع -->
        <div
          class="space-y-4 pb-6 border-b border-[#4B3073]/40 lg:border-b-0 lg:pb-0"
        >
          <h4
            class="text-base font-bold flex items-center gap-2 border-r-2 border-[#34244a] pr-2"
          >
            دسترسی های سریع
          </h4>
          <ul
            class="space-y-2.5 text-xs md:text-sm font-medium pr-4 list-disc marker:text-[#34244a]"
          >
            <li v-for="item in quickLinks" :key="item.label">
              <NuxtLink
                :to="item.href"
                class="hover:opacity-75 transition-opacity"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- بخش ۴: نمادهای اعتماد و نقشه -->
        <div class="space-y-4 pb-2 lg:pb-0">
          <h4
            class="text-base font-bold flex items-center gap-2 border-r-2 border-[#34244a] pr-2"
          >
            نمادهای اعتماد
          </h4>
          <div class="space-y-4 pr-2">
            <div class="flex items-center md:items-end gap-4">
              <a href="https://samandehi.ir" target="_blank" rel="noopener">
                <img
                  src="/images/samandehi.svg"
                  alt="ساماندهی"
                  class="h-24 md:h-28 w-auto object-contain"
                />
                <span class="text-[9px] text-gray-700 mt-1 block text-center">
                  samandehi.ir
                </span>
              </a>
              <a
                href="https://trustseal.enamad.ir"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="/images/enamad.svg"
                  alt="اینماد"
                  class="h-24 md:h-24 w-auto object-contain"
                />
                <span class="text-[9px] text-gray-700 mt-1 block text-center">
                  eNAMAD.ir
                </span>
              </a>
            </div>

            <NuxtLink
              to="/contact"
              class="block overflow-hidden rounded-2xl shadow-sm transition"
            >
              <div class="relative h-28 flex items-center justify-center">
                <img
                  src="/images/map-preview.svg"
                  alt="مسیریابی فروشگاه حضوری"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- شبکه‌های اجتماعی -->
      <div
        class="flex items-center justify-center lg:justify-start gap-3.5 text-[#34244a] px-4 sm:px-8 lg:px-12 mt-8"
      >
        <a
          v-for="social in socialList"
          :key="social.name"
          :href="social.link"
          target="_blank"
          rel="noopener"
          class="w-8 h-8 rounded-full flex items-center justify-center p-1.5"
          :title="social.name"
        >
          <img
            :src="social.icon"
            :alt="social.name"
            class="w-full h-full object-contain"
          />
        </a>
      </div>

      <!-- دکمه بازگشت به بالا فقط در دسکتاپ -->
      <div
        class="hidden lg:flex relative mb-8 mt-6 px-12 mx-auto items-center justify-center"
      >
        <div class="w-full border-t border-dashed border-[#b8accf]"></div>

        <button
          type="button"
          @click="scrollToTop"
          class="absolute bg-white text-[#34244a] px-6 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:bg-gray-50 flex items-center gap-2 transition"
        >
          <span
            class="bg-[#dcd5ea] p-1 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </span>
          <span>بازگشت به بالا</span>
        </button>
      </div>

      <!-- خط جداکننده قبل از کپی‌رایت در موبایل -->
      <div class="block lg:hidden my-5 px-4 sm:px-8">
        <div class="w-full border-t border-[#bfaecf]/40"></div>
      </div>

      <!-- کپی‌رایت -->
      <div class="mx-auto px-4 sm:px-8 lg:px-12">
        <div
          class="flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-gray-700 font-normal gap-2 text-center md:text-right"
        >
          <p class="">
            طراحی و توسعه توسط تیم
            <a
              href="https://padhosha.ir"
              target="_blank"
              rel="noopener"
              class="font-bold hover:underline"
            >
              پدهوشا
            </a>
          </p>
          <p
            class="w-full text-center lg:w-auto lg:text-left text-[#4B3073]/90 text-xs md:text-xs"
          >
            {{ copyrightText }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSettingStore } from "~/store/settings.js";
import { storeToRefs } from "pinia";

const settingStore = useSettingStore();
const { settings, menus } = storeToRefs(settingStore);

const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// دریافت نام سایت و متن کپی‌رایت از استور با fallback
const siteName = computed(
  () => settings.value?.site?.site_name || "گروه سرمه(گلشهر)",
);

const copyrightText = computed(() => {
  return (
    settings.value?.site?.site_footer_note ||
    `کلیه حقوق متعلق به ${siteName.value} می‌باشد.`
  );
});

// لینک‌های سریع: در صورت وجود منو در استور از آن استفاده می‌شود
const fallbackQuickLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "فروشگاه", href: "/shop" },
  { label: "وبلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about-us" },
  { label: "تماس باما", href: "/contact" },
  { label: "قوانین و مقررات", href: "/rules-and-regulations" },
];

const quickLinks = computed(() => {
  if (menus.value && menus.value.length > 0) {
    return menus.value.map((m) => ({
      label: m.title,
      href: m.link || "/",
    }));
  }
  return fallbackQuickLinks;
});

// برندهای مطرح
const featuredBrands = [
  { name: "مک (M·A·C)", href: "/brand/mac" },
  { name: "نارس (NARS)", href: "/brand/nars" },
  { name: "دیور بیوتی (Dior Beauty)", href: "/brand/dior" },
  { name: "شنل (Chanel)", href: "/brand/chanel" },
  { name: "تام فورد (Tom Ford)", href: "/brand/tom-ford" },
  { name: "ریو (Rio)", href: "/brand/rio" },
  { name: "ان اف (NF)", href: "/brand/nf" },
  { name: "نام (NAM)", href: "/brand/nam" },
];

// محبوب‌ترین دسته‌بندی‌ها
const topCategories = [
  { label: "لوازم آرایشی بهداشتی", href: "/category/cosmetics" },
  { label: "مراقبت پوست", href: "/category/skincare" },
  { label: "مراقبت مو", href: "/category/haircare" },
  { label: "عطر و ادکلن", href: "/category/perfume" },
  { label: "لوازم برقی", href: "/category/appliances" },
  { label: "مراقبت و زیبایی مو", href: "/category/hair-beauty" },
  { label: "مراقبت کودک", href: "/category/baby-care" },
  { label: "برندها", href: "/brands" },
  { label: "باشگاه مشتریان", href: "/club" },
];

// آیکون‌ها و لینک‌های شبکه‌های اجتماعی
const socialList = computed(() => {
  const dynamicSocials = settings.value?.social || {};

  return [
    {
      name: "Instagram",
      link:
        dynamicSocials.instagram || "https://instagram.com/sormeh.cosmetic_",
      icon: "/icons/Instagram1.svg",
    },
    {
      name: "Telegram",
      link: dynamicSocials.telegram || "https://t.me",
      icon: "/icons/Rubika.svg",
    },
    {
      name: "Social",
      link: dynamicSocials.whatsapp || "https://Social",
      icon: "/icons/Social.svg",
    },
    {
      name: "Rubika / Eitaa",
      link: dynamicSocials.rubika || "#",
      icon: "/icons/Global.svg",
    },
    {
      name: "Aparat",
      link: dynamicSocials.aparat || "#",
      icon: "/icons/Vector.svg",
    },
  ];
});
</script>
