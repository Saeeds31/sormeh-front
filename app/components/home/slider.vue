<!-- app/components/home/hero/slider.vue -->
<template>
  <div
    v-if="slides && slides.length"
    class="hero-slider w-full overflow-hidden rounded-2xl container"
  >
    <div class="hidden md:block">
      <Swiper
        v-if="desktopSlides.length"
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="desktopSlides.length > 1"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :pagination="{
          clickable: true,
        }"
        :watch-overflow="true"
        class="hero-swiper"
        dir="rtl"
      >
        <SwiperSlide
          v-for="(slide, index) in desktopSlides"
          :key="slide.id || index"
          class="w-full"
        >
          <NuxtLink
            :to="slide.link || '/products'"
            class="block w-full"
            :aria-label="slide.title || 'مشاهده محصولات'"
          >
            <img
              :src="resolveImage(slide.image)"
              :alt="slide.title || 'بنر فروشگاه'"
              class="block w-full h-auto object-cover"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- نسخه موبایل -->
    <div class="block md:hidden">
      <Swiper
        v-if="mobileSlides.length"
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="mobileSlides.length > 1"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :pagination="{
          clickable: true,
        }"
        :watch-overflow="true"
        class="hero-swiper"
        dir="rtl"
      >
        <SwiperSlide
          v-for="(slide, index) in mobileSlides"
          :key="slide.id || index"
          class="w-full"
        >
          <NuxtLink
            :to="slide.link || '/products'"
            class="block w-full"
            :aria-label="slide.title || 'مشاهده محصولات'"
          >
            <img
              :src="resolveImage(slide.image)"
              :alt="slide.title || 'بنر فروشگاه'"
              class="block w-full h-[170px] object-cover"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

const { $getImageUrl } = useNuxtApp();

const desktopSlides = computed(() => {
  return (props.slides || []).filter(
    (slide) => slide?.image && slide.type === "desktop",
  );
});

const mobileSlides = computed(() => {
  return (props.slides || []).filter(
    (slide) => slide?.image && slide.type === "mobile",
  );
});

const resolveImage = (path) => {
  if (!path) return "";

  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  if (typeof $getImageUrl === "function") {
    return $getImageUrl(path);
  }

  return path;
};
</script>

<style scoped>
:deep(.hero-swiper),
:deep(.swiper-wrapper),
:deep(.swiper-slide) {
  width: 100%;
}

:deep(.swiper-pagination) {
  bottom: 16px !important;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  margin: 0 4px !important;
  background: #ffffff;
  border-radius: 999px;
  opacity: 0.9;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  width: 20px;
  height: 10px;
  background: #0d44d0;
  opacity: 1;
}

@media (max-width: 640px) {
  :deep(.swiper-pagination) {
    bottom: 10px !important;
  }
}
</style>
