<!-- app/components/home/HomeInstagramBanner.vue -->
<script setup>
defineProps({
  title: {
    type: String,
    default: "دنیای زیبایی در اینستاگرام سرمه",
  },
  subtitle: {
    type: String,
    default: "جدیدترین ترندها، آموزش‌ها و تخفیف‌های ویژه را اینجا دنبال کنید.",
  },
  buttonText: {
    type: String,
    default: "پیج اینستاگرام ما",
  },
  instagramLink: {
    type: String,
    default: "https://www.instagram.com/sormeh_beauty/",
  },
  bannerImage: {
    type: String,
    default: "/banner/banner-instagram.webp",
  },
});
</script>

<template>
  <section class="w-full container">
    <div class="block md:hidden w-full relative overflow-hidden rounded-xl">
      <img
        src="/images/instaMobail.png"
        alt="اینستاگرام سرمه"
        class="w-full h-auto block select-none pointer-events-none"
        loading="lazy"
      />

      <div
        class="absolute inset-0 z-10 flex flex-col justify-between p-3.5 sm:p-4"
      >
        <div
          class="flex flex-col flex-1 justify-center text-white space-y-2 pt-4"
        >
          <h3
            class="text-sm sm:text-base font-bold tracking-tight line-clamp-1 drop-shadow-sm"
          >
            {{ title }}
          </h3>
          <p
            class="text-xs sm:text-sm text-white font-light opacity-95 line-clamp-1 drop-shadow-sm"
          >
            {{ subtitle }}
          </p>
        </div>

        <div class="flex justify-end p-2">
          <NuxtLink
            :to="instagramLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 bg-white text-gray-800 hover:text-[#3F2356] font-medium text-xs px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all duration-200 group"
          >
            <span>{{ buttonText }}</span>
            <span
              class="w-4 h-4 rounded-sm bg-purple-100 flex items-center justify-center text-gray-500 group-hover:bg-[#EAE2F3] group-hover:text-[#3F2356] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-2.5 h-2.5 stroke-current fill-none transform rotate-180"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="hidden md:block w-full">
      <div
        class="relative w-full overflow-hidden min-h-[130px] md:min-h-[1320px] xl:min-h[140px] lg:min-h-[153px] flex items-center"
      >
        <SharedAppImage
          :src="bannerImage"
          alt="Instagram Banner"
          class="absolute inset-0 w-full h-full object-contain object-center pointer-events-none select-none"
          loading="lazy"
        />

        <div
          class="relative z-10 w-full h-full flex items-center justify-around lg:pr-16"
        >
          <div class="order-2 shrink-0">
            <NuxtLink
              :to="instagramLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center mt-6 gap-2 bg-white text-gray-800 hover:text-[#3F2356] font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 group"
            >
              <span>{{ buttonText }}</span>
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
          </div>

          <div class="order-1 text-right text-white flex-1 pr-40 lg:pr-60">
            <h3 class="text-lg lg:text-xl font-bold tracking-tight my-2">
              {{ title }}
            </h3>
            <p
              class="text-sm text-purple-100 font-light opacity-95 line-clamp-1"
            >
              {{ subtitle }}
            </p>
          </div>

          <div class="w-12 lg:w-16 order-3 shrink-0" />
        </div>
      </div>
    </div>
  </section>
</template>
