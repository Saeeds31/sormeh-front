<template>
  <section class="w-full container overflow-hidden">
    <SharedSectionSliderHeader
      :title-parts="[
        { text: 'جدیدترین', class: 'text-gray-900' },
        { text: 'دسته بندی ها', class: 'font-normal text-strong' },
      ]"
      title-class="text-gray-900"
      wrapper-class="md:mb-8"
      divider-visible-class="!block"
      prev-label="قبلی"
      next-label="بعدی"
      @prev="scrollPrev"
      @next="scrollNext"
    />

    <div
      ref="sliderRef"
      class="flex items-center gap-4 md:gap-6 overflow-x-auto pt-2 px-2 no-scrollbar scroll-smooth"
    >
      <HomeCategoriesCard
        v-for="(item, index) in sortedCategories"
        :key="item.id ?? index"
        :item="mapCategory(item, index)"
        class="w-[calc(100vw/3.5)] sm:w-[calc(100vw/5)] md:w-[190px] lg:w-[calc(16.666%-20px)] flex-shrink-0"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const sliderRef = ref(null);

const sortedCategories = computed(() => {
  const arr = [...props.categories];

  arr.push({
    id: 0,
    title: "همه محصولات",
    description: "دنیای بی پایان لباس زیر و محصولات زنانه در فروشگاه ماه ستی",
    image: null,
  });

  return arr;
});

const mapCategory = (item, index) => {
  return {
    id: item.id,
    slug: item.slug || "",
    title: item.title ?? "دسته‌بندی",
    description:
      item.meta_description || item.description || "محصولات این دسته را ببینید",
    image: item.main_image || item.icon || "",
    link: item.slug ? `/category/${item.slug}` : `/category/${item.id}`,
    buttonText: "مشاهده محصولات",
    big: index === 0,
    gradient: gradientByIndex(index),
  };
};

const gradientByIndex = (index) => {
  const gradients = [
    "bg-[#628F24]",
    "bg-[#0A2E63]",
    "bg-[#028BBF]",
    "bg-[#1F7F42]",
    "bg-[#1A8D6A]",
  ];

  return gradients[index % gradients.length];
};

const scrollPrev = () => {
  sliderRef.value?.scrollBy({ left: -250, behavior: "smooth" });
};

const scrollNext = () => {
  sliderRef.value?.scrollBy({ left: 250, behavior: "smooth" });
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
