<!-- app/components/header/Menu.vue -->
<template>
  <nav
    class="menu-nav w-full bg-white relative z-40"
    style="--mega-menu-top: 160px"
  >
    <div class="mx-auto">
      <div class="flex items-center justify-between">
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center">
          <ul class="flex flex-row items-center gap-8">
            <!-- آیتم استاتیک دسته بندی محصولات با مگامنو -->
            <li
              class="group/menu relative"
              @mouseenter="openMegaMenu"
              @mouseleave="scheduleCloseMegaMenu"
            >
              <button
                type="button"
                class="flex items-center gap-2 text-sm font-bold text-[#4B2A7B] py-5 transition-colors"
                :class="{ 'text-[#4B2A7B]': megaMenuOpen }"
              >
                <span>دسته بندی محصولات</span>
                <svg
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': megaMenuOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Mega Menu Panel -->
              <transition name="mega-fade">
                <div
                  v-show="megaMenuOpen"
                  class="mega-menu-panel fixed left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-b-xl overflow-hidden z-[60]"
                  @mouseenter="openMegaMenu"
                  @mouseleave="scheduleCloseMegaMenu"
                >
                  <div class="flex min-h-[460px] max-h-[540px]">
                    <!-- ستون سمت راست: دسته‌های اصلی -->
                    <div
                      class="w-[230px] bg-[#F8F5FB] border-l border-gray-200 py-3 overflow-y-auto"
                    >
                      <button
                        v-for="cat in categories"
                        :key="cat.id"
                        type="button"
                        class="w-full text-right px-6 py-3 text-sm font-medium transition-colors"
                        :class="
                          activeMegaCategory?.id === cat.id
                            ? 'bg-white text-[#4B2A7B] font-bold shadow-sm'
                            : 'text-[#2B2B2B] hover:bg-white/60'
                        "
                        @mouseenter="setActiveCategory(cat)"
                        @focus="setActiveCategory(cat)"
                      >
                        {{ cat.title }}
                      </button>
                    </div>

                    <!-- بخش چپ: ستون‌های زیرمجموعه -->
                    <div class="flex-1 bg-white px-8 py-6 overflow-y-auto">
                      <div
                        v-if="activeMegaCategory && activeMegaColumns.length"
                        class="grid grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8"
                      >
                        <div
                          v-for="(column, colIndex) in activeMegaColumns"
                          :key="`col-${activeMegaCategory.id}-${colIndex}`"
                          class="min-w-0 pl-4 border-l border-gray-100 last:border-l-0"
                        >
                          <div
                            v-if="column.title"
                            class="mb-4 pr-3 border-r-2 border-[#4B2A7B]"
                          >
                            <NuxtLink
                              v-if="column.id"
                              :to="categoryLink(column.id)"
                              class="text-sm font-bold text-[#2B2B2B] hover:text-[#4B2A7B] transition-colors"
                            >
                              {{ column.title }}
                            </NuxtLink>
                            <span
                              v-else
                              class="text-sm font-bold text-[#2B2B2B]"
                            >
                              {{ column.title }}
                            </span>
                          </div>

                          <ul class="space-y-3">
                            <li
                              v-for="child in column.items"
                              :key="child.id"
                              class="leading-6"
                            >
                              <NuxtLink
                                :to="categoryLink(child.id)"
                                class="text-sm text-gray-500 hover:text-[#4B2A7B] transition-colors block"
                              >
                                {{ child.title }}
                              </NuxtLink>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div
                        v-else-if="activeMegaCategory"
                        class="h-full flex items-start"
                      >
                        <div class="pr-3 border-r-2 border-[#4B2A7B]">
                          <NuxtLink
                            :to="categoryLink(activeMegaCategory.id)"
                            class="text-sm font-bold text-[#2B2B2B] hover:text-[#4B2A7B] transition-colors"
                          >
                            {{ activeMegaCategory.title }}
                          </NuxtLink>
                        </div>
                      </div>

                      <div
                        v-else
                        class="h-full flex items-center justify-center text-sm text-gray-400"
                      >
                        دسته‌بندی‌ای برای نمایش وجود ندارد
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </li>

            <!-- منوهای معمولی API -->
            <li v-for="item in menuItems" :key="item.id" class="group relative">
              <NuxtLink
                :to="item.link || '#'"
                :class="[
                  'flex items-center text-sm font-medium transition-colors py-5',
                  isActive(item.link)
                    ? 'text-purple-900 !font-bold'
                    : 'hover:text-purple-900 ',
                ]"
              >
                {{ item.title }}
              </NuxtLink>

              <div
                v-if="item.children && item.children.length > 0"
                class="absolute top-full right-0 w-56 bg-white border border-gray-100 rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 dark:bg-gray-800 dark:border-gray-700"
              >
                <ul class="py-2">
                  <li v-for="sub in item.children" :key="sub.id">
                    <NuxtLink
                      :to="sub.link || '#'"
                      :class="[
                        'block px-4 py-2 text-sm',
                        isActive(sub.link)
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400'
                          : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700',
                      ]"
                    >
                      {{ sub.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- منوی موبایل -->
    <div
      v-if="props.mobile"
      class="md:hidden bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <ul class="px-4 py-2 space-y-1">
        <li v-for="item in menuItems" :key="item.id">
          <div class="flex flex-col">
            <div class="flex justify-between items-center w-full">
              <NuxtLink
                :to="item.link || '#'"
                :class="[
                  'block py-3 text-base font-medium',
                  isActive(item.link)
                    ? 'text-purple-900 font-bold dark:text-purple-800'
                    : 'text-gray-700 dark:text-gray-200',
                ]"
                @click="props.menuToggleFunction()"
              >
                {{ item.title }}
              </NuxtLink>
            </div>

            <ul
              v-if="item.children && item.children.length > 0"
              v-show="activeMobileSub === item.id"
              class="pr-4 border-r-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 mb-2 rounded-lg"
            >
              <li v-for="sub in item.children" :key="sub.id">
                <NuxtLink
                  :to="sub.link || '#'"
                  :class="[
                    'block py-2 text-sm',
                    isActive(sub.link)
                      ? 'text-indigo-600 font-bold dark:text-indigo-400'
                      : 'text-gray-600 hover:text-indigo-600 dark:text-gray-400',
                  ]"
                  @click="props.menuToggleFunction()"
                >
                  {{ sub.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "@/composables/api/useApi";

const props = defineProps({
  menuToggleFunction: {
    type: Function,
    default: () => {},
  },
  mobile: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const activeMobileSub = ref(null);

const megaMenuOpen = ref(false);
const activeMegaCategory = ref(null);
let closeTimer = null;

const { getBase, getShopFilters } = useApi();

const { data: baseResponse } = await useAsyncData(
  "layout-base-data",
  () => getBase(),
  { server: true, lazy: true },
);

const { data: shopFiltersResponse } = await useAsyncData(
  "layout-shop-filters",
  () => getShopFilters(),
  {
    server: true,
    lazy: true,
    default: () => ({ data: { categories: [] } }),
  },
);

const resolveLink = (item) => {
  if (item?.link) return item.link;

  const title = (item?.title || "").trim();

  if (title === "درباره ما") return "/about-us";
  if (title === "تماس با ما") return "/contact-us";

  if (item?.id) return `/products?category_ids=${item.id}`;

  return "#";
};

const normalizeMenus = (rawMenus) => {
  if (!Array.isArray(rawMenus)) return [];

  // فیلتر کردن «دسته بندی محصولات» از لیست API اصلی تا تکراری نشود
  return rawMenus
    .filter((m) => (m?.title || "").trim() !== "دسته بندی محصولات")
    .map((m) => ({
      id: m.id ?? m.title,
      title: m.title ?? "",
      link: resolveLink(m),
      children: Array.isArray(m.children)
        ? m.children.map((c) => ({
            id: c.id ?? c.title,
            title: c.title ?? "",
            link: resolveLink(c),
          }))
        : [],
    }));
};

const menuItems = computed(() => {
  const data = baseResponse.value?.data ?? baseResponse.value ?? {};
  const rawMenus = data.menus ?? [];
  return normalizeMenus(rawMenus);
});

const categories = computed(() => {
  return shopFiltersResponse.value?.data?.categories || [];
});

const categoryLink = (categoryId) => {
  return `/products?category_ids=${categoryId}`;
};

const setActiveCategory = (category) => {
  activeMegaCategory.value = category || null;
};

const activeMegaColumns = computed(() => {
  const cat = activeMegaCategory.value;
  if (!cat) return [];

  const rawChildren = cat.children || cat.all_children || [];
  if (!rawChildren.length) return [];

  return rawChildren.map((sub) => ({
    id: sub.id,
    title: sub.title,
    items: sub.children || sub.all_children || [],
  }));
});

const openMegaMenu = () => {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
  megaMenuOpen.value = true;
  if (!activeMegaCategory.value && categories.value.length) {
    activeMegaCategory.value = categories.value[0];
  }
};

const scheduleCloseMegaMenu = () => {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    megaMenuOpen.value = false;
  }, 120);
};

const isActive = (link) => {
  if (!link || link === "#") return false;
  return route.fullPath === link;
};

watch(
  categories,
  (list) => {
    if (!activeMegaCategory.value && list?.length) {
      activeMegaCategory.value = list[0];
    }
  },
  { immediate: true },
);

watch(
  () => route.fullPath,
  () => {
    activeMobileSub.value = null;
  },
);
</script>

<style scoped>
.mega-fade-enter-active,
.mega-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.mega-fade-enter-from,
.mega-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.mega-menu-panel {
  top: var(--mega-menu-top, 160px);
}

@media (max-width: 767px) {
  .mega-menu-panel {
    display: none;
  }
}
</style>
