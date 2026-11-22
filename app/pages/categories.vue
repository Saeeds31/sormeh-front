<!-- app/pages/categories.vue -->
<template>
  <div class="min-h-screen bg-white flex flex-col z-50 md:hidden" dir="rtl">
    <!-- هدر بالای صفحه و سرچ -->
    <header
      class="sticky top-0 z-50 bg-white px-4 pt-0 pb-2 border-b border-gray-100 space-y-3"
    >
      <div class="flex items-center gap-3">
        <!-- دکمه بازگشت -->
        <button
          type="button"
          @click="goBack"
          class="p-1 text-gray-700 hover:text-black transition-colors"
          aria-label="بازگشت"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 rotate-180"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <!-- اینپوت جستجو -->
        <!-- <div class="relative flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجو محصولات در سرمه..."
            class="w-full bg-[#f6f6f8] text-gray-800 placeholder-gray-400 text-xs sm:text-sm rounded-full py-2.5 pr-10 pl-4 border border-transparent focus:border-[#4B2A7B] focus:bg-white outline-none transition-all"
            @keyup.enter="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="m20 20-3-3" />
        </svg>
        </div> -->
        <h1 class="text-center font-bold text-sm sm:text-base text-[#4B2A7B]">
          دسته‌بندی محصولات سرمه
        </h1>
      </div>

      <!-- عنوان دسته‌بندی -->
    </header>

    <!-- لودینگ -->
    <div
      v-if="pending"
      class="flex-1 flex flex-col items-center justify-center py-20"
    >
      <SharedLoadingSpinner size="lg" />
      <span class="text-xs text-gray-400 mt-3"
        >در حال بارگذاری دسته‌بندی‌ها...</span
      >
    </div>

    <!-- بدنه دو ستونه (مشابه تصویر فیگما) -->
    <div v-else class="flex flex-1 overflow-hidden h-[calc(100vh-120px)] pb-20">
      <!-- ستون راست: منوی دسته‌های اصلی (سطح ۱) -->
      <aside
        class="w-[125px] sm:w-[145px] bg-secondary-fade overflow-y-auto border-r border-gray-100 flex flex-col"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          @click="selectCategory(cat)"
          class="relative w-full text-right px-3 py-3.5 text-xs sm:text-sm font-medium transition-all"
          :class="
            activeCategory?.id === cat.id
              ? 'bg-secondary text-white font-bold shadow-xs'
              : 'text-gray-700 hover:bg-white/50'
          "
        >
          <span
            v-if="activeCategory?.id === cat.id"
            class="absolute left-0 top-0 bottom-0 w-1 bg-[#4B2A7B] rounded-r"
          ></span>
          <span class="block truncate">{{ cat.title }}</span>
        </button>
      </aside>

      <!-- ستون چپ: زیردسته‌ها و آکاردئون‌ها (سطح ۲ و ۳) -->
      <div class="flex-1 bg-white overflow-y-auto px-4 py-4 space-y-4">
        <template v-if="subCategories.length">
          <div
            v-for="sub in subCategories"
            :key="sub.id"
            class="border-b border-gray-100 last:border-b-0 pb-3"
          >
            <!-- عنوان زیردسته همراه با تاگل آکاردئون -->
            <div
              class="flex items-center justify-between py-2 cursor-pointer select-none"
              @click="toggleAccordion(sub.id)"
            >
              <!-- متن زیردسته اصلی (سطح ۲) -->
              <NuxtLink
                :to="`/products?category_ids=${sub.id}`"
                class="font-bold text-xs sm:text-sm text-gray-800 hover:text-[#4B2A7B] transition-colors"
                @click.stop
              >
                {{ sub.title }}
              </NuxtLink>
              <!-- آیکون فلش (Chevron) سمت چپ -->
              <svg
                v-if="sub.children && sub.children.length"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-500 transition-transform duration-200"
                :class="{ 'rotate-180': openAccordionId === sub.id }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div v-else class="w-4"></div>
            </div>

            <!-- فرزندان سطح ۳ (آکاردئون باز شده) -->
            <transition name="expand">
              <ul
                v-if="
                  openAccordionId === sub.id &&
                  sub.children &&
                  sub.children.length
                "
                class="space-y-3 pt-2 pr-2 text-right"
              >
                <li v-for="child in sub.children" :key="child.id">
                  <NuxtLink
                    :to="`/products?category_ids=${child.id}`"
                    class="block text-xs text-gray-500 hover:text-[#4B2A7B] active:text-[#4B2A7B] py-1 transition-colors"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </div>
        </template>

        <!-- در صورتی که دسته‌بندی زیرمجموعه نداشت -->
        <div
          v-else
          class="h-full flex flex-col items-center justify-center text-center p-6"
        >
          <p class="text-xs text-gray-400 mb-4">
            برای این بخش زیردسته‌ای ثبت نشده است.
          </p>
          <NuxtLink
            v-if="activeCategory"
            :to="`/products?category_ids=${activeCategory.id}`"
            class="text-xs font-bold text-[#4B2A7B] bg-[#F4EFF9] px-4 py-2 rounded-xl"
          >
            مشاهده تمام محصولات این دسته
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/api/useApi";

const router = useRouter();
const { getShopFilters } = useApi();

const searchQuery = ref("");
const activeCategory = ref(null);
const openAccordionId = ref(null);

// دریافت لیست دسته‌بندی‌ها از همان API مورد استفاده در دسکتاپ
const { data: shopFiltersResponse, pending } = await useAsyncData(
  "mobile-categories-data",
  () => getShopFilters(),
  {
    lazy: true,
    server: true,
    default: () => ({ data: { categories: [] } }),
  },
);

const categories = computed(() => {
  return shopFiltersResponse.value?.data?.categories || [];
});

// استخراج فرزندان سطح ۲ و ۳ دسته انتخاب‌شده
const subCategories = computed(() => {
  if (!activeCategory.value) return [];
  const raw =
    activeCategory.value.children || activeCategory.value.all_children || [];
  return raw.map((item) => ({
    id: item.id,
    title: item.title,
    children: item.children || item.all_children || [],
  }));
});

const selectCategory = (cat) => {
  activeCategory.value = cat;
  // به‌صورت پیش‌فرض اولین آکاردئون دارای فرزند را باز نگه می‌دارد (مشابه عکس فیگما)
  const firstWithChildren = subCategories.value.find((c) => c.children?.length);
  openAccordionId.value = firstWithChildren ? firstWithChildren.id : null;
};

const toggleAccordion = (id) => {
  openAccordionId.value = openAccordionId.value === id ? null : id;
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  router.push(`/products?q=${encodeURIComponent(searchQuery.value.trim())}`);
};

// تنظیم پیش‌فرض اولین دسته‌بندی پس از لود داده‌ها
watch(
  categories,
  (list) => {
    if (!activeCategory.value && list?.length) {
      selectCategory(list[0]);
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
