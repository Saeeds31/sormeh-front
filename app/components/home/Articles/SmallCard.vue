<!-- app/components/home/SmallCard.vue -->
<template>
  <NuxtLink
    v-if="smallcard"
    :to="articleLink"
    class="bg-white rounded-2xl border border-gray-100 p-3 flex items-center justify-between gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow shrink-0 w-full"
    dir="rtl"
  >
    <!-- متن و متادیتا در سمت راست -->
    <div
      class="flex-1 flex flex-col justify-between h-full py-0.5 text-right min-w-0"
    >
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <!-- نویسنده -->
        <div class="flex items-center gap-1">
          <div
            class="w-4 h-4 rounded-full overflow-hidden bg-purple-50 flex items-center justify-center shrink-0 ring-1 ring-purple-100"
          >
            <SharedAppImage
              v-if="authorAvatar"
              :src="authorAvatar"
              alt="avatar"
              img-class="w-full h-full object-cover"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-2.5 h-2.5 text-purple-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <span class="text-gray-600 font-medium truncate max-w-[85px]">{{
            authorName
          }}</span>
        </div>

        <span>{{ formattedDate }}</span>

        <!-- تعداد نظرات -->
        <span class="hidden sm:inline"
          >{{ smallcard.comments_count ?? 0 }} نظر</span
        >
      </div>

      <!-- عنوان مقاله -->
      <h4
        class="text-xs font-bold text-gray-800 line-clamp-1 mt-1.5 hover:text-purple-700 transition-colors"
      >
        {{ smallcard.title }}
      </h4>
    </div>

    <!-- تصویر مقاله از API در سمت چپ -->
    <div class="w-20 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
      <SharedAppImage
        :src="cardImage"
        :alt="smallcard.title"
        img-class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  smallcard: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  articleHref: {
    type: String,
    default: "",
  },
});

const { $getImageUrl } = useNuxtApp();

// const articleLink = computed(() => {
//   return `/blog/${props.smallcard?.slug || props.smallcard?.id || ""}`;
// });
const articleLink = computed(() => {
  return (
    props.articleHref ||
    `/blog/${props.smallcard?.slug || props.smallcard?.id || ""}`
  );
});

const cardImage = computed(() => {
  if (!props.smallcard?.image) return "/images/default-article.webp";
  return typeof $getImageUrl === "function"
    ? $getImageUrl(props.smallcard.image)
    : props.smallcard.image;
});

const authorName = computed(() => {
  return (
    props.smallcard?.author?.full_name ||
    props.smallcard?.author?.name ||
    props.smallcard?.author ||
    "تحریریه سرمه"
  );
});

const authorAvatar = computed(() => {
  const avatarPath =
    props.smallcard?.author?.avatar ||
    props.smallcard?.author?.image ||
    props.smallcard?.smallcard_avatar ||
    props.smallcard?.author_avatar ||
    props.smallcard?.avatar;

  if (!avatarPath) return null;
  return typeof $getImageUrl === "function"
    ? $getImageUrl(avatarPath)
    : avatarPath;
});

const formattedDate = computed(() => {
  if (!props.smallcard?.created_at) return "—";
  try {
    return new Date(props.smallcard.created_at).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return String(props.smallcard.created_at).slice(0, 10);
  }
});
</script>
