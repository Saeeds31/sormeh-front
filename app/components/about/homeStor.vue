<!-- app/components/sections/home/AboutStoreSection.vue -->
<template>
  <section
    class="w-full mb-12 lg:my-0 px-4 md:px-12 lg:px-20 overflow-visible"
    dir="rtl"
  >
    <div
      class="relative w-full min-h-[160px] md:min-h-[208px] rounded-[2rem] bg-[#855cb8] flex flex-col lg:flex-row items-center justify-between mt-32 lg:mt-16 px-4 md:px-8 py-6 lg:py-0 max-md:pt-16"
    >
      <div
        class="absolute right-0 top-0 bottom-0 w-32 md:w-48 opacity-25 pointer-events-none rounded-r-[2rem] overflow-hidden"
        style="
          background-image: radial-gradient(#ffffff 2px, transparent 2px);
          background-size: 14px 14px;
        "
      ></div>

      <div
        class="absolute max-md:-top-32 -top-52 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-8 lg:top-[-4rem] w-full max-w-[380px] lg:w-[425px] xl:w-[460px] flex justify-center items-end z-30 pointer-events-none"
      >
        <SharedAppImage
          src="/images/about-products.svg"
          alt="محصولات فروشگاه"
          img-class="w-auto h-[240px] sm:h-[280px] lg:h-[310px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] pointer-events-auto"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        class="relative lg:absolute lg:-top-16 lg:right-8 xl:right-12 w-full lg:w-[62%] xl:w-[58%] bg-[#E8DEFD] rounded-3xl p-5 md:p-6 pt-16 lg:pt-6 shadow-md text-right z-20 border border-purple-200/60"
      >
        <div
          class="absolute top-4 left-4 lg:hidden flex items-center max-md:top-10"
        >
          <SharedAppImage
            src="/icons/sorme.svg"
            alt="لوگو"
            img-class="w-10 h-auto"
          />
        </div>

        <div class="flex items-center gap-2 mb-2.5">
          <h2 class="text-base md:text-lg font-extrabold text-[#552278]">
            {{ aboutData.title }}
          </h2>
          <span
            v-if="aboutData.badge"
            class="text-xs font-normal text-gray-700/80"
          >
            {{ aboutData.badge }}
          </span>
        </div>

        <p
          class="text-xs md:text-base font-normal leading-6 md:leading-7 text-gray-700 mb-4 text-justify"
        >
          {{ aboutData.description }}
        </p>
        <NuxtLink
          v-if="aboutData.ctaLink"
          :to="aboutData.ctaLink"
          class="inline-flex items-center gap-2 bg-white text-gray-800 hover:text-purple-900 font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 group mb-6"
        >
          {{ aboutData.ctaText }}
          <span
            class="w-5 h-5 rounded-sm bg-purple-100 flex items-center justify-center text-gray-500 group-hover:bg-[#EAE2F3] group-hover:text-[#3F2356] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 stroke-current fill-none transform rotate-180"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </NuxtLink>

        <div
          class="relative flex flex-col sm:flex-row items-center justify-between gap-4 pt-1"
        >
          <div
            class="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:flex-1 -mb-16 lg:-mb-24 z-30"
          >
            <div
              class="bg-white rounded-2xl py-3 px-1 sm:px-2 text-center shadow-lg flex flex-col items-center justify-center border border-gray-100"
            >
              <span
                class="text-sm sm:text-lg md:text-xl font-bold text-gray-800"
              >
                ۱۴
              </span>
              <div
                class="w-8 sm:w-14 border-t border-dotted border-gray-300 my-1"
              ></div>
              <span
                class="text-[9px] sm:text-xs font-bold text-gray-600 whitespace-nowrap"
              >
                سال تجربه کاری
              </span>
            </div>

            <div
              class="bg-white rounded-2xl py-3 px-1 sm:px-2 text-center shadow-lg flex flex-col items-center justify-center border border-gray-100"
            >
              <span
                class="text-sm sm:text-lg md:text-xl font-bold text-gray-800"
                dir="ltr"
              >
                +۳۴۲K
              </span>
              <div
                class="w-8 sm:w-14 border-t border-dotted border-gray-300 my-1"
              ></div>
              <span
                class="text-[9px] sm:text-xs font-bold text-gray-600 whitespace-nowrap"
              >
                رضایت مشتری
              </span>
            </div>

            <div
              class="bg-white rounded-2xl py-3 px-1 sm:px-2 text-center shadow-lg flex flex-col items-center justify-center border border-gray-100"
            >
              <span
                class="text-sm sm:text-lg md:text-xl font-bold text-gray-800"
                dir="ltr"
              >
                +۵۶۰۰
              </span>
              <div
                class="w-8 sm:w-14 border-t border-dotted border-gray-300 my-1"
              ></div>
              <span
                class="text-[9px] sm:text-xs font-bold text-gray-600 whitespace-nowrap"
              >
                محصول ارسال شد
              </span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-3 shrink-0 mb-4">
            <SharedAppImage
              src="/icons/sorme.svg"
              alt="لوگو"
              img-class="w-12 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const aboutData = {
  title: "درباره ی سرمه",
  badge: "(شعبه گلشهر)",
  description: `فروشگاه آنلاین سرمه مرجع تخصصی عرضه انواع لوازم آرایشی، محصولات بهداشتی، مراقبت حرفه‌ای از پوست و مو و انواع ادکلن‌های مطرح دنیا است. اولویت اصلی سرمه، حفظ سلامت و اعتماد مشتریان از طریق تضمین ۱۰۰٪ اصالت کالاهاست؛ بنابراین تمام محصولات با ضمانت اورجینال بودن ارائه می‌شوند. شایان ذکر است که تنها شعبه اصلی و حضوری فروشگاه سرمه در گرگان، بلوار گلشهر واقع شده و خدمات آنلاین خود را با بالاترین کیفیت به سراسر کشور ارسال می‌کند.`,
  ctaText: "اطلاعات بیشتر",
  ctaLink: "/about-us",
};
</script>
