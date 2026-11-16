<!-- app/components/product/tabs.vue -->
<!-- <template>
  <Section class="flex flex-col lg:flex-row gap-4">
    <div class="w-full">
      <ProductTabsSectionTab
        :specifications="props.specifications"
        :description="props.description"
      />
    </div>
  </Section>
  <section class="relative container">
    <h2 class="mb-3 text-lg font-bold text-gray-800 text-right">
      {{ title }}
    </h2>
    <HomeSlidersHomeOfferSlider :products="similarProducts" />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useApi } from "@/composables/api/useApi";

const props = defineProps({
  specifications: Array,
  description: {
    type: String,
    default: "",
  },
  products: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "محصولات مشابه ",
  },
  productId: {
    type: [String, Number],
    required: true,
  },
});
console.log(
  "🔵 tabs.vue setup, productId:",
  props.productId,
  typeof props.productId,
);

const { getSimilarProducts } = useApi();
const { data: similarData } = await useAsyncData(
  () => `similar-products-${props.productId}`,
  () => {
    if (!props.productId) return null;
    return getSimilarProducts(props.productId);
  },
  {
    watch: [() => props.productId],
  },
);
const similarProducts = computed(() => {
  return similarData.value?.data?.similar_products || [];
});
</script> -->

<template>
  <Section class="flex flex-col gap-4">
    <div class="w-full">
      <ProductTabsSectionTab
        :specifications="props.specifications"
        :description="props.description"
        :comments="commentsData"
        :similar-products="similarProducts"
      />
    </div>
  </Section>
</template>

<script setup>
import { computed } from "vue";
import { useApi } from "@/composables/api/useApi";

const props = defineProps({
  specifications: Array,
  description: {
    type: String,
    default: "",
  },
  productId: {
    type: [String, Number],
    required: true,
  },
});

const commentsData = ref(null);
const { getSimilarProducts } = useApi();

const { data: similarData } = await useAsyncData(
  () => `similar-products-${props.productId}`,
  () => {
    if (!props.productId) return null;
    return getSimilarProducts(props.productId);
  },
  {
    watch: [() => props.productId],
  },
);

const similarProducts = computed(() => {
  return similarData.value?.data?.similar_products || [];
});
</script>
