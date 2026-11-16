<!-- app/components/home/sliders/HomeOfferSlider.client.vue -->
<template>
  <div class="relative w-full h-full newProductHome">
    <Swiper
      dir="rtl"
      :modules="[Navigation, Pagination]"
      :slides-per-view="1.2"
      :space-between="12"
      :breakpoints="{
        480: { slidesPerView: 1.3, spaceBetween: 14 },
        640: { slidesPerView: 1.8, spaceBetween: 18 },
        768: { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 2.9, spaceBetween: 24 },
        1280: { slidesPerView: 3.8, spaceBetween: 24 },
      }"
      :navigation="{
        nextEl: nextButtonClass,
        prevEl: prevButtonClass,
      }"
      class="hero-swiper py-2"
    >
      <SwiperSlide v-for="item in products" :key="item.id">
        <SharedProductCard
          :product="item"
          :trending-ids="trendingIds"
          :new-ids="newIds"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  prevButtonClass: {
    type: String,
    default: ".offer-prev",
  },
  nextButtonClass: {
    type: String,
    default: ".offer-next",
  },
  trendingIds: {
    type: Array,
    default: () => [],
  },
  newIds: {
    type: Array,
    default: () => [],
  },
});
</script>
