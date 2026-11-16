<template>
  <section class="max-md:bg-[#f2eff9]">
    <div class="container mx-auto max-md:py-10">
      <!-- هدر بخش با کامپوننت مشترک استاندارد و لینک مشاهده همه -->
      <SharedSectionSliderHeader
        class="mb-4 md:mb-8"
        :show-arrows="true"
        arrows-wrapper-class="hidden max-md:flex"
        :title-parts="[
          { text: 'جدیدترین اخبار', class: 'text-gray-900' },
          { text: 'سرمه', class: 'font-normal text-strong' },
        ]"
        view-all-link="/blogs"
        view-all-text="مشاهده همه"
        divider-visible-class="!block"
        divider-class="bg-gray-200"
        title-class="text-sm md:text-2xl font-bold text-gray-900"
        title-border-class="border-[#3F2356]"
        button-class="bg-[#EAE2F3] text-[#3F2356] hover:bg-[#3F2356] hover:text-white"
        @prev="onSwiperPrev"
        @next="onSwiperNext"
      />

      <!-- دسکتاپ: دو کارت بزرگ و ستون اسلایدر عمودی کارت‌های کوچک -->
      <div
        v-if="list.length"
        class="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
      >
        <BigCard
          v-for="(item, index) in list.slice(0, 2)"
          :key="item.id || index"
          :card="item"
        />

        <div class="h-[520px]">
          <Swiper
            direction="vertical"
            slides-per-view="auto"
            :space-between="12"
            :mousewheel="true"
            :free-mode="true"
            class="h-full"
          >
            <SwiperSlide
              v-for="(item, index) in sideArticles"
              :key="item.id || index"
              class="!h-auto"
            >
              <SmallCard :smallcard="item" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <!-- موبایل: اسلایدر افقی متصل به دکمه‌های هدر -->
      <div v-if="list.length" class="lg:hidden w-full" dir="rtl">
        <Swiper
          :slides-per-view="1.25"
          :space-between="16"
          :centered-slides="false"
          class="w-full overflow-visible"
          @swiper="onSwiperInit"
        >
          <SwiperSlide
            v-for="(item, index) in list"
            :key="item.id || index"
            class="!h-auto py-2"
          >
            <BigCard :card="item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import BigCard from "./BigCard.vue";
import SmallCard from "./SmallCard.vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const mobileSwiperInstance = ref(null);

const onSwiperInit = (swiper) => {
  mobileSwiperInstance.value = swiper;
};

// در چیدمان RTL، دکمه قبلی به اسلاید بعدی می‌رود.
const onSwiperPrev = () => {
  if (mobileSwiperInstance.value && !mobileSwiperInstance.value.destroyed) {
    mobileSwiperInstance.value.slideNext();
  }
};

// در چیدمان RTL، دکمه بعدی به اسلاید قبلی می‌رود.
const onSwiperNext = () => {
  if (mobileSwiperInstance.value && !mobileSwiperInstance.value.destroyed) {
    mobileSwiperInstance.value.slidePrev();
  }
};

// اگر بیش از دو مقاله باشد، مقاله‌های بعدی در ستون سوم دسکتاپ قرار می‌گیرند.
const sideArticles = computed(() => {
  return props.list.length > 2 ? props.list.slice(2) : props.list;
});
</script>

<style scoped>
.swiper-slide {
  height: auto !important;
}
</style>
