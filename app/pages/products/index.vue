<!-- pages/products/index.js -->
<template>
  <main class="container mx-auto" dir="rtl">
    <sharedBreadCrumb :items="[{ label: 'محصولات', href: '/products' }]" />

    <section class="flex flex-col lg:flex-row gap-6 md:mt-10">
      <ProductsAside
        class="hidden lg:block"
        v-model:selectedCategories="filters.categories"
        v-model:selectedWeight="filters.weights"
        v-model:onlyAvailable="filters.inStock"
        v-model:priceRange="filters.priceRange"
        v-model:query="filters.search"
        @apply-filter="applyFilters"
      />

      <div class="flex-1">
        <ProductsSort
          class="hidden lg:block"
          v-model="sortBy"
          :total="paginationData?.total ?? 0"
        />

        <div
          v-if="activeFilters.length"
          class="flex flex-wrap items-center justify-start gap-3 my-3"
        >
          <!-- دکمه حذف همه فیلترها (سمت چپِ چیپ‌ها) -->
          <button
            @click="clearAllFilters"
            class="flex items-center gap-2 text-red-500 border-2 !border-red-300 px-3 py-1.5 rounded-md text-xs hover:bg-red-50"
          >
            <IconTrashRed class="w-4 h-4" />
            حذف همه فیلترها
          </button>

          <!-- چیپ‌های فیلتر (سمت راست) -->
          <div class="flex flex-wrap gap-2">
            <div
              v-for="filter in activeFilters"
              :key="filter.key"
              class="flex items-center gap-2 border-2 !border-gray-200 bg-white px-3 py-1.5 rounded-md text-xs text-gray-500"
            >
              {{ filter.label }}
              <X
                class="w-3 h-3 cursor-pointer hover:text-red-500"
                @click="removeFilter(filter)"
              />
            </div>
          </div>
        </div>
        <ProductsFilterMobile
          class="lg:hidden"
          v-model:selectedCategories="filters.categories"
          v-model:selectedWeight="filters.weights"
          v-model:onlyAvailable="filters.inStock"
          v-model:priceRange="filters.priceRange"
          v-model:query="filters.search"
          v-model:sortBy="sortBy"
          @apply-filter="applyFilters"
        />

        <div v-if="pending" class="text-center text-gray-500 mt-6">
          <SharedLoadingSpinner size="lg" />
        </div>

        <div v-else-if="error" class="text-center text-red-500 mt-6">
          خطا در دریافت محصولات
        </div>

        <div
          v-else-if="!products?.length"
          class="text-center text-gray-500 mt-6"
        >
          محصولی یافت نشد.
        </div>

        <div v-else id="productList" class="mt-5">
          <div class="flex flex-col gap-3 sm:hidden">
            <ProductCardHorizontal
              v-for="item in products"
              :key="item.id"
              :product="item"
            />
          </div>

          <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SharedProductCard
              v-for="item in products"
              :key="item.id"
              :product="item"
            />
          </div>
        </div>

        <ProductsPagination
          v-if="!pending && !error && products?.length"
          v-model="currentPage"
          :total-pages="totalPages"
          class="mt-6"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/api/useApi";
import { usePageLoading } from "@/composables/usePageLoading";
import ProductCardHorizontal from "~/components/shared/ProductCardHorizontal.vue";
import { X } from "lucide-vue-next";
const { getProducts, getBase } = useApi();
const { fetchWishlist } = useWishlist();
const { loadPageWithBase } = usePageLoading();
const route = useRoute();
const router = useRouter();

const activeFilters = computed(() => {
  const tags = [];

  if (filters.value.search)
    tags.push({ label: `جستجو: ${filters.value.search}`, key: "search" });
  if (filters.value.inStock) tags.push({ label: "فقط موجود", key: "inStock" });
  if (filters.value.categories.length > 0)
    tags.push({
      label: `دسته بندی (${filters.value.categories.length})`,
      key: "categories",
    });
  if (filters.value.priceRange[0] || filters.value.priceRange[1]) {
    tags.push({
      label: `قیمت: ${filters.value.priceRange[0]} تا ${filters.value.priceRange[1]}`,
      key: "price",
    });
  }

  return tags;
});

// 3. متد حذف فیلتر
async function removeFilter(filter) {
  if (filter.key === "search") filters.value.search = "";
  if (filter.key === "inStock") filters.value.inStock = false;
  if (filter.key === "categories") filters.value.categories = [];
  if (filter.key === "price") filters.value.priceRange = [0, 2000000];

  await applyFilters();
}
function clearAllFilters() {
  filters.value.search = "";
  filters.value.inStock = false;
  filters.value.categories = [];
  filters.value.priceRange = [0, 2000000];
  applyFilters();
}

const filters = ref({
  search: route.query.search || "",
  categories: route.query.category_ids
    ? route.query.category_ids.split(",")
    : [],
  weights: [],
  inStock: route.query.in_stock === "1",
  priceRange: [
    route.query.min_price ? Number(route.query.min_price) : "",
    route.query.max_price ? Number(route.query.max_price) : "",
  ],
});

const sortBy = ref(route.query.sort_by || "newest");
const currentPage = ref(Number(route.query.page) || 1);

const apiParams = computed(() => ({
  search: filters.value.search || undefined,
  in_stock: filters.value.inStock ? 1 : undefined,
  min_price: filters.value.priceRange[0] || undefined,
  max_price: filters.value.priceRange[1] || undefined,
  category_ids: filters.value.categories
    ? filters.value.categories.join(",")
    : undefined,
  weight: filters.value.weights.length
    ? filters.value.weights.join(",")
    : undefined,
  sort_by: sortBy.value || undefined,
  page: currentPage.value || undefined,
}));

const pending = ref(true);
const error = ref(null);
const data = ref(null);

try {
  await loadPageWithBase(
    [
      async () => {
        const response = await getProducts(apiParams.value);
        data.value = response;
        return response;
      },
      async () => await fetchWishlist(),
    ],
    "در حال بارگذاری محصولات...",
    getBase,
  );
} catch (err) {
  error.value = err;
  console.error("خطا در بارگذاری محصولات:", err);
} finally {
  pending.value = false;
}

const products = computed(() => data.value?.data?.data || []);
const paginationData = computed(() => data.value?.data || {});
const totalPages = computed(() => paginationData.value.last_page || 1);

const refresh = async () => {
  pending.value = true;
  error.value = null;
  try {
    await loadPageWithBase(
      [
        async () => {
          const response = await getProducts(apiParams.value);
          data.value = response;
          return response;
        },
      ],
      "در حال بارگذاری مجدد...",
    );
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

async function applyFilters() {
  const query = {};

  if (apiParams.value.search) query.search = apiParams.value.search;
  if (apiParams.value.in_stock) query.in_stock = apiParams.value.in_stock;
  if (apiParams.value.min_price) query.min_price = apiParams.value.min_price;
  if (apiParams.value.max_price) query.max_price = apiParams.value.max_price;
  if (apiParams.value.category_ids)
    query.category_ids = apiParams.value.category_ids;
  if (filters.value.weights.length)
    query.weight = filters.value.weights.join(",");
  if (sortBy.value && sortBy.value !== "newest") query.sort_by = sortBy.value;

  currentPage.value = 1;

  await router.push({ query });
}

watch(sortBy, () => {
  applyFilters();
});

watch(currentPage, async (newPage) => {
  const query = { ...route.query };
  if (newPage > 1) {
    query.page = newPage;
  } else {
    delete query.page;
  }
  await router.push({ query });
});

watch(
  () => route.query,
  (newQuery) => {
    filters.value.search = newQuery.search || "";
    filters.value.inStock = newQuery.in_stock === "1";
    filters.value.categories = newQuery.category_id
      ? [Number(newQuery.category_id)]
      : [];
    filters.value.weights = newQuery.weight
      ? newQuery.weight.split(",").map(Number)
      : [];
    filters.value.priceRange = [
      newQuery.min_price ? Number(newQuery.min_price) : 0,
      newQuery.max_price ? Number(newQuery.max_price) : 2000000,
    ];
    sortBy.value = newQuery.sort_by || "newest";
    currentPage.value = Number(newQuery.page) || 1;
    refresh();
  },
);
</script>
