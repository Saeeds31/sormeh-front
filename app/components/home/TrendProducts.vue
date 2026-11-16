<!-- app/components/home/TrendProducts.vue -->
<script setup>
import { ref, computed } from "vue";
import SharedSectionSliderHeader from "@/components/shared/SectionSliderHeader.vue";
import MobileDoubleRowSlider from "@/components/shared/MobileDoubleRowSlider.vue";

const props = defineProps({
  trends: {
    type: Array,
    default: () => [],
  },
});

const sliderContainer = ref(null);
const mobileContainerRef = ref(null);

const scrollStep = 350;
const canScroll = computed(() => (props.trends?.length || 0) > 3);

const scrollNext = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -scrollStep, behavior: "smooth" });
  }
};

const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: scrollStep, behavior: "smooth" });
  }
};

const canScrollMobile = computed(() => (props.trends?.length || 0) > 4);
const scrollStepMobile = 280;

const getScrollableMobileElement = () => {
  if (!mobileContainerRef.value) return null;

  return (
    mobileContainerRef.value.querySelector(".overflow-x-auto") ||
    mobileContainerRef.value.firstElementChild ||
    mobileContainerRef.value
  );
};

const scrollNextMobile = () => {
  const element = getScrollableMobileElement();

  if (element) {
    element.scrollBy({ left: -scrollStepMobile, behavior: "smooth" });
  }
};

const scrollPrevMobile = () => {
  const element = getScrollableMobileElement();

  if (element) {
    element.scrollBy({ left: scrollStepMobile, behavior: "smooth" });
  }
};
</script>

<template>
  <section class="max-md:bg-[#F2EFF9] max-md:pb-6">
    <div class="w-full container mx-auto">
      <div class="my-8 hidden sm:block">
        <SharedSectionSliderHeader
          :title-parts="[
            { text: 'محصولات', class: 'text-gray-900' },
            { text: ' ترند', class: 'font-normal text-strong' },
          ]"
          view-all-link="/products?filter=trends"
          view-all-text="مشاهده همه"
          :show-arrows="canScroll"
          @prev="scrollPrev"
          @next="scrollNext"
        />
      </div>

      <div class="my-8 sm:hidden">
        <SharedSectionSliderHeader
          :title-parts="[
            { text: 'محصولات', class: 'text-gray-900' },
            { text: ' ترند', class: 'font-normal text-strong' },
          ]"
          view-all-link="/products?filter=trends"
          view-all-text="مشاهده همه"
          :show-arrows="canScrollMobile"
          divider-visible-class="!block"
          @prev="scrollPrevMobile"
          @next="scrollNextMobile"
        />
      </div>

      <div
        ref="sliderContainer"
        class="hidden sm:flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div
          v-for="(product, idx) in trends"
          :key="product.id || idx"
          class="min-w-[240px] sm:min-w-[260px] lg:min-w-0 lg:max-w-none lg:basis-[calc((100%_-_4rem)_/_4.25)] shrink-0 snap-start"
        >
          <SharedProductCard :product="product" />
        </div>
      </div>

      <!-- اسلایدر موبایل، مشابه VotedRestockSection -->
      <div ref="mobileContainerRef" class="w-full sm:hidden">
        <ClientOnly>
          <MobileDoubleRowSlider :products="trends" />
        </ClientOnly>
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
