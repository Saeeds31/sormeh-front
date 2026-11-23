<!-- app/pages/blog/[id].vue -->
<template>
  <main class="container py-4">
    <SharedBreadCrumb
      :items="[
        { label: 'وبلاگ', href: '/blogs' },
        {
          label: article?.title || 'جزئیات مقاله',
          href: `/blog/${route.params.id}`,
        },
      ]"
    />

    <div v-if="pending" class="min-h-[60vh] flex items-center justify-center">
      <SharedLoadingSpinner size="lg" />
    </div>

    <div v-else-if="error && !article" class="text-center py-20 space-y-4">
      <p class="text-red-500 text-xl font-medium">خطا در بارگذاری مقاله</p>
      <button @click="refresh" class="btn px-6 py-2.5">دوباره تلاش کن</button>
    </div>

    <div
      v-else-if="article"
      class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-4"
    >
      <article class="lg:col-span-7 lg:col-start-1 min-w-0 space-y-6">
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-4">
            <h1
              class="text-xl font-extrabold leading-relaxed text-strong lg:text-3xl flex-1"
            >
              {{ article.title }}
            </h1>

            <button
              @click="copyLink"
              class="rounded-lg text-muted transition hover:bg-purple-100 hover:text-strong flex-shrink-0"
              title="کپی لینک مقاله"
            >
              <IconCopyGreen class="" />
            </button>
          </div>

          <!-- Author and Meta info below the title -->
          <div
            class="flex justify-between items-center gap-1 text-xs text-muted"
          >
            <div v-if="articleAuthor" class="flex items-center gap-1">
              <img
                v-if="articleAuthorImage"
                :src="articleAuthorImage"
                :alt="`تصویر ${articleAuthor}`"
                class="h-8 w-8 rounded-full object-cover border border-gray-200"
                @error="handleAuthorImageError"
              />

              <span
                v-else
                class="flex h-8 w-8 items-center justify-center rounded-full bg-[#D5CBEB] text-[#4B3073]"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  class="h-5 w-5"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </span>

              <span>
                <span class="text-gray-500"> نویسنده: </span>
                <span class="font-semibold text-strong">{{
                  articleAuthor
                }}</span>
              </span>

              <div>
                <span
                  v-if="articleAuthor && article.created_at"
                  class="text-gray-300 pr-1.5"
                  aria-hidden="true"
                >
                  •
                </span>

                <span v-if="article.created_at">
                  {{ formatDate(article.created_at) }}
                </span>
              </div>
            </div>

            <div>
              <span
                v-if="readingTime"
                class="inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span class="text-gray-300" aria-hidden="true">•</span>
                {{ readingTime }} دقیقه مطالعه
              </span>

              <span v-if="article.views_count" class="flex items-center gap-1">
                <span class="text-gray-300" aria-hidden="true">•</span>
                {{ article.views_count }} بازدید
              </span>
            </div>
          </div>

          <p
            v-if="article.short_description || article.summary"
            class="text-sm font-normal leading-7 text-gray-600"
          >
            {{ article.short_description || article.summary }}
          </p>

          <div
            v-if="article.reading_time"
            class="inline-flex items-center gap-2 text-xs text-muted bg-gray-50 border px-3 py-1.5 rounded-lg"
          >
            <span class="font-bold text-strong">i</span>
            <span
              >این مقاله حدود {{ article.reading_time }} دقیقه زمان مطالعه
              دارد.</span
            >
          </div>
        </div>

        <!-- Featured Image -->
        <div class="overflow-hidden rounded-2xl bg-gray-50 border shadow-sm">
          <img
            v-if="article.image"
            :src="$getImageUrl(article.image)"
            :alt="article.title"
            class="block max-h-[420px] w-full object-cover"
          />
          <div v-else class="flex h-64 items-center justify-center bg-accent">
            <span class="text-muted">بدون تصویر</span>
          </div>
        </div>

        <!-- Article Body HTML -->
        <section
          v-if="articleBody"
          ref="articleContentRef"
          class="prose prose-lg max-w-none leading-9 text-gray-800 pt-2"
          v-html="articleBody"
        ></section>

        <!-- Share & Actions Footer -->
        <!-- <div
          class="flex flex-wrap items-center justify-between gap-4 py-6 border-t"
        >
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-muted">اشتراک‌گذاری:</span>
            <a
              v-if="settings?.social?.instagram"
              :href="settings.social.instagram"
              target="_blank"
              class="p-2 bg-accent rounded-full hover:opacity-80 transition"
              title="اینستاگرام"
            >
              <IconInstagramGreen class="w-4 h-4" />
            </a>
            <a
              v-if="settings?.social?.telegram"
              :href="settings.social.telegram"
              target="_blank"
              class="p-2 bg-accent rounded-full hover:opacity-80 transition"
              title="تلگرام"
            >
              <IconTelegramGreen class="w-4 h-4" />
            </a>
            <a
              v-if="settings?.social?.whatsapp"
              :href="settings.social.whatsapp"
              target="_blank"
              class="p-2 bg-accent rounded-full hover:opacity-80 transition"
              title="واتساپ"
            >
              <IconWhatsAppGreen class="w-4 h-4" />
            </a>
          </div>

          <button
            @click="copyLink"
            class="btnLight flex gap-2 items-center text-sm px-4 py-2"
          >
            <span>کپی کردن لینک مقاله</span>
            <IconCopyGreen class="" />
          </button>
        </div> -->

        <!-- Comments Section -->
        <div class="pt-6 border-t">
          <blogTabsComment />
        </div>
      </article>

      <!-- Sidebar Column (5 cols) -->
      <aside
        class="lg:col-span-5 lg:col-start-8 min-w-0 space-y-6 lg:sticky lg:top-10"
      >
        <!-- Related Articles Widget -->
        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
          <h3 class="text-lg font-bold text-strong border-b pb-3">
            مقالات مرتبط
          </h3>

          <div v-if="relatedArticles.length > 0" class="space-y-4">
            <HomeArticlesSmallCard
              v-for="item in relatedArticles"
              :key="item.id"
              :smallcard="item"
              :article-href="`/blog/${item.id}`"
            />
          </div>
          <div v-else class="text-xs text-muted text-center py-4">
            مقاله‌ای یافت نشد
          </div>
        </div>

        <!-- Table of Contents Widget -->
        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
          <h3 class="text-lg font-bold text-strong border-b pb-3">
            فهرست مطالب
          </h3>
          <ul
            v-if="tableOfContents.length > 0"
            class="space-y-2 text-sm text-muted"
          >
            <li v-for="heading in tableOfContents" :key="heading.id">
              <a
                :href="`#${heading.id}`"
                class="hover:text-strong transition block py-1 border-b border-dashed border-gray-100 pb-2"
                @click.prevent="scrollToHeading(heading.id)"
              >
                {{ heading.title }}
              </a>
            </li>
          </ul>

          <p v-else class="text-xs text-muted text-center py-2">
            فهرستی برای این مقاله یافت نشد
          </p>
        </div>
      </aside>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <p class="text-muted text-xl">مقاله‌ای یافت نشد</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useApi } from "@/composables/api/useApi";
import { useSettingStore } from "~/store/settings";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

const route = useRoute();
const { $getImageUrl } = useNuxtApp();
const { getBlogs } = useApi();

const settingStore = useSettingStore();
const { settings } = storeToRefs(settingStore);

const allArticlesList = ref([]);
const {
  pending,
  error,
  data: article,
  refresh,
} = await useAsyncData(`blog-${route.params.id}`, async () => {
  const param = String(route.params.id);

  try {
    const listRes = await getBlogs({ page: 1 });

    const rawList = Array.isArray(listRes?.data?.data)
      ? listRes.data.data
      : Array.isArray(listRes?.data)
        ? listRes.data
        : Array.isArray(listRes)
          ? listRes
          : [];

    allArticlesList.value = rawList;

    const matchedArticle = allArticlesList.value.find((item) => {
      if (item.slug && String(item.slug) === param) {
        return true;
      }

      return String(item.id) === param;
    });

    return matchedArticle || null;
  } catch (e) {
    console.error("Fetch blog list error:", e);
    allArticlesList.value = [];
    return null;
  }
});

const articleBody = computed(() => {
  return article.value?.description || article.value?.content || "";
});

const articleAuthor = computed(() => {
  if (!article.value?.author) return "";
  if (typeof article.value.author === "string") return article.value.author;
  return (
    article.value.author.full_name ||
    article.value.author.name ||
    article.value.author.username ||
    ""
  );
});
const readingTime = computed(() => {
  return article.value?.read_time || article.value?.reading_time || null;
});

const authorImageFailed = ref(false);

const articleAuthorImage = computed(() => {
  if (authorImageFailed.value) return "";

  const author = article.value?.author;

  if (!author || typeof author !== "object") return "";

  const image =
    author.avatar ||
    author.image ||
    author.photo ||
    author.profile_image ||
    author.profile_photo;

  if (!image) return "";

  return /^https?:\/\//i.test(image) ? image : $getImageUrl(image);
});

const handleAuthorImageError = () => {
  authorImageFailed.value = true;
};

const relatedArticles = computed(() => {
  const currentId = article.value?.id;
  const currentSlug = article.value?.slug || route.params.id;

  return allArticlesList.value
    .filter((item) => {
      const isSameId =
        currentId !== undefined &&
        currentId !== null &&
        String(item.id) === String(currentId);

      const isSameSlug =
        item.slug && currentSlug && String(item.slug) === String(currentSlug);

      return !isSameId && !isSameSlug;
    })
    .slice(0, 4);
});

const articleContentRef = ref(null);
const tableOfContents = ref([]);

const buildTableOfContents = async () => {
  await nextTick();

  const content = articleContentRef.value;

  if (!content) {
    tableOfContents.value = [];
    return;
  }

  const headings = Array.from(content.querySelectorAll("h1, h2, h3, h4"));

  const extractedHeadings = [];

  headings.forEach((heading, index) => {
    const title = heading.textContent?.replace(/\s+/g, " ").trim();

    if (!title) return;

    const id = `article-heading-${index + 1}`;

    heading.id = id;

    extractedHeadings.push({
      id,
      title,
    });
  });

  tableOfContents.value = extractedHeadings;
};

watch(
  articleBody,
  async () => {
    await buildTableOfContents();
  },
  {
    flush: "post",
  },
);

onMounted(async () => {
  await buildTableOfContents();
});

const scrollToHeading = (id) => {
  const heading = document.getElementById(id);
  if (!heading) return;

  heading.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

// تابع فرمت تاریخ شمسی
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("fa-IR");
  } catch {
    return dateString;
  }
};

// کپی لینک مقاله به کلیپ‌بورد همراه با Toast
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    if (typeof toast !== "undefined" && toast.success) {
      toast.success("لینک مقاله کپی شد");
    }
  } catch (err) {
    console.error("Failed to copy link:", err);
    if (typeof toast !== "undefined" && toast.error) {
      toast.error("خطا در کپی کردن لینک");
    }
  }
};
</script>

<style scoped>
:deep(.prose) {
  color: var(--text, #374151);
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4) {
  color: var(--strong, #111827);
  font-weight: 700;
  margin-top: 1.75em;
  margin-bottom: 0.75em;
}

/* هایلایت شکیل h2 داخل متن مقاله مطابق دیزاین */
:deep(.prose h2) {
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
  background-color: var(--secondary, #d5cbeb);
  border-radius: 0.65rem;
}

:deep(.prose p) {
  margin-bottom: 1.25em;
  line-height: 2;
}

:deep(.prose img) {
  border-radius: 0.75rem;
  margin: 1.5em 0;
  width: 100%;
  object-fit: cover;
}

:deep(.prose a) {
  color: var(--text-strong, #059669);
  text-decoration: underline;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin: 1em 0;
  padding-right: 1.5em;
}

:deep(.prose li) {
  margin-bottom: 0.5em;
}
</style>
