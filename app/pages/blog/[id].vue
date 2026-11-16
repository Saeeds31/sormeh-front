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

    <!-- Loading State -->
    <div v-if="pending" class="min-h-[60vh] flex items-center justify-center">
      <SharedLoadingSpinner size="lg" />
    </div>

    <!-- Error State -->
    <div v-else-if="error && !article" class="text-center py-20 space-y-4">
      <p class="text-red-500 text-xl font-medium">خطا در بارگذاری مقاله</p>
      <button @click="refresh" class="btn px-6 py-2.5">دوباره تلاش کن</button>
    </div>

    <!-- Article Detail Content -->
    <div
      v-else-if="article"
      class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-4"
    >
      <!-- Main Content Column (7 cols) -->
      <article class="lg:col-span-7 lg:col-start-1 min-w-0 space-y-6">
        <!-- Article Header & Title -->
        <div class="space-y-4">
          <!-- Title row with copy icon next to it -->
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
          <div class="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span v-if="articleAuthor"> نویسنده: {{ articleAuthor }} </span>
            <span v-if="articleAuthor && article.created_at">•</span>
            <span v-if="article.created_at">
              {{ formatDate(article.created_at) }}
            </span>
            <span v-if="article.views_count" class="flex items-center gap-1">
              • {{ article.views_count }} بازدید
            </span>
          </div>

          <!-- Summary / Short Description -->
          <p
            v-if="article.short_description || article.summary"
            class="text-sm font-normal leading-7 text-gray-600"
          >
            {{ article.short_description || article.summary }}
          </p>

          <!-- Reading Time Notification -->
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
        class="lg:col-span-5 lg:col-start-8 min-w-0 space-y-6 lg:sticky lg:top-24"
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
          <ul class="space-y-2 text-sm text-muted">
            <li v-for="(heading, idx) in tableOfContents" :key="idx">
              <a
                href="#"
                class="hover:text-strong transition block py-1 border-b border-dashed border-gray-100 pb-2"
              >
                {{ heading }}
              </a>
            </li>
          </ul>
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
import { ref, computed } from "vue";
import { useApi } from "@/composables/api/useApi";
import { useSettingStore } from "~/store/settings";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

const route = useRoute();
const { $getImageUrl } = useNuxtApp();
const { getBlogDetail, getBlogs } = useApi();

const settingStore = useSettingStore();
const { settings } = storeToRefs(settingStore);

// ذخیره لیست مقالات برای استفاده در سایدبار مقالات مرتبط
const allArticlesList = ref([]);

const {
  pending,
  error,
  data: article,
  refresh,
} = await useAsyncData(`blog-${route.params.id}`, async () => {
  const param = route.params.id;

  // ۱. دریافت همزمان جزئیات مقاله و مقالات لیست برای سایدبار
  try {
    const [detailRes, listRes] = await Promise.allSettled([
      getBlogDetail(param),
      getBlogs({ page: 1 }),
    ]);

    if (listRes.status === "fulfilled") {
      const rawList =
        listRes.value?.data?.data || listRes.value?.data || listRes.value || [];
      allArticlesList.value = Array.isArray(rawList) ? rawList : [];
    }

    if (detailRes.status === "fulfilled") {
      const item =
        detailRes.value?.data?.data || detailRes.value?.data || detailRes.value;
      if (item && !Array.isArray(item) && item.title) {
        return item;
      }
    }
  } catch (e) {
    console.error("Fetch blog error:", e);
  }

  // ۲. روش جایگزین (Fallback) در صورت ناموفق بودن getBlogDetail
  if (allArticlesList.value.length > 0) {
    const matched = allArticlesList.value.find(
      (a) => String(a.id) === String(param) || String(a.slug) === String(param),
    );
    if (matched) return matched;
  }

  return null;
});

// بدنه مقاله (هماهنگ با کلیدهای description و content)
const articleBody = computed(() => {
  return article.value?.description || article.value?.content || "";
});

// نویسنده مقاله با پوشش ساختارهای آبجکت و رشته
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

// مقالات مرتبط برای سایدبار
const relatedArticles = computed(() => {
  const currentId = article.value?.id || route.params.id;
  return allArticlesList.value
    .filter((b) => String(b.id) !== String(currentId))
    .slice(0, 4);
});

// عناوین پیش‌فرض فهرست مطالب (TOC)
const tableOfContents = computed(() => [
  "معرفی و نکات کلیدی اصالت کالا",
  "بررسی جزئیات شیشه و بسته‌بندی",
  "روش‌های مطمئن پیش از خرید عطر لوکس",
]);

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
