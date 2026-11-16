<!-- app/components/home/Categories/Card.vue -->
<template>
  <NuxtLink
    :to="item.id == 0 ? '/products' : `/products?category_ids=${item.id}`"
    class="relative group cursor-pointer block pb-6 pt-2 min-w-0"
  >
    <div
      class="relative bg-white rounded-3xl p-2 pb-7 flex flex-col items-center justify-between transition-all duration-300 h-[140px] md:h-[210px] border-2 border-[#E9E9EE] group-hover:border-[#552278]"
    >
      <div
        class="w-full h-[65px] md:h-[115px] flex items-center justify-center relative shrink-0"
      >
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="item.title"
          class="max-h-[65px] md:max-h-[110px] max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <span v-else class="text-xs md:text-sm text-gray-400">
          {{ item.title }}
        </span>
      </div>

      <div
        class="w-full h-8 flex items-center justify-center text-center mt-auto"
      >
        <h3
          class="text-xs md:pb-4 md:text-sm font-bold text-gray-800 transition-colors group-hover:text-[#552278] truncate px-1"
        >
          {{ item.title }}
        </h3>
      </div>

      <div
        class="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-12 md:w-16 h-6 md:h-8 bg-white rounded-t-full border-t-2 border-x-2 border-[#E9E9EE] group-hover:border-[#552278] pointer-events-none transition-colors duration-300"
      />
    </div>

    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10"
    >
      <div
        class="w-5 h-5 rounded-full bg-[#EEDFFD] transition-all duration-300 group-hover:bg-[#552278] group-hover:scale-125 group-hover:shadow-[0_0_12px_4px_rgba(85,34,120,0.4)]"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { $getImageUrl } = useNuxtApp();

const imageSrc = computed(() => {
  const img = props.item?.image;
  if (!img) return "";

  if (typeof img === "string" && /^https?:\/\//.test(img)) {
    return img;
  }

  return $getImageUrl(img);
});
</script>
