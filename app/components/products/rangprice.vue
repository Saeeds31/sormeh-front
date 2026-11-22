<!-- app/components/products/rangprice.vue -->
<template>
  <div class="border rounded-inner p-4 mb-6 mt-2">
    <h3 class="font-bold mb-3">محدوده قیمت</h3>
    <div class="flex gap-2 items-center">
      <input
        type="number"
        v-model.number="localPriceRange[0]"
        class="border p-2 rounded w-full"
        :placeholder="` ${Number(mainPriceRange.min_price).toLocaleString('fa-IR')}`"
        min="0"
      />
      <span class="px-2">تا</span>
      <input
        type="number"
        v-model.number="localPriceRange[1]"
        class="border p-2 rounded w-full"
        :placeholder="` ${Number(mainPriceRange.max_price).toLocaleString('fa-IR')} `"
        min="0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  priceRange: {
    type: Array,
  },
  mainPriceRange: {
    type: Object,
  },
});

const emit = defineEmits(["update:priceRange"]);

const localPriceRange = ref([...(props.priceRange || [])]);

const sameRange = (a = [], b = []) =>
  String(a?.[0] ?? "") === String(b?.[0] ?? "") &&
  String(a?.[1] ?? "") === String(b?.[1] ?? "");

// همگام‌سازی با parent + لاگ‌گیری
watch(
  localPriceRange,
  (newVal) => {
    if (!sameRange(newVal, props.priceRange)) {
      emit("update:priceRange", [...newVal]);
    }
  },
  { deep: true },
);

// در صورت تغییر prop از parent
watch(
  () => props.priceRange,
  (newVal) => {
    if (!sameRange(localPriceRange.value, newVal)) {
      localPriceRange.value = [...(newVal || [])];
    }
  },
  { deep: true },
);
</script>

<!-- <script setup>
import { ref, watch } from "vue";

const props = defineProps({
  priceRange: {
    type: Array,
  },
  mainPriceRange: {
    type: Object,
  },
});

const emit = defineEmits(["update:priceRange"]);

const localPriceRange = ref([...props.priceRange]);

watch(
  localPriceRange,
  (newVal, oldVal) => {
    emit("update:priceRange", newVal);
  },
  { deep: true },
);

watch(
  () => props.priceRange,
  (newVal) => {
    localPriceRange.value = [...newVal];
  },
  { deep: true },
);
</script> -->
