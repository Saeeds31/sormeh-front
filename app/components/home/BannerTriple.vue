<!-- app/components/home/BannerTriple.vue -->
<template>
  <section v-if="items && items.length" class="w-full container my-12 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="(ban, i) in items"
        :key="ban.id || i"
        :to="ban.link || '/products'"
        class="block w-full overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md bg-gray-50"
      >
        <SharedAppImage
          :src="resolveImage(ban.image_desktop || ban.image)"
          :alt="ban.title || 'بنر تبلیغاتی'"
          format="webp"
          loading="lazy"
          img-class="w-full h-auto object-cover rounded-2xl block"
        />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const { $getImageUrl } = useNuxtApp();

const resolveImage = (img) => {
  if (!img) return "";
  // اگر عکس محلی SVG در پوشه public است (شروع با /)
  if (
    typeof img === "string" &&
    (img.startsWith("/") || img.startsWith("http"))
  ) {
    return img;
  }
  return typeof $getImageUrl === "function"
    ? $getImageUrl(img)
    : `/storage/${img}`;
};
</script>
