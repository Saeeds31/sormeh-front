<!-- components/shared/breadCrumb.vue -->
<template>
  <nav
    class="flex items-center flex-wrap gap-1 md:gap-2 text-[10px] md:text-sm bg-secondary-fade p-2 md:p-4 rounded-lg"
  >
    <NuxtLink
      to="/"
      class="hover:text-strong transition-colors flex items-center gap-1"
    >
      <iconHome />
      صفحه اصلی
    </NuxtLink>

    <span v-if="items.length > 0" class="text-muted">
      <iconArrowLeftCute />
    </span>

    <template v-for="(item, index) in items" :key="index">
      <NuxtLink
        v-if="index !== items.length - 1"
        :to="item.href"
        class="hover:text-strong transition-colors"
      >
        {{ item.label }}
      </NuxtLink>

      <span v-if="index !== items.length - 1" class="text-muted">
        <iconArrowLeftCute />
      </span>

      <span v-else class="text-strong text-[10px] md:text-sm md:font-medium">
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [{ label: "درباره ما", href: "/about" }],
  },
});
</script>
