<!-- app/components/home/BigCard.vue -->
<template>
  <article
    v-if="card"
    class="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between hover:shadow-md transition-shadow h-full"
    dir="rtl"
  >
    <div>
      <div
        class="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4"
      >
        <NuxtLink :to="articleLink" class="block w-full h-full">
          <SharedAppImage
            :src="cardImage"
            :alt="card.title"
            img-class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </NuxtLink>
      </div>

      <div
        class="flex items-center justify-end gap-3 text-xs text-gray-400 mb-3"
      >
        <div class="flex items-center gap-1">
          <span>{{ card.comments_count ?? 0 }} نظر</span>
          <svg
            class="w-3.5 h-3.5 stroke-current fill-none"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
        </div>

        <span>{{ formattedDate }}</span>

        <div class="flex items-center gap-1.5 font-medium text-gray-600">
          <span>{{ authorName }}</span>
          <div
            class="w-5 h-5 rounded-full overflow-hidden bg-purple-50 flex items-center justify-center shrink-0 ring-1 ring-purple-100"
          >
            <SharedAppImage
              v-if="authorAvatar"
              :src="authorAvatar"
              alt="author"
              img-class="w-full h-full object-cover"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 text-purple-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
        </div>
      </div>

      <NuxtLink :to="articleLink">
        <h3
          class="text-base font-bold text-gray-900 leading-snug mb-2 text-right line-clamp-2 hover:text-purple-700 transition-colors"
        >
          {{ card.title }}
        </h3>
      </NuxtLink>

      <p class="text-xs text-gray-500 leading-6 text-right line-clamp-2 mb-4">
        {{ card.short_description || "مطالعه کامل این مقاله در وبلاگ سرمه..." }}
      </p>
    </div>

    <div>
      <div class="border-t border-dashed border-gray-200 mb-4"></div>
      <div class="flex items-center justify-between">
        <NuxtLink
          :to="articleLink"
          class="inline-flex items-center gap-2 bg-[#43235F] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#341b4a] transition-colors"
        >
          <span>مشاهده مقاله</span>
          <svg
            class="w-4 h-4 stroke-current fill-none rotate-180"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </NuxtLink>

        <span class="text-xs text-gray-600 font-medium">
          {{ card.read_time || "۵" }} دقیقه
        </span>
      </div>
    </div>
  </article>
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

const { $getImageUrl } = useNuxtApp();

const articleLink = computed(() => {
  return `/blog/${props.card?.slug || props.card?.id || ""}`;
});

const cardImage = computed(() => {
  if (!props.card?.image) return "/images/default-article.webp";
  return typeof $getImageUrl === "function"
    ? $getImageUrl(props.card.image)
    : props.card.image;
});

const authorName = computed(() => {
  return (
    props.card?.author?.full_name ||
    props.card?.author?.name ||
    props.card?.author ||
    "تحریریه سرمه"
  );
});

const authorAvatar = computed(() => {
  const avatarPath =
    props.card?.author?.avatar ||
    props.card?.author?.image ||
    props.card?.author_avatar ||
    props.card?.avatar;

  if (!avatarPath) return null;
  return typeof $getImageUrl === "function"
    ? $getImageUrl(avatarPath)
    : avatarPath;
});

const formattedDate = computed(() => {
  if (!props.card?.created_at) return "—";
  try {
    return new Date(props.card.created_at).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return String(props.card.created_at).slice(0, 10);
  }
});
</script>
