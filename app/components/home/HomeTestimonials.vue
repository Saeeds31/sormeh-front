<!-- app/components/home/HomeTestimonials.vue -->
<script setup>
import { ref } from "vue";

const sliderContainer = ref(null);

const scrollLeft = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -350, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 350, behavior: "smooth" });
  }
};

const testimonials = ref([
  {
    id: 1,
    name: "نیلوفر رادمنش",
    role: "مشتری",
    rating: "۴/۵",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    comment:
      "بزرگ‌ترین دغدغه من برای خرید آنلاین محصولات پوستی لوکس، ترس از فیک بودنشون بود. سرم استه لودر رو از سرمه سفارش دادم؛ بچ‌کد اصالتش رو استعلام گرفتم کاملاً معتبر بود و بافت محصول دقیقاً همون کیفیت اصل شرکتی رو داشت. بسته‌بندی محکم و ارسالشون هم واقعاً بی‌نقص بود. از اینکه سلامت پوست مشتری براتون اولویته ممنونم.",
  },
  {
    id: 2,
    name: "فرهاد صادقی",
    role: "مشتری",
    rating: "۴/۵",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    comment:
      "من قبلاً حضوری از شعبه گلشهر گرگان خرید می‌کردم و این‌بار به دلیل مشغله کاری از سایت سفارش دادم. عطر بلو شنل دقیقاً همون نسخه اصلی با ماندگاری و خط بوی فوق‌العاده بود. تطابق صددرصدی خرید آنلاین با خرید حضوری داخل فروشگاهتون نشان‌دهنده تعهد و اعتبار بالای سرمه است. قطعاً پیشنهادش می‌کنم.",
  },
  {
    id: 3,
    name: "مهسا کریمی",
    role: "مشتری",
    rating: "۴/۵",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    comment:
      "موهای من به خاطر دکلره شدیداً آسیب دیده بود و پیدا کردن اولاپلکس و کراستاس اورجینال توی این بازار کار خیلی سختی شده. محصولات سرمه هم اصل بودن و هم تاریخ انقضای کاملاً تازه داشتن. بعد از حدود یک ماه مصرف، تغییر و شادابی موهام کاملاً مشهوده. خیالم برای همیشه بابت یک مرجع مطمئن راحت شد.",
  },
  {
    id: 4,
    name: "سارا احمدی",
    role: "مشتری",
    rating: "۵/۵",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    comment:
      "پشتیبانی عالی و ارسال بسیار سریع. محصولات کاملاً اورجینال هستند و با خیال راحت می‌توانید خرید کنید.",
  },
]);
</script>

<template>
  <section class="bg-[#f2eff9] md:bg-transparent py-6 md:pt-32">
    <div class="w-full container mx-auto">
      <div class="mb-8">
        <SharedSectionSliderHeader
          :title-parts="[
            { text: 'نظرات ', class: 'text-gray-900' },
            { text: ' و پیشنهادات', class: 'font-normal text-strong' },
          ]"
          :show-arrows="true"
          divider-visible-class="!block"
          @prev="scrollRight"
          @next="scrollLeft"
        />
      </div>

      <div
        ref="sliderContainer"
        class="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="min-w-[300px] sm:min-w-[360px] lg:min-w-[380px] max-w-[400px] flex-1 bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 lg:p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative snap-start"
        >
          <div class="flex justify-end w-full mb-4">
            <span
              class="text-[#43235F] text-5xl font-serif leading-none select-none"
            >
              “
            </span>
          </div>

          <!-- متن نظر -->
          <p
            class="text-xs lg:text-[13px] text-gray-700 leading-7 text-justify font-normal flex-1 mb-6"
          >
            {{ item.comment }}
          </p>

          <div class="border-t border-dashed border-gray-200 mb-5"></div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-full overflow-hidden bg-gray-100 ring-2 ring-purple-100 shrink-0"
              >
                <SharedAppImage
                  :src="item.avatar"
                  :alt="item.name"
                  img-class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span class="text-sm font-bold text-gray-900">
                {{ item.name }}
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span>{{ item.role }}</span>
              <span class="text-gray-300">|</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 fill-amber-400 text-amber-400"
                viewBox="0 0 24 24"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
              <span class="font-medium text-gray-600">({{ item.rating }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
