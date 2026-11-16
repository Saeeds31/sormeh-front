<!-- app/components/products/aside.vue -->
<template>
  <aside class="lg:w-[25%] w-full flex flex-col lg:bg-secondary-fade gap-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold">فیلتر کردن</h3>
      <iconFilter />
    </div>

    <ProductsFilters
      v-model:selectedCategories="localSelectedCategories"
      :categories="categories"
    />

    <ProductsSearch v-model="localQuery" @search="onSearch" />

    <!-- <ProductsWeight v-model:selectedWeight="localSelectedWeight" /> -->

    <ProductsAvailable v-model:onlyAvailable="localOnlyAvailable" />

    <ProductsRangprice
      :mainPriceRange="mainPriceRange"
      v-model:priceRange="localPriceRange"
    />

    <button
      class="btn w-full mt-5 py-2 px-4 rounded-lg transition-colors"
      @click="applyFilters"
    >
      اعمال فیلتر
    </button>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCategoryStore } from "~/store/menu.js";
const categoryStore = useCategoryStore();

await categoryStore.fetchMenuData();

const filters = computed(() => categoryStore.filters);

const categories = computed(() => filters.value?.data?.categories || []);
const mainPriceRange = computed(() => filters.value?.data?.price || []);

const props = defineProps({
  selectedCategories: { type: Array, default: () => [] },
  selectedWeight: { type: Array, default: () => [] },
  onlyAvailable: { type: Boolean, default: false },
  priceRange: { type: Array, default: () => [0, 2000000] },
  query: { type: String, default: "" },
});

const emit = defineEmits([
  "update:selectedCategories",
  "update:selectedWeight",
  "update:onlyAvailable",
  "update:priceRange",
  "update:query",
  "apply-filter",
]);

const localSelectedCategories = ref([...props.selectedCategories]);
const localSelectedWeight = ref([...props.selectedWeight]);
const localOnlyAvailable = ref(props.onlyAvailable);
const localPriceRange = ref([...props.priceRange]);
const localQuery = ref(props.query);

// فقط این‌ها real-time emit می‌شن
watch(localSelectedCategories, (v) => emit("update:selectedCategories", v));
watch(localSelectedWeight, (v) => emit("update:selectedWeight", v));
watch(localOnlyAvailable, (v) => emit("update:onlyAvailable", v));
watch(localQuery, (v) => emit("update:query", v));

function applyFilters() {
  emit("update:priceRange", localPriceRange.value);
  emit("apply-filter");
}
</script>
