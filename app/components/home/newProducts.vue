<!-- app/components/home/newProducts.vue -->
<template>
  <section class="bg-[#f2eff9] md:bg-transparent py-10 pb-5">
    <div class="container mx-auto">
      <div class="flex items-center justify-between gap-3 lg:gap-5 mb-6">
        <div class="flex items-center shrink-0">
          <h2
            class="text-sm sm:text-lg lg:text-xl font-normal text-strong border-r-3 border-gray-950 pr-2.5 leading-none"
          >
            <span class="font-bold text-sm text-bold/90">پرفروش‌ترین </span>
            محصولات
          </h2>
        </div>

        <div class="flex-1 h-[1px] bg-gray-200"></div>

        <div class="flex items-center gap-2 shrink-0">
          <div
            v-if="selectedCategoryList.length"
            class="hidden lg:flex items-center gap-1.5 overflow-x-auto scrollbar-none"
          >
            <button
              v-for="cat in selectedCategoryList"
              :key="cat.id"
              type="button"
              @click="setActive(cat.id)"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all border whitespace-nowrap cursor-pointer bg-white"
              :class="[
                activeCategory === cat.id
                  ? 'border-gray-900 text-gray-950 font-bold shadow-xs'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300',
              ]"
            >
              <span
                v-if="activeCategory === cat.id"
                class="w-1.5 h-1.5 rounded-full bg-gray-950 inline-block"
              ></span>
              <span>{{ cat.title }}</span>
            </button>
          </div>

          <NuxtLink
            :to="
              activeCategory
                ? `/products?category_ids=${activeCategory}`
                : '/products'
            "
            class="text-xs text-gray-700 hover:text-black font-medium pr-2 border-r border-r-gray-300 py-1.5 transition-colors whitespace-nowrap inline-block"
          >
            مشاهده همه
          </NuxtLink>

          <div
            v-if="isMobile && selectedCategoryList.length > 1"
            class="flex items-center gap-1.5 lg:hidden"
          >
            <button
              type="button"
              @click="scrollRight"
              class="w-8 h-8 rounded-lg bg-[#EAE2F3] text-[#3F2356] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              aria-label="قبلی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              @click="scrollLeft"
              class="w-8 h-8 rounded-lg bg-[#3F2356] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              aria-label="بعدی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="selectedCategoryList.length"
        ref="scrollContainer"
        class="flex lg:hidden items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4 scroll-smooth"
      >
        <button
          v-for="cat in selectedCategoryList"
          :key="cat.id"
          type="button"
          @click="setActive(cat.id)"
          class="flex shrink-0 items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs border whitespace-nowrap bg-white cursor-pointer transition-all"
          :class="[
            activeCategory === cat.id
              ? '!border-purple-900 text-strong font-bold shadow-xs'
              : 'border-gray-200 text-gray-500',
          ]"
        >
          <span
            v-if="activeCategory === cat.id"
            class="w-1.5 h-1.5 rounded-full bg-purple-900 inline-block"
          ></span>
          <span>{{ cat.title }}</span>
        </button>
      </div>
      <MobileDoubleRowSlider
        :products="visibleProducts"
        class="block md:hidden"
        @add-to-cart="handleAddToCart"
        @toggle-favorite="handleToggleFavorite"
      />
      <div
        v-if="visibleProducts.length"
        class="hidden md:grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        <SharedProductCard
          v-for="(product, index) in visibleProducts"
          :key="product.id ?? index"
          :product="product"
          :save-loc="true"
          :active-tab="String(activeCategory)"
        />
      </div>

      <div
        v-else
        class="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl text-sm"
      >
        محصولی در این دسته‌بندی یافت نشد.
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import SharedProductCard from "@/components/shared/productCard.vue";
import MobileDoubleRowSlider from "../shared/MobileDoubleRowSlider.vue";

const props = defineProps({
  selectedCategoryList: {
    type: Array,
    default: () => [],
  },
});

const activeCategory = ref(
  props.selectedCategoryList.length ? props.selectedCategoryList[0].id : null,
);

watch(
  () => props.selectedCategoryList,
  (newList) => {
    if (newList?.length && !activeCategory.value) {
      activeCategory.value = newList[0].id;
    }
  },
  { immediate: true },
);

const scrollContainer = ref(null);
const isMobile = ref(false);

const visibleProducts = computed(() => {
  if (!activeCategory.value) return [];
  const found = props.selectedCategoryList.find(
    (item) => item.id === activeCategory.value,
  );
  return found?.list || [];
});

const setActive = (value) => {
  activeCategory.value = value;
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -180,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: 180,
      behavior: "smooth",
    });
  }
};

const checkMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 1024;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkMobile);
  }
});
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
