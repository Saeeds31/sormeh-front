<!-- app/components/products/aside.vue -->
<!-- <template>
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

watch(localSelectedCategories, (v) => emit("update:selectedCategories", v));
watch(localSelectedWeight, (v) => emit("update:selectedWeight", v));
watch(localOnlyAvailable, (v) => emit("update:onlyAvailable", v));
watch(localQuery, (v) => emit("update:query", v));

function applyFilters() {
  emit("update:priceRange", localPriceRange.value);
  emit("apply-filter");
}
</script> -->

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
import { computed, ref, watch } from "vue";
import { useCategoryStore } from "~/store/menu.js";

const categoryStore = useCategoryStore();
await categoryStore.fetchMenuData();

const filters = computed(() => categoryStore.filters);

const categories = computed(
  () => filters.value?.data?.categories || filters.value?.categories || [],
);
const mainPriceRange = computed(
  () => filters.value?.data?.price || filters.value?.price || [],
);

const props = defineProps({
  selectedCategories: { type: Array, default: () => [] },
  selectedWeight: { type: Array, default: () => [] },
  onlyAvailable: { type: Boolean, default: false },
  priceRange: { type: Array, default: () => ["", ""] },
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

const localSelectedCategories = ref([...(props.selectedCategories || [])]);
const localSelectedWeight = ref([...(props.selectedWeight || [])]);
const localOnlyAvailable = ref(props.onlyAvailable);
const localPriceRange = ref([...(props.priceRange || [])]);
const localQuery = ref(props.query);

const sameIds = (a = [], b = []) =>
  a.length === b.length && a.every((id, i) => String(id) === String(b[i]));

const sameRange = (a = [], b = []) =>
  String(a?.[0] ?? "") === String(b?.[0] ?? "") &&
  String(a?.[1] ?? "") === String(b?.[1] ?? "");

/* ---------- local → parent (با گارد، بدون حلقه) ---------- */
watch(
  localSelectedCategories,
  (v) => {
    if (!sameIds(v, props.selectedCategories))
      emit("update:selectedCategories", [...v]);
  },
  { deep: true },
);
watch(
  localSelectedWeight,
  (v) => {
    if (!sameIds(v, props.selectedWeight))
      emit("update:selectedWeight", [...v]);
  },
  { deep: true },
);
watch(localOnlyAvailable, (v) => {
  if (v !== props.onlyAvailable) emit("update:onlyAvailable", v);
});
watch(localQuery, (v) => {
  if (v !== props.query) emit("update:query", v);
});
watch(
  localPriceRange,
  (v) => {
    if (!sameRange(v, props.priceRange)) emit("update:priceRange", [...v]);
  },
  { deep: true },
);

/* ---------- parent → local (بعد از تغییر URL / حذف همه) ---------- */
watch(
  () => props.selectedCategories,
  (v) => {
    const next = v || [];
    if (!sameIds(localSelectedCategories.value, next))
      localSelectedCategories.value = [...next];
  },
  { deep: true },
);
watch(
  () => props.selectedWeight,
  (v) => {
    const next = v || [];
    if (!sameIds(localSelectedWeight.value, next))
      localSelectedWeight.value = [...next];
  },
  { deep: true },
);
watch(
  () => props.onlyAvailable,
  (v) => {
    if (localOnlyAvailable.value !== v) localOnlyAvailable.value = v;
  },
);
watch(
  () => props.query,
  (v) => {
    if (localQuery.value !== v) localQuery.value = v;
  },
);
watch(
  () => props.priceRange,
  (v) => {
    const next = v || [];
    if (!sameRange(localPriceRange.value, next))
      localPriceRange.value = [...next];
  },
  { deep: true },
);

function onSearch() {
  applyFilters();
}

function applyFilters() {
  emit("update:priceRange", [...localPriceRange.value]);
  emit("apply-filter");
}
</script>
