<!-- app/components/home/Articles/BigCard.vue -->
<template>
  <div
    v-if="card"
    class="bg-accent-fade rounded-2xl overflow-hidden shadow-hover transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100/60"
  >
    <!-- کانتینر تصویر بهینه با پشتیبانی WebP -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <SharedAppImage
        v-if="card.image"
        :src="$getImageUrl(card.image)"
        :alt="card.title"
        format="webp"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <!-- Placeholder در صورت عدم وجود تصویر -->
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-gray-200"
      >
        <svg
          class="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <!-- محتوای متنی کارت -->
    <div class="px-3 md:px-6 py-4">
      <div class="mb-3 flex items-center gap-3 text-xs text-gray-600">
        <!-- نویسنده (آواتار یا آیکون کاربر + نام) -->
        <span
          v-if="authorName"
          class="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <span
            class="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gray-200 text-gray-500"
          >
            <SharedAppImage
              v-if="authorAvatar"
              :src="$getImageUrl(authorAvatar)"
              :alt="authorName"
              format="webp"
              class="w-full h-full object-cover"
            />
            <IconUser v-else class="w-3.5 h-3.5" />
          </span>
          {{ authorName }}
        </span>

        <span
          v-if="card.created_at"
          class="inline-flex items-center gap-1 whitespace-nowrap shrink-0"
        >
          <IconCalendar class="w-3.5 h-3.5" />
          {{ formatDate(card.created_at) }}
        </span>

        <!-- تعداد نظرات -->
        <span class="inline-flex items-center gap-1 whitespace-nowrap shrink-0">
          <IconChat class="w-4 h-4" />
          {{ commentsCount }} نظر
        </span>
      </div>

      <h3
        class="text-base lg:text-lg font-bold mb-3 line-clamp-2 leading-relaxed text-strong"
      >
        {{ card.title }}
      </h3>

      <p class="text-muted text-sm mb-5 line-clamp-3 leading-7">
        {{ card.short_description || card.summary || "توضیحات مقاله" }}
      </p>

      <!-- پایین کارت -->
      <div
        class="flex items-center justify-between pt-2 border-t border-gray-100"
      >
        <div class="text-strong font-medium text-xs">
          {{
            card.read_time || card.reading_time
              ? `${card.read_time || card.reading_time} دقیقه مطالعه`
              : ""
          }}
        </div>
        <NuxtLink
          :to="`/blog/${card.id}`"
          class="btn max-md:!text-sm px-3 py-1.5"
        >
          مشاهده مقاله
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const authorName = computed(() => {
  if (!props.card?.author) return null;
  if (typeof props.card.author === "string") return props.card.author;
  return (
    props.card.author.full_name ||
    props.card.author.name ||
    props.card.author.username ||
    null
  );
});

const authorAvatar = computed(() => {
  if (!props.card?.author || typeof props.card.author !== "object") return null;
  return props.card.author.avatar || null;
});

const commentsCount = computed(() => {
  if (
    props.card?.comments_count !== undefined &&
    props.card?.comments_count !== null
  ) {
    return props.card.comments_count;
  }
  if (Array.isArray(props.card?.comments)) {
    return props.card.comments.length;
  }
  return 0;
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("fa-IR");
  } catch {
    return dateString;
  }
};
</script>
