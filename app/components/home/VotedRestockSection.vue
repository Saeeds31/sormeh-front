<!-- app/components/home/VotedRestockSection.vue -->
<template>
  <section
    v-if="products && products.length"
    class="relative max-md:py-12 overflow-hidden max-md:bg-[#f2eff9]"
  >
    <div class="mx-auto container">
      <div class="restock-layout hidden sm:block" dir="rtl">
        <div class="restock-background" aria-hidden="true"></div>

        <button
          type="button"
          class="restock-prev absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white text-[#3F2356] border border-purple-200 flex items-center justify-center hover:bg-purple-50 transition-all shadow-md cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="قبلی"
        >
          <svg
            class="w-5 h-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          type="button"
          class="restock-next absolute right-4 md:right-[260px] lg:right-[300px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white text-[#3F2356] border border-purple-200 flex items-center justify-center hover:bg-purple-50 transition-all shadow-md cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="بعدی"
        >
          <svg
            class="w-5 h-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>

        <div class="restock-products">
          <ClientOnly>
            <HomeSlidersHomeOfferSlider
              :title="title"
              :products="products"
              prev-button-class=".restock-prev"
              next-button-class=".restock-next"
            />
          </ClientOnly>
        </div>

        <img
          class="restock-banner"
          src="/images/YOUR_RESTOCK_BANNER.svg"
          alt="محصولات شارژ مجدد"
          loading="lazy"
        />
      </div>

      <div class="block sm:hidden" dir="rtl">
        <div class="space-y-4">
          <SharedSectionSliderHeader
            :title-parts="[
              { text: 'محصولات', class: 'text-gray-900' },
              { text: ' شارژ مجدد', class: 'font-normal text-strong' },
            ]"
            view-all-link="/products?filter=restocked"
            view-all-text="مشاهده همه"
            :show-arrows="canScrollMobile"
            divider-visible-class="!block"
            divider-class="bg-gray-300"
            title-class="text-sm font-bold text-gray-900"
            title-border-class="border-[#3F2356]"
            button-class="bg-white text-[#3F2356] hover:bg-[#3F2356] hover:text-white"
            @prev="scrollPrevMobile"
            @next="scrollNextMobile"
          />

          <div ref="mobileContainerRef" class="w-full">
            <ClientOnly>
              <MobileDoubleRowSlider :products="products" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import SharedSectionSliderHeader from "@/components/shared/SectionSliderHeader.vue";
import MobileDoubleRowSlider from "@/components/shared/MobileDoubleRowSlider.vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "محصولاتی که به درخواست شما شارژ شد",
  },
  viewAllLink: {
    type: String,
    default: "/products?filter=restocked",
  },
});

const mobileContainerRef = ref(null);

const canScrollMobile = computed(() => (props.products?.length || 0) > 4);
const scrollStepMobile = 280;

const getScrollableElement = () => {
  if (!mobileContainerRef.value) return null;
  return (
    mobileContainerRef.value.querySelector(".overflow-x-auto") ||
    mobileContainerRef.value.firstElementChild ||
    mobileContainerRef.value
  );
};

const scrollNextMobile = () => {
  const el = getScrollableElement();
  if (el) {
    el.scrollBy({ left: -scrollStepMobile, behavior: "smooth" });
  }
};

const scrollPrevMobile = () => {
  const el = getScrollableElement();
  if (el) {
    el.scrollBy({ left: scrollStepMobile, behavior: "smooth" });
  }
};
</script>

<style scoped>
.restock-layout {
  position: relative;
  isolation: isolate;
  padding: 1.5rem 0;
}

.restock-background {
  position: absolute;
  z-index: -1;
  top: 50%;
  right: 0;
  width: 100%;
  height: 70%;
  transform: translateY(-50%);
  border-radius: 28px;
  background: #eae2f3;
}

.restock-products {
  min-width: 0;
  padding: 0 290px 0 64px;
}

.restock-banner {
  position: absolute;
  z-index: 2;
  top: 50%;
  right: -10px;
  width: clamp(240px, 24vw, 320px);
  height: auto;
  transform: translateY(-50%);
  pointer-events: none;
}

@media (max-width: 1024px) {
  .restock-products {
    padding-right: 230px;
    padding-left: 48px;
  }
  .restock-banner {
    width: 220px;
  }
}
</style>
